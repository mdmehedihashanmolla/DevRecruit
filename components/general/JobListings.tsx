import { prisma } from "@/app/utils/db";
import { EmptyState } from "./EmptyState";
import { JobCard } from "./JobCard";
import { PaginationComponent } from "./MainPagination";

async function getData() {
  const data = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      jobTitle: true,
      id: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function JobListings() {
  const data = await getData();
  return (
    <>
      {data.length > 0 ? (
        <div>
          {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Job Posts Found"
          description="It looks like there are no job posts available at the moment. Check
          back later or explore other opportunities on our platform."
          buttonText="Go To Homepage"
          href="/"
        />
      )}
      <div className="flex justify-center mt-6">
        <PaginationComponent totalPages={0} currentPage={0} />
      </div>
    </>
  );
}
