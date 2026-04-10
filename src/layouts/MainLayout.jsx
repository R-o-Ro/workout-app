import { Outlet } from "react-router-dom";
import TopBar from "../components/navigation/TopBar";
import SideNav from "../components/navigation/SideNav";

function MainLayout() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* SIDEBAR */}
      <aside className="fixed top-0 left-0 h-full w-56 z-50">
        <SideNav />
      </aside>

      {/* MAIN */}
      <div className="ml-56 flex-1 flex flex-col h-screen overflow-hidden">

        {/* TOPBAR */}
        <header
          className="shrink-0 z-40 flex items-center px-10 h-14"
          style={{
            background: "rgba(8,8,8,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <TopBar />
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-10 py-8 mx-auto w-full max-w-5xl h-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default MainLayout;