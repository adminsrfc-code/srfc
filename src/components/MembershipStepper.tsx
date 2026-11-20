"use client";

import { useState } from "react";

export type StepData = {
    title: string;
    subtitle?: string;
    // We accept either a plain string or fully rendered React nodes for content flexibility
    contentHtml?: string;
    rates?: Array<{ label: string; amount: string; note?: string }>;
    bankDetails?: {
        accountName: string;
        accountNumber: string;
        sortCode: string;
        referenceGuide: string;
    };
};

type MembershipStepperProps = {
    season: string; // e.g. "2026/27"
    steps: StepData[];
};

export function MembershipStepper({ season, steps }: MembershipStepperProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const totalSteps = steps.length;
    const activeStep = steps[currentStep];
    const progressPct = Math.round(((currentStep + 1) / totalSteps) * 100);

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (!activeStep) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 font-body">
            {/* Stepper Header / Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold uppercase tracking-wider text-maroon">
                        Season {season} — Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className="text-sm text-muted">
                        {progressPct}% Completed
                    </span>
                </div>

                {/* Native <progress> element — screen readers announce value automatically */}
                <progress
                    value={currentStep + 1}
                    max={totalSteps}
                    aria-label={`Step ${currentStep + 1} of ${totalSteps}: ${activeStep.title}`}
                    className="w-full h-2 rounded-full progress-maroon"
                />

                {/* Step Navigation Pills */}
                <div
                    className="flex gap-2 overflow-x-auto mt-4 pb-2"
                    role="list"
                    aria-label="Membership steps"
                >
                    {steps.map((step, index) => {
                        const isActive = currentStep === index;
                        return (
                            <button
                                key={step.title}
                                type="button"
                                role="listitem"
                                aria-current={isActive ? "step" : undefined}
                                onClick={() => {
                                    setCurrentStep(index);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${isActive
                                    ? "bg-maroon text-white"
                                    : "bg-cream text-slate border border-border hover:border-maroon/40"
                                    }`}
                            >
                                {index + 1}. {step.title}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-border rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
                <h2 className="font-display font-bold text-2xl text-slate mb-2">
                    {currentStep + 1}. {activeStep.title}
                </h2>
                {activeStep.subtitle && (
                    <p className="text-sm text-muted mb-6">{activeStep.subtitle}</p>
                )}

                {/* Dynamic rendering based on data provided in props */}
                <div className="space-y-6 text-slate/80">
                    {/* Text/HTML representation if provided */}
                    {activeStep.contentHtml && (
                        <div
                            className="prose max-w-none text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: activeStep.contentHtml }}
                        />
                    )}

                    {/* Rates Table / List if provided */}
                    {activeStep.rates && activeStep.rates.length > 0 && (
                        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                            {activeStep.rates.map((rate, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-cream/30">
                                    <div>
                                        <span className="font-semibold text-slate block">{rate.label}</span>
                                        {rate.note && <span className="text-xs text-muted">{rate.note}</span>}
                                    </div>
                                    <span className="font-display font-bold text-lg text-maroon">
                                        {rate.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bank Info Box if provided */}
                    {activeStep.bankDetails && (
                        <div className="bg-cream p-5 rounded-xl border border-border space-y-2 text-sm">
                            <p><strong>Account Name:</strong> {activeStep.bankDetails.accountName}</p>
                            <p><strong>Account Number:</strong> {activeStep.bankDetails.accountNumber}</p>
                            <p><strong>Sort Code:</strong> {activeStep.bankDetails.sortCode}</p>
                            <div className="mt-3 pt-3 border-t border-border/60">
                                <p className="text-xs text-muted">
                                    <strong>Reference Guide:</strong> {activeStep.bankDetails.referenceGuide}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Footer Controls */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${currentStep === 0
                        ? "opacity-40 cursor-not-allowed bg-border text-muted"
                        : "bg-white text-slate border border-border hover:border-maroon hover:text-maroon"
                        }`}
                >
                    ← Previous Step
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentStep === totalSteps - 1}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${currentStep === totalSteps - 1
                        ? "opacity-40 cursor-not-allowed bg-border text-muted"
                        : "bg-maroon text-white hover:bg-maroon-deep shadow-md shadow-maroon/20"
                        }`}
                >
                    Next Step →
                </button>
            </div>
        </div>
    );
}