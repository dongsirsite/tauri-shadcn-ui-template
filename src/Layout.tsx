import { LayoutProvider } from "@/hooks/use-layout";
import { ActiveThemeProvider } from "@/components/active-theme";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <ActiveThemeProvider>
          <SidebarProvider
            className="hidden md:flex"
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 64)",
                "--header-height": "calc(var(--spacing) * 12 + 1px)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="sidebar" />
            <SidebarInset>
              <SiteHeader />
              <Outlet />
            </SidebarInset>
          </SidebarProvider>
          <TailwindIndicator />
          <Toaster position="top-center" />
        </ActiveThemeProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}
