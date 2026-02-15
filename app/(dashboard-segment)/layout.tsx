import SideNav from "@/components/sidenav";
import { TopNav } from "@/components/topnav";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1 md:ml-[266px]">
        <TopNav />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
