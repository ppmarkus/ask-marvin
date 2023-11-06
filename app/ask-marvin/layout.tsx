import SideNav from "@/app/ui/ask-marvin/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden pt-4">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-0 overflow-y-auto">{children}</div>
    </div>
  );
}
