import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

function AlertError({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <CircleAlert className="h-4 w-4" />
      <AlertDescription className="min-w-0 break-words">
        {message}
      </AlertDescription>
    </Alert>
  );
}

export default AlertError;
