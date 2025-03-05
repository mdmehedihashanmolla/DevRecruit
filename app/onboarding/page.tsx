import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";


async function checkIfOnboardingCompleted(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
      },
    });
  
    if (user?.onboardingCompleted === true) {
      redirect("/");
    }
  }
  
export default function OnboardingPage(){
    return(
        <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
            <OnboardingForm/>
            
        </div>
    )
}