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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isValid, parse } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import InfoToolTip from "@/components/info-tooltip";
import { usePostSchedulePickup } from "@/queries/schedule";
import { ErrorAlert } from "../error-component";
import WasteSelector from "../waste-selector";
import { useState } from "react";
import { ImageUpload } from "../image-upload";

// ✅ Validation schema
const dropoffFormSchema = z.object({
  material_amount: z.string().min(2, { message: "Minimum of 100 pieces" }),
  container_amount: z
    .string()
    .nonempty({ message: "Please indicate number of bags" }),
  date: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: "Please enter date in DD/MM/YYYY format",
  }),
});

type dropoffFormSchema = z.infer<typeof dropoffFormSchema>;
type DropoffFormProps = {
  onBack: () => void;
  address: string;
};

export const DropOffForm = ({ onBack, address }: DropoffFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const form = useForm<dropoffFormSchema>({
    resolver: zodResolver(dropoffFormSchema),
    mode: "onChange",
    defaultValues: {
      material_amount: "",
      container_amount: "",
      date: "",
    },
  });

  const { mutate, isPending, isError, error } = usePostSchedulePickup();

  const onSubmit = (values: dropoffFormSchema) => {
    // 1. Initialize FormData
    const formData = new FormData();

    // 2. Handle Date Formatting safely
    const parsedDate = parse(values.date, "dd/MM/yyyy", new Date());
    const formattedDate = isValid(parsedDate)
      ? format(parsedDate, "yyyy-MM-dd")
      : values.date;

    // 3. Construct the Payload Logic
    formData.append("material_amount", String(values.material_amount));
    formData.append("container_amount", String(values.container_amount));
    formData.append("date", formattedDate);
    formData.append("material", "plastic");
    formData.append("category", "dropoff");
    formData.append("address", address); // Passed from props

    // 4. Append the image from the state
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    // 5. Submit
    mutate(formData, {
      onSuccess: () => {
        form.reset();
        setSelectedFile(null);
      },
    });
  };

  return (
    <>
      <div>
        <div className="fixed top-0 z-40 bg-white flex justify-between items-center h-16 pb-10 w-full pt-12 md:pt-15 px-1">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="bg-[#F3F3F3] rounded-[10px] text-[#292D32] p-2"
            >
              <ArrowLeft />
            </button>
            <p className="text-xl md:text-3xl font-black">Schedule Drop-off</p>
          </div>
        </div>

        <div className="px-1">
          <p className="text-[14px] md:text-base text-grey-90 mb-3 mt-20 md:mt-30">
            Category
          </p>
          <WasteSelector />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full px-1 md:px-2 mt-5 pb-10 space-y-5 md:w-2/3"
          >
            {/* Number of Plastic Waste */}
            <FormField
              control={form.control}
              name="material_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base text-grey-90">
                    Number of Plastic Waste
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                      placeholder="Minimum of 100 pieces"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Plastic Bag */}
            <FormField
              control={form.control}
              name="container_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base text-grey-90 justify-between">
                    Number of Plastic Bag
                    <InfoToolTip
                      text=" Ensure your waste has been properly sorted by
                            category and select the number of bags you're
                            scheduling for pickup."
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                      placeholder="Please indicate number of bags"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col z-20">
                  <FormLabel className="text-sm md:text-base text-grey-90">
                    Drop-off Date
                  </FormLabel>
                  <Popover
                    open={openDatePicker}
                    onOpenChange={setOpenDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none justify-between text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          field.value
                        ) : (
                          <span className="text-gray-400">DD/MM/YYYY</span>
                        )}
                        <CalendarIcon className="flex justify-end h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(selected) => {
                          if (selected) {
                            field.onChange(format(selected, "dd/MM/yyyy"));
                            setOpenDatePicker(false);
                          }
                        }}
                        autoFocus
                        captionLayout="dropdown"
                        startMonth={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photos of Trash */}
            <div className="relative -z-10">
              <label
                htmlFor="photos"
                className="text-sm md:text-base text-grey-90 font-medium"
              >
                Photos of trash
              </label>

              <ImageUpload
                onFileSelect={(file) => setSelectedFile(file)}
                defaultValue={null}
              />
            </div>
            {isError && <ErrorAlert error={error} />}
            {/* Submit Button */}
            <div className="col-span-1 xl:col-start-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-7 text-sm md:text-base font-bold"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Scheduling...</span>
                  </>
                ) : (
                  "Schedule Drop-off"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
