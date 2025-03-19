import { notFound, redirect } from "next/navigation";
import { validateRequest } from "../(auth)/actions/AuthActions";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import AuthUserSessionProvider from "./AuthUserSessionProvider";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard/components/DashboardSidebar";
import { DashboardSidebarUserMenu } from "./dashboard/components/DashboardSidebarUserMenu";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const res = await validateRequest();

    if (!res.data.session || !res.data.user) redirect("/admin/signin");

    return (
      <AuthUserSessionProvider value={{ user: res.data.user }}>
        <SidebarProvider className="bg-gray-100">
          <DashboardSidebar />
          <SidebarInset className="bg-gray-100 space-y-2 mx-2 py-2">
            <header className="sticky top-2 flex h-11 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 bg-white rounded-lg border shadow-sm md:mx-0">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="md:mr-2  h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-medium md:font-normal">
                        Data Fetching
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="ml-auto mr-3">
                <DashboardSidebarUserMenu />
              </div>
            </header>
            <div className="px-4 bg-white shadow-lg h-full rounded-lg border">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </AuthUserSessionProvider>
    );
  } catch (error: unknown) {
    console.log(error);
    if (isRedirectError(error)) throw error;
    if (error instanceof Response) {
      const errorData = await error.json().catch(() => null);
      if (error.status === 401) {
        redirect("/admin/signin");
      }
      throw new Error(
        errorData?.message || "An unexpected error occurred on the server."
      );
    } else if (error instanceof Error) {
      notFound();
    }
    throw new Error("An unexpected error occurred on the server.");
  }
}

export default layout;
