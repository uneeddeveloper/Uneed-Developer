import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Belt-and-suspenders: middleware already gates /admin-uneed/*, but a
  // Server Component layout should never assume a header did its job.
  const session = await auth();
  if (!session?.user) redirect("/admin-uneed/login");

  return (
    <div className="relative min-h-screen">
      <AmbientGlow className="opacity-40" />
      <div className="relative mx-auto flex max-w-[100rem] flex-col gap-4 p-4 lg:flex-row lg:gap-6">
        <AdminShell adminName={session.user.name ?? session.user.email ?? "Admin"} />
        <main className="min-w-0 flex-1 py-2">{children}</main>
      </div>
    </div>
  );
}
