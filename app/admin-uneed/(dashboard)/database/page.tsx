import { PageHeader } from "@/components/admin/page-header";
import { getJsonBinConfig } from "@/lib/admin/jsonbin-config";
import { DatabaseClient } from "./database-client";

export default async function AdminDatabasePage() {
  const config = await getJsonBinConfig();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Database Online (JSONBin)"
        subtitle="Backup & sinkronisasi cloud untuk Projects, Pendapatan, dan Tim — Layanan & Portfolio tetap dikelola di halaman masing-masing."
      />
      <DatabaseClient
        binId={config?.binId ?? ""}
        hasMasterKey={!!config?.masterKey}
        lastSyncAt={config?.lastSyncAt ?? null}
      />
    </div>
  );
}
