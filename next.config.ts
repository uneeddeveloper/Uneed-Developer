import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 is a native addon; letting webpack bundle it breaks its
  // runtime path resolution to the compiled .node binary. Keeping it (and
  // the driver adapter that wraps it) as a plain require avoids that.
  serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"],
};

export default nextConfig;
