import type { Metadata } from "next";
import { Fixture, getSouthwellFixtures } from "@/lib/rfu";
import { FixtureClient } from "./FixtureClient";
import { getSetting, getSheetFixtures, getSheetSubs } from "@/lib/sheets";

export const metadata: Metadata = {
    title: "Events",
    description:
        "Southwell RFC fixtures, results and upcoming events. Counties 1 Midlands East (North) and all team schedules.",
};

export const revalidate = 300;

function mergeFixtures(apiFixtures: Fixture[], sheetFixtures: Omit<Fixture, "id">[]): Fixture[] {
    // 1. Create a Map to store unique fixtures by a composite key
    const fixtureMap = new Map<string, Fixture>();

    // Helper to generate a unique signature for matching
    const getSignature = (f: { date: string; team: string; homeTeam: string; awayTeam: string }) =>
        `${f.date}_${f.team}_${f.homeTeam}_${f.awayTeam}`.toLowerCase().trim();

    // 2. Load API fixtures into the map first
    for (const fixture of apiFixtures) {
        const key = getSignature(fixture);
        fixtureMap.set(key, fixture);
    }

    // 3. Process sheet fixtures: generate an ID on the fly and overwrite API matches
    sheetFixtures.forEach((sheetFixture, index) => {
        const key = getSignature(sheetFixture);

        // Generate an ID for the sheet fixture (using crypto.randomUUID or a fallback string)
        const newId = `sheet-${index}-${Date.now()}`;

        const completeSheetFixture: Fixture = {
            ...sheetFixture,
            id: newId,
        };

        // Because we set this AFTER apiFixtures, sheetFixtures will overwrite any duplicates
        fixtureMap.set(key, completeSheetFixture);
    });

    // 4. Convert the Map values back into a single consolidated array
    return Array.from(fixtureMap.values());
}

export default async function EventsPage() {
    // RFU API owns ALL fixture data — no duplicate entry in sheets
    // Google Sheets only provides social/club events (bonfire night, Christmas party, etc.)
    const [apiFixtures, sheetFixtures, sheetSubs] = await Promise.all([
        getSouthwellFixtures(),
        getSheetFixtures(),
        getSheetSubs()
    ]);

    const fixtures = mergeFixtures(apiFixtures, sheetFixtures);

    return (
        <div className="pt-16 lg:pt-20">
            <div className="bg-maroon-deep text-white py-14 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="font-body text-gold text-xs font-semibold tracking-widest uppercase block mb-3">
                        {sheetSubs.season}
                    </span>
                    <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-white">
                        FIXTURES
                    </h1>
                    <p className="font-body text-white/60 mt-4 text-lg max-w-xl">
                        Fixtures pulled live from England Rugby. Club events managed by the secretary.
                    </p>
                </div>
            </div>

            <FixtureClient fixtures={fixtures} />
        </div>
    );
}
