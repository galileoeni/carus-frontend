"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useComplaintMessage } from "@/queries/account";
import { Loader2 } from "lucide-react";

const complaintSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

export default function HelpandComplaints() {
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      message: "",
    },
  });

  const complaintMutation = useComplaintMessage();

  const onSubmit = (values: ComplaintFormValues) => {
    complaintMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="px-7 md:px-15 mt-5 bg-[#F3F3F3] rounded-[10px] pt-5 pb-20 min-h-screen">
      <div className="w-full max-w-lg">
        <p className="text-base lg:text-xl text-grey-90 font-bold leading-loose pb-5">
          How can we help you?
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm lg:text-base">
                    Your complaint or message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your text here..."
                      className="w-full md:max-w-[500px] min-h-[150px] p-4 form-textarea rounded-[10px] text-grey-90 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-5 font-bold"
              disabled={complaintMutation.isPending}
            >
              {complaintMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <span>Sending...</span>
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
