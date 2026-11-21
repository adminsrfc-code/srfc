import type { StepData } from "./MembershipStepper";
import { getStepAnchorId, renderStepBody } from "./StepHelper"

type MobileMembershipGuideProps = {
    season: string;
    steps: StepData[];
};

export function MobileMembershipGuide({ season, steps }: MobileMembershipGuideProps) {
    if (!steps.length) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-6 font-body">
            {/* Quick #label jump pills */}
            <nav aria-label="Jump to section" className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-maroon mb-2">
                    Season {season} Guide
                </p>
                <div className="flex flex-wrap gap-2">
                    {steps.map((step, index) => {
                        const id = getStepAnchorId(step.title, index);
                        return (
                            <a
                                key={`${id}-${index}`}
                                href={`#${id}`}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate border border-border hover:border-maroon hover:text-maroon transition-colors"
                            >
                                #{id}
                            </a>
                        );
                    })}
                </div>
            </nav>

            {/* All steps rendered as #label sections */}
            <div className="space-y-6">
                {steps.map((step, index) => {
                    const id = getStepAnchorId(step.title, index);
                    return (
                        <section
                            key={`${id}-${index}`}
                            id={id}
                            aria-labelledby={`${id}-heading`}
                            className="scroll-mt-24 bg-white border border-border rounded-2xl shadow-sm p-5"
                        >
                            <a
                                href={`#${id}`}
                                className="inline-block text-[11px] font-mono text-maroon/70 hover:text-maroon mb-1"
                            >
                                #{id}
                            </a>
                            <h2
                                id={`${id}-heading`}
                                className="font-display font-bold text-xl text-slate mb-2"
                            >
                                {index + 1}. {step.title}
                            </h2>
                            {step.subtitle && (
                                <p className="text-sm text-muted mb-5">{step.subtitle}</p>
                            )}
                            {renderStepBody(step)}
                        </section>
                    );
                })}
            </div>
        </div>
    );
}