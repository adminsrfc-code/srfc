import { MembershipStepper, StepData } from "@/components/MembershipStepper";
import { getSheetSubs, SheetSubs } from "@/lib/sheets";

// This can be fetched async from a database or sheet loader function
async function getMembershipData(subData: SheetSubs) {
    return {
        season: subData.season || "??",
        dueDate: subData.dueDate || "September 1st, 2026",
        steps: [
            {
                title: "Subscriptions Overview",
                subtitle: "General information regarding annual club membership.",
                contentHtml: `
          <p>Membership subscriptions are paid on an annual basis and are normally due at the start of each season in September.</p>
          <p>All payments must be made by online bank transfer. Concessions are available on application to the club chairman for anyone facing financial hardship.</p>
        `,
            } as StepData,
            {
                title: "Subscription Rates",
                subtitle: "Breakdown of fees categorized by team and age group.",
                rates: [
                    { label: "Senior Men (Full Playing)", amount: subData.seniorMen || "£225", note: subData.seniorMenNote || "Or twosssss payments of £120" },
                    { label: "Senior Women & Students", amount: subData.seniorWomenStudents || "£100" },
                    { label: "Juniors (U13 – U18)", amount: subData.U13toU18 || "£175" },
                    { label: "Juniors (U7 – U12)", amount: subData.U7toU12 || "£150" },
                    { label: "Minis (U6)", amount: subData.U6 || "£95" },
                    { label: "Non-Playing / Social", amount: subData.social || "£50" },
                ],
            } as StepData,
            {
                title: "Payment Details & Reference",
                subtitle: "How to send your payment securely online.",
                contentHtml: `<p>Please transfer your membership fees directly to our club bank account using the details below:</p>`,
                bankDetails: {
                    accountName: "Southwell RUFC Subs",
                    accountNumber: "3616 5735",
                    sortCode: "60-20-15",
                    referenceGuide: "Use format: [AgeGroup/Team] [SurnameInitials] (e.g. U11 SmithJ)",
                },
            } as StepData,
        ],
    };
}

export default async function MembershipPage() {

    const subData = await getSheetSubs();

    const data = await getMembershipData(subData);

    return (
        <div className="min-h-screen bg-cream/30 py-12">
            <div className="text-center mb-6">
                <h1 className="font-display font-bold text-3xl text-slate">Membership Subscriptions</h1>
                <p className="text-muted text-sm mt-1">Online Registration & Guide — {data.season} Season</p>
            </div>

            <MembershipStepper season={data.season} steps={data.steps} />
        </div>
    );
}