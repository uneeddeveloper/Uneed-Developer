import { PageTransition } from "@/components/layout/page-transition";

/**
 * A template (rather than the layout) so it remounts per navigation, which
 * is what lets the page-enter animation replay on every route change.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
