"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { UploadDropzone } from "@/components/general/UploadThingReExport";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PDFImage from "@/public/pdf.png";
import Image from "next/image";

// Define a simple schema for uploading resume
const applyNowSchema = z.object({
  resume: z.string().min(1, "Resume is required"),
});

export default function ApplyNow() {
  const form = useForm<z.infer<typeof applyNowSchema>>({
    resolver: zodResolver(applyNowSchema),
    defaultValues: {
      resume: "",
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(values: z.infer<typeof applyNowSchema>) {
    try {
      setPending(true);

      // Here you can send 'values.resume' (the uploaded file URL)
      // to your backend to link it with the job application.
      console.log("Resume URL Submitted:", values.resume);

      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Your Resume</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={PDFImage}
                        alt="Uploaded Resume"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                        toast.success("Resume uploaded successfully!");
                      }}
                      onUploadError={() => {
                        toast.error("Failed to upload resume.");
                      }}
                      className="ut-button:bg-purple-500 ut-button:text-black ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-purple-500"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-purple-500"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Apply Now"}
        </Button>
      </form>
    </Form>
  );
}
