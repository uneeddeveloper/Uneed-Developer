"use server";

import { revalidatePath } from "next/cache";
import { getJsonBinConfig, saveJsonBinConfig, touchLastSync } from "@/lib/admin/jsonbin-config";
import { jsonbinCreateBin, jsonbinFetchLatest, jsonbinPush } from "@/lib/admin/jsonbin";
import { exportSnapshot, importSnapshot } from "@/lib/admin/jsonbin-sync";

function revalidateAdmin() {
  revalidatePath("/admin-uneed");
  revalidatePath("/admin-uneed/projects");
  revalidatePath("/admin-uneed/pendapatan");
  revalidatePath("/admin-uneed/tim");
  revalidatePath("/admin-uneed/laporan");
  revalidatePath("/admin-uneed/database");
}

async function requireConfig() {
  const config = await getJsonBinConfig();
  if (!config?.binId || !config.masterKey) {
    throw new Error("Master Key dan Bin ID belum diatur.");
  }
  return { binId: config.binId, masterKey: config.masterKey };
}

/** "Simpan & Load Data": save the config, then immediately pull the bin's
 * current data down — matches the old admin's exact behavior. */
export async function saveConfigAndLoad(formData: FormData) {
  const masterKey = formData.get("masterKey");
  const binId = formData.get("binId");
  if (typeof binId !== "string" || !binId.trim()) {
    return { error: "Bin ID wajib diisi." };
  }
  await saveJsonBinConfig({
    binId: binId.trim(),
    masterKey: typeof masterKey === "string" && masterKey.trim() ? masterKey.trim() : undefined,
  });

  try {
    const { binId: id, masterKey: key } = await requireConfig();
    const record = await jsonbinFetchLatest(id, key);
    const result = await importSnapshot(record);
    await touchLastSync();
    revalidateAdmin();
    return { success: true, imported: result };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal memuat data." };
  }
}

/** "Buat Baru (Auto)": creates a fresh bin seeded with current data. */
export async function createNewBin(formData: FormData) {
  const masterKey = formData.get("masterKey");
  const existing = await getJsonBinConfig();
  const key = typeof masterKey === "string" && masterKey.trim() ? masterKey.trim() : existing?.masterKey;
  if (!key) {
    return { error: "Master Key wajib diisi sebelum membuat bin baru." };
  }
  try {
    const snapshot = await exportSnapshot();
    const binId = await jsonbinCreateBin(key, snapshot);
    await saveJsonBinConfig({ binId, masterKey: key });
    return { success: true, binId };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal membuat bin baru." };
  }
}

export async function forceUpload() {
  try {
    const { binId, masterKey } = await requireConfig();
    const snapshot = await exportSnapshot();
    await jsonbinPush(binId, masterKey, snapshot);
    await touchLastSync();
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal upload." };
  }
}

export async function forceDownload() {
  try {
    const { binId, masterKey } = await requireConfig();
    const record = await jsonbinFetchLatest(binId, masterKey);
    const result = await importSnapshot(record);
    await touchLastSync();
    revalidateAdmin();
    return { success: true, imported: result };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal download." };
  }
}
