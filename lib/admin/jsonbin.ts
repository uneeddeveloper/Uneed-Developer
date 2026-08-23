const JSONBIN_BASE = "https://api.jsonbin.io/v3/b";

export async function jsonbinFetchLatest(binId: string, masterKey: string) {
  const res = await fetch(`${JSONBIN_BASE}/${binId}/latest`, {
    headers: { "X-Master-Key": masterKey },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Gagal mengambil data dari JSONBin (${res.status})`);
  const json = await res.json();
  return json.record;
}

export async function jsonbinPush(binId: string, masterKey: string, data: unknown) {
  const res = await fetch(`${JSONBIN_BASE}/${binId}`, {
    method: "PUT",
    headers: { "X-Master-Key": masterKey, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Gagal mengirim data ke JSONBin (${res.status})`);
}

export async function jsonbinCreateBin(masterKey: string, data: unknown, name = "Uneed Developer DB") {
  const res = await fetch(JSONBIN_BASE, {
    method: "POST",
    headers: {
      "X-Master-Key": masterKey,
      "X-Bin-Name": name,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Gagal membuat bin baru (${res.status})`);
  const json = await res.json();
  return json.metadata.id as string;
}
