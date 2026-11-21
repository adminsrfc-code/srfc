import type { StepData } from "./MembershipStepper";

export function getStepAnchorId(title: string, index: number): string {
    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return slug || `step-${index + 1}`;
}

export function renderStepBody(step: StepData) {
    return (
        <div className="space-y-6 text-slate/80">
            {step.contentHtml && (
                <div
                    className="prose max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.contentHtml }}
                />
            )}

            {step.rates && step.rates.length > 0 && (
                <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                    {step.rates.map((rate, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 p-4 bg-cream/30">
                            <div>
                                <span className="font-semibold text-slate block">{rate.label}</span>
                                {rate.note && <span className="text-xs text-muted">{rate.note}</span>}
                            </div>
                            <span className="font-display font-bold text-lg text-maroon shrink-0">
                                {rate.amount}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {step.bankDetails && (
                <div className="bg-cream p-5 rounded-xl border border-border space-y-2 text-sm break-words">
                    <p><strong>Account Name:</strong> {step.bankDetails.accountName}</p>
                    <p><strong>Account Number:</strong> {step.bankDetails.accountNumber}</p>
                    <p><strong>Sort Code:</strong> {step.bankDetails.sortCode}</p>
                    <div className="mt-3 pt-3 border-t border-border/60">
                        <p className="text-xs text-muted">
                            <strong>Reference Guide:</strong> {step.bankDetails.referenceGuide}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}