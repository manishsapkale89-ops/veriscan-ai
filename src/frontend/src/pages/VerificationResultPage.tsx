import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import {
  CardSkeleton,
  LoadingSkeleton,
} from "@/components/shared/LoadingSkeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { verificationRecords } from "@/data/mockData";
import { useToast } from "@/hooks/useToast";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  FileScan,
  Fingerprint,
  IdCard,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const statusAccent: Record<string, string> = {
  verified: "bg-success/15 text-success",
  suspicious: "bg-warning/15 text-warning",
  fake: "bg-destructive/15 text-destructive",
};

const severityConfig: Record<string, { label: string; className: string }> = {
  low: {
    label: "Low",
    className: "bg-success/15 text-success",
  },
  medium: {
    label: "Medium",
    className: "bg-warning/15 text-warning",
  },
  high: {
    label: "High",
    className: "bg-destructive/15 text-destructive",
  },
};

const aiDimensions = [
  {
    title: "Document Authenticity",
    icon: ShieldCheck,
    description:
      "Structural layout, security features and template match against the official issuing authority.",
  },
  {
    title: "Face Match",
    icon: User,
    description:
      "Comparison of the document photo against the submitted selfie and identity registry.",
  },
  {
    title: "Tamper Detection",
    icon: ScanLine,
    description:
      "Pixel-level analysis for edits, ghost images, hologram and watermark integrity.",
  },
  {
    title: "Data Consistency",
    icon: Fingerprint,
    description:
      "Cross-check of extracted fields against registry records and internal field coherence.",
  },
];

export default function VerificationResultPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const record =
    verificationRecords.find((r) => r.id === id) ?? verificationRecords[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const goBack = () => {
    navigate({ to: "/dashboard" });
  };

  const handleDownload = () => {
    toast.success(
      "Report downloaded",
      "The verification report has been saved.",
    );
  };

  const handleReverify = () => {
    toast.info(
      "Re-verification queued",
      "A fresh analysis has been scheduled.",
    );
  };

  const confidenceColor =
    record.status === "verified"
      ? "text-success"
      : record.status === "suspicious"
        ? "text-warning"
        : "text-destructive";

  const gaugeColor =
    record.status === "verified"
      ? "bg-success"
      : record.status === "suspicious"
        ? "bg-warning"
        : "bg-destructive";

  const extractedEntries = Object.entries(record.extractedFields);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification Result"
        subtitle={`Detailed analysis for document ${record.id}`}
        action={
          <Button
            data-ocid="result.back_button"
            variant="outline"
            onClick={goBack}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Button>
        }
      />

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <CardSkeleton className="lg:col-span-1" />
            <CardSkeleton className="lg:col-span-2" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {["ai-1", "ai-2", "ai-3", "ai-4"].map((key) => (
              <CardSkeleton key={key} />
            ))}
          </div>
          <CardSkeleton />
        </div>
      ) : (
        <>
          {/* Status banner */}
          <section
            data-ocid="result.status_section"
            aria-label="Verification status"
          >
            <GlassCard
              glow
              className={`p-5 sm:p-6 ${
                record.status === "verified"
                  ? "before:!bg-success"
                  : record.status === "suspicious"
                    ? "before:!bg-warning"
                    : "before:!bg-destructive"
              }`}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${
                      statusAccent[record.status] ??
                      "bg-primary/15 text-primary"
                    }`}
                  >
                    {record.status === "verified" ? (
                      <BadgeCheck className="size-7" />
                    ) : record.status === "suspicious" ? (
                      <ShieldAlert className="size-7" />
                    ) : (
                      <TriangleAlert className="size-7" />
                    )}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                        {record.status === "verified"
                          ? "Document Verified"
                          : record.status === "suspicious"
                            ? "Document Suspicious"
                            : "Document Flagged as Fake"}
                      </h2>
                      <StatusBadge status={record.status} />
                    </div>
                    <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                      {record.aiAnalysis}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                  <div className="flex items-center gap-2">
                    <Button
                      data-ocid="result.download_button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="gap-1.5"
                    >
                      <FileScan className="size-4" />
                      Download Report
                    </Button>
                    <Button
                      data-ocid="result.reverify_button"
                      size="sm"
                      onClick={handleReverify}
                      className="gap-1.5"
                    >
                      <Sparkles className="size-4" />
                      Re-verify
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Document preview */}
            <section
              data-ocid="result.preview_section"
              aria-label="Document preview"
            >
              <GlassCard className="p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <IdCard className="size-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    Document Preview
                  </h2>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-subtle p-5">
                  <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/20 blur-2xl" />
                  <div className="absolute -bottom-8 -left-8 size-32 rounded-full bg-accent/20 blur-2xl" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <User className="size-8" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-semibold">
                        {record.holderName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.documentType}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {record.documentNumber}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Document ID
                      </p>
                      <p className="font-mono">{record.id}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Verified On
                      </p>
                      <p>{record.date}</p>
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2">
                    <ScanLine className="size-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      Scanned &amp; analyzed by VeriScan AI
                    </span>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Confidence score */}
            <section
              data-ocid="result.confidence_section"
              aria-label="Confidence score"
              className="lg:col-span-2"
            >
              <GlassCard className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    AI Confidence Score
                  </h2>
                </div>

                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                  {/* Gauge */}
                  <div className="relative flex size-36 shrink-0 items-center justify-center">
                    <svg
                      viewBox="0 0 120 120"
                      className="size-36 -rotate-90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        strokeWidth="10"
                        className="stroke-muted"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${(record.confidenceScore / 100) * 326.7} 326.7`}
                        className={gaugeColor}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className={`font-display text-3xl font-bold tabular-nums ${confidenceColor}`}
                      >
                        {record.confidenceScore.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        confidence
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex-1 space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Overall confidence
                        </span>
                        <span className="font-mono tabular-nums">
                          {record.confidenceScore.toFixed(1)}%
                        </span>
                      </div>
                      <ProgressBar
                        value={record.confidenceScore}
                        indicatorClassName={gaugeColor}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="rounded-lg bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Document Type
                        </p>
                        <p className="mt-0.5 font-medium">
                          {record.documentType}
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">Holder</p>
                        <p className="mt-0.5 truncate font-medium">
                          {record.holderName}
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Risk Level
                        </p>
                        <p className="mt-0.5 font-medium">
                          {record.riskIndicators.some(
                            (r) => r.severity === "high",
                          )
                            ? "High"
                            : record.riskIndicators.some(
                                  (r) => r.severity === "medium",
                                )
                              ? "Medium"
                              : "Low"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Extracted information */}
            <section
              data-ocid="result.extracted_section"
              aria-label="Extracted information"
            >
              <GlassCard className="p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <FileScan className="size-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    Extracted Information
                  </h2>
                </div>

                <dl className="divide-y divide-border/60">
                  {extractedEntries.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </section>

            {/* Risk indicators */}
            <section
              data-ocid="result.risk_section"
              aria-label="Risk indicators"
            >
              <GlassCard className="p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldAlert className="size-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    Risk Indicators
                  </h2>
                </div>

                {record.riskIndicators.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No risk indicators detected for this document.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {record.riskIndicators.map((indicator, index) => {
                      const config =
                        severityConfig[indicator.severity] ??
                        severityConfig.low;
                      return (
                        <li
                          key={`${indicator.label}-${index}`}
                          data-ocid={`result.risk_item.${index + 1}`}
                          className="flex items-center justify-between gap-4 rounded-lg bg-muted/40 px-4 py-3"
                        >
                          <span className="flex items-center gap-2.5 text-sm font-medium">
                            <span
                              className={`size-2 shrink-0 rounded-full ${config.className}`}
                            />
                            {indicator.label}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
                          >
                            {config.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </GlassCard>
            </section>
          </div>

          {/* AI analysis cards */}
          <section data-ocid="result.ai_section" aria-label="AI analysis">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="font-display text-lg font-semibold tracking-tight">
                AI Analysis
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {aiDimensions.map((dimension, index) => {
                const Icon = dimension.icon;
                const score =
                  record.status === "verified"
                    ? 92 + index
                    : record.status === "suspicious"
                      ? 58 + index * 4
                      : 22 + index * 3;
                const verdict =
                  record.status === "verified"
                    ? "Pass"
                    : record.status === "suspicious"
                      ? "Review"
                      : "Fail";
                const verdictClass =
                  record.status === "verified"
                    ? "text-success"
                    : record.status === "suspicious"
                      ? "text-warning"
                      : "text-destructive";
                return (
                  <GlassCard key={dimension.title} hover className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${verdictClass}`}
                      >
                        {verdict}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
                      {dimension.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {dimension.description}
                    </p>
                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Score</span>
                        <span className="font-mono tabular-nums">{score}%</span>
                      </div>
                      <ProgressBar
                        value={score}
                        indicatorClassName={
                          record.status === "verified"
                            ? "bg-success"
                            : record.status === "suspicious"
                              ? "bg-warning"
                              : "bg-destructive"
                        }
                      />
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
