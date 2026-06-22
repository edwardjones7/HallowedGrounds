import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
