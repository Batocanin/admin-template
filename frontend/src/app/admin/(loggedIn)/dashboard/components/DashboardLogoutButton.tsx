"use client";

import { logout } from "@/app/admin/(auth)/actions/AuthActions";

function DashboardLogoutButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 w-full"
      onClick={async () => logout()}
    >
      {children}
    </div>
  );
}

export default DashboardLogoutButton;
