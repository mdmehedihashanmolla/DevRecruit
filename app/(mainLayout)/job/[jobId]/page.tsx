import arcjet, { detectBot, fixedWindow } from "@/app/utils/arcjet";
import { getFlagEmoji } from "@/app/utils/countriesList";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefits";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      max: 10,
      window: "60s",
    })
  );

async function getJob(jobId: string) {
  const jobData = await prisma.jobPost.findUnique({
    where: {
      status: "ACTIVE",
      id: jobId,
    },
    select: {
      jobTitle: true,
      jobDescription: true,
      location: true,
      employmentType: true,
      benefits: true,
      createdAt: true,
      listingDuration: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
  });
  if (!jobData) {
    return notFound();
  }
  return jobData;
}
type Params = Promise<{ jobId: string }>;
export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const req = await request();
  const decision = await aj.protect(req);
  const data = await getJob(jobId);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }
  const locationFlag = getFlagEmoji(data.location);
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="space-y-8 col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketing Manager</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{data.jobTitle}</p>
              <span className="hidden md:inline text-muted-foreground">*</span>

              <Badge
                className="bg-purple-500 rounded-full "
                variant="secondary"
              >
                {data.employmentType}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full bg-purple-500">
                {locationFlag && <span className="mr-1">{locationFlag}</span>}
                {data.location}
              </Badge>
            </div>
          </div>

          <Button variant="outline" className="bg-purple-500">
            <Heart className="size-4" /> Save Job
          </Button>
        </div>
        <section>
          <JsonToHtml json={JSON.parse(data.jobDescription)} />
        </section>
        <section>
          <h3 className="font-semibold mb-4">Benifits</h3>

          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data.benefits.includes(benefit.id);
              return (
                <Badge
                  className={cn(
                    isOffered
                      ? "bg-purple-500"
                      : "opacity-75 cursor-not-allowed text-sm px-4 py-1.5 rounded-full"
                  )}
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Apply now</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Please let {data.company.name}know you found this job on
                DevRecruit. This helps us grow!
              </p>
            </div>
            <Button className="w-full bg-purple-500">Apply now</Button>
          </div>
        </Card>
        {/* Job Details Card */}

        <Card className="p-6">
          <h3 className="font-semibold">About the job</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Apply before
              </span>
              <span className="text-sm">
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Posted on</span>

              <span className="text-sm">
                {data.createdAt.toLocaleDateString("en-Us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Employment Type
              </span>

              <span className="text-sm">{data.employmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location</span>

              <span className="text-sm">
                {locationFlag && <span className="mr-1">{locationFlag}</span>}

                {data.location}
              </span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={data.company.logo}
                alt="Company Logo"
                width={48}
                height={48}
                className="rounded-full size-12"
              />
              <div className="flex  flex-col">
                <h3 className="text-semibold">{data.company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {data.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
