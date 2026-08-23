import { cookies } from "next/headers";
import { PageHeader } from "@/components/admin/page-header";
import { getSecurityStatus } from "@/lib/admin/master-key";
import { UNLOCK_COOKIE, verifyUnlockToken } from "@/lib/admin/unlock-token";
import { KeamananClient } from "./keamanan-client";

export default async function AdminKeamananPage() {
  const [status, cookieStore] = await Promise.all([getSecurityStatus(), cookies()]);
  const unlockedHere = await verifyUnlockToken(cookieStore.get(UNLOCK_COOKIE)?.value);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Keamanan"
        subtitle="Master key tambahan yang wajib dimasukkan di setiap perangkat baru sebelum data admin bisa diakses."
      />
      <KeamananClient isSet={status.isSet} updatedAt={status.updatedAt} unlockedHere={unlockedHere} />
    </div>
  );
}
