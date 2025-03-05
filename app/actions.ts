"use server";

import { requireUser } from "./utils/requireUser";
import { z } from "zod";
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function createCompany(data: z.infer<typeof companySchema>) {
    const session = await requireUser(); 

    const validatedData = companySchema.parse(data);

    await prisma.user.update({
        where: {
          id: session.id,
        },
        data: {
          onboardingCompleted: true,
          userType: "COMPANY",
          Company: {
            create: {
              ...validatedData,
            },
          },
        },
      });
    
      return redirect("/");
    }

    export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
        const user = await requireUser();
      
        // Access the request object so Arcjet can analyze it
        // const req = await request();
        // // Call Arcjet protect
        // const decision = await aj.protect(req);
      
        // if (decision.isDenied()) {
        //   throw new Error("Forbidden");
        // }
      
        const validatedData = jobSeekerSchema.parse(data);
      
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
              create: {
                ...validatedData,
              },
            },
          },
        });
      
        return redirect("/");
      }