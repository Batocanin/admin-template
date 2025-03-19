import { LoaderPinwheel } from "lucide-react";

import SigninForm from "../components/signin/SigninForm";

function page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LoaderPinwheel className="size-4 hover:animate-spin" />
          </div>
          Lorem Inc.
        </div>
        <SigninForm />
      </div>
    </div>
  );
}

export default page;
