import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  console.log("browsers");
  return (
    <main className="p-4 flex flex-col h-full items-center">
      <Button asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    </main>
  );
}
