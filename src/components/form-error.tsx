import { Alert, AlertDescription } from "@/components/ui/alert";
import { BsExclamationTriangle } from "react-icons/bs";

type Props = {
  message?: string;
};

export default function FormError({ message }: Props) {
  if (!message) return null;
  return (
    <Alert className="p-3" variant="destructive">
      <BsExclamationTriangle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
