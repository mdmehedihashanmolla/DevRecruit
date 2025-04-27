"use client";
// pages/apply-now.js or pages/job/[jobId]/apply.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/general/UploadThingReExport";
import { toast } from "sonner";

export default function ApplyNow({ jobId }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [pending, setPending] = useState(false);
  const resumeUrl = watch("resume"); // Track the resume URL

  const onSubmit = async (data) => {
    try {
      if (!data.resume) {
        toast.error("Please upload your resume first");
        return;
      }

      setPending(true);
      // Here you would typically send data to your API
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          resumeUrl: data.resume,
          // Include other form fields here
        }),
      });

      if (!response.ok) throw new Error("Application failed");

      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Application error:", error);
      toast.error("Error submitting application. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-center text-3xl font-bold mb-8">Apply for Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Resume Upload */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="resume"
          >
            Upload Resume (PDF)
          </label>
          {resumeUrl ? (
            <div className="p-4 border border-green-200 bg-green-50 rounded-md">
              <p className="text-green-700">Resume uploaded successfully!</p>
              <p className="text-sm text-green-600 truncate">{resumeUrl}</p>
            </div>
          ) : (
            <UploadDropzone
              endpoint="resumeUploader"
              onClientUploadComplete={(res) => {
                const url = res[0]?.url; // Get the URL from the response
                if (url) {
                  setValue("resume", url); // Update form value
                  toast.success("Resume uploaded successfully!");
                }
              }}
              onUploadError={(error) => {
                console.error("Upload error:", error);
                toast.error("Error uploading resume. Please try again.");
              }}
              className="ut-uploading:bg-gray-50 ut-uploading:border-dashed"
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={pending || !resumeUrl}
          className="w-full"
        >
          {pending ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
