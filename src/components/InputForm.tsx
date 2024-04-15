import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  BaseError,
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Textarea } from "./ui/textarea";

type HexAddress = `0x${string}`;

export function InputForm() {
  const form = useForm();
  const {
    data: hash,
    isPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const onSubmit = (data: Record<string, string>) => {
    sendTransaction({
      to: data.to as `0x${string}`,
      data: data.data as `0x${string}`,
    });
  };

  const { isConnected } = useAccount();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-8 w-full"
      >
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input required placeholder="0x..." {...field} />
              </FormControl>
              <FormDescription>
                This is contract address or user user address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Textarea required placeholder="0x..." {...field} />
              </FormControl>
              <FormDescription>
                This is hex data to send to the contract
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isConnected ? (
          <>
            {" "}
            <Button type="submit" disabled={isPending}>
              {" "}
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </>
        ) : (
          <p className="text-red-500 text-lg">
            Please Connect your wallet first{" "}
          </p>
        )}

        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}

        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </form>
    </Form>
  );
}
