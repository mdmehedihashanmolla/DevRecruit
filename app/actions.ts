"use server";

import { requireUser } from "./utils/requireUser";
import { z } from "zod";
import { companySchema } from "./utils/zodSchemas";
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

