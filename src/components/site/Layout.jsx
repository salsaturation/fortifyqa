import React from "react";
import { Outlet } from "react-router-dom";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import PageMeta from "./PageMeta";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta />
      <SiteNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}