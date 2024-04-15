import { InputForm } from "@/components/InputForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConnectKitButton } from "connectkit";
import { AlertCircle } from "lucide-react";
import { useAccount } from "wagmi";

export default function Home() {
  const account = useAccount();
  return (
    <main className={`flex min-h-screen flex-col items-center md:p-24 p-6`}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>🚨 Heads up! 🚨</AlertTitle>
        <AlertDescription>
          This isn’t your average form. 🚫 If you’re not 100% sure what you’re
          doing, might be best to hit that exit. BTW, if anyone’s sliding into
          your DMs asking to copy-paste 11/10 here, 🙅‍♂️ big red flag! That’s scam
          city. Only stick around if you’re clued in. No clue? No stay. Simple
          as that. Stay savvy, stay safe. 🕶️
        </AlertDescription>
      </Alert>
      <div className="mt-20 w-full">
        <div className=" mx-auto w-fit">
          <ConnectKitButton showBalance />
        </div>
        <InputForm />
      </div>
    </main>
  );
}
