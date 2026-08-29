import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { CardSkeleton } from "@/components/shared/LoadingSkeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { dashboardStats, recentDocuments, reportRows } from "@/data/mockData";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  FileSearch,
  FileX2,
  Gauge,
  ShieldAlert,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

const statCards = [
  {
    label: "Total Verifications",
    value: dashboardStats.totalVerifications.toLocaleString(),
    icon: FileSearch,
    delta: 12.4,
    sparkline: dashboardStats.trend,
    accent: "blue" as const,
  },
  {
    label: "Verified",
    value: dashboardStats.verified.toLocaleString(),
    icon: BadgeCheck,
    delta: 8.1,
    sparkline: dashboardStats.trend,
    accent: "green" as const,
  },
  {
    label: "Suspicious",
    value: dashboardStats.suspicious.toLocaleString(),
    icon: ShieldAlert,
    delta: -3.2,
    sparkline: dashboardStats.trend,
    accent: "amber" as const,
  },
  {
    label: "Fake",
    value: dashboardStats.fake.toLocaleString(),
    icon: FileX2,
    delta: -1.4,
    sparkline: dashboardStats.trend,
    accent: "red" as const,
  },
  {
    label: "Confidence Average",
    value: `${dashboardStats.confidenceAverage}%`,
    icon: Gauge,
    delta: 2.3,
    sparkline: dashboardStats.trend,
    accent: "purple" as const,
  },
];

const statusAccent: Record<string, string> = {
  verified: "bg-success/15 text-success",
  suspicious: "bg-warning/15 text-warning",
  fake: "bg-destructive/15 text-destructive",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const goToUpload = () => {
    navigate({ to: "/upload" });
  };

  const goToResult = (id: string) => {
    navigate({ to: "/result/$id", params: { id } });
  };

  const handleViewAll = () => {
    toast.info("Reports", "Viewing all verification reports.");
    navigate({ to: "/reports" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your document verification activity"
        action={
          <Button
            data-ocid="dashboard.upload_button"
            onClick={goToUpload}
            className="gap-2"
          >
            <Upload className="size-4" />
            Upload Document
          </Button>
        }
      />

      {/* Statistics cards */}
      <section
        data-ocid="dashboard.stats_section"
        aria-label="Statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        {loading
          ? [0, 1, 2, 3, 4].map((n) => (
              <CardSkeleton key={`stat-skeleton-${n}`} />
            ))
          : statCards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                icon={card.icon}
                delta={card.delta}
                sparkline={card.sparkline}
                accent={card.accent}
              />
            ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent documents */}
        <section
          data-ocid="dashboard.recent_section"
          aria-label="Recent documents"
          className="lg:col-span-2"
        >
          <GlassCard className="p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  Recent Documents
                </h2>
                <p className="text-sm text-muted-foreground">
                  Latest verification results
                </p>
              </div>
              <Button
                data-ocid="dashboard.view_reports_button"
                variant="ghost"
                size="sm"
                onClick={handleViewAll}
                className="gap-1.5"
              >
                View all
                <ArrowRight className="size-4" />
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((n) => (
                  <CardSkeleton key={`row-skeleton-${n}`} />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Document</th>
                      <th className="pb-3 pr-4 font-medium">Holder</th>
                      <th className="pb-3 pr-4 font-medium">Date</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 pr-4 font-medium">Confidence</th>
                      <th className="pb-3 text-right font-medium">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDocuments.map((doc, index) => (
                      <tr
                        key={doc.id}
                        data-ocid={`dashboard.recent_row.${index + 1}`}
                        className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/40"
                      >
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                                statusAccent[doc.status] ??
                                "bg-primary/15 text-primary"
                              }`}
                            >
                              <FileCheck2 className="size-4" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-medium">
                                {doc.documentType}
                              </p>
                              <p className="font-mono text-xs text-muted-foreground">
                                {doc.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 text-muted-foreground">
                          {doc.holderName}
                        </td>
                        <td className="py-3.5 pr-4 text-muted-foreground">
                          {doc.date}
                        </td>
                        <td className="py-3.5 pr-4">
                          <StatusBadge status={doc.status} />
                        </td>
                        <td className="py-3.5 pr-4">
                          <ProgressBar
                            value={doc.confidenceScore}
                            showLabel
                            className="w-28"
                          />
                        </td>
                        <td className="py-3.5 text-right">
                          <Button
                            data-ocid={`dashboard.view_result_button.${index + 1}`}
                            variant="ghost"
                            size="sm"
                            onClick={() => goToResult(doc.id)}
                            className="gap-1"
                          >
                            View
                            <ArrowRight className="size-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </section>

        {/* Quick stats / activity summary */}
        <section
          data-ocid="dashboard.quick_stats_section"
          aria-label="Quick stats"
        >
          <GlassCard glow className="p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Quick Stats
            </h2>
            <p className="text-sm text-muted-foreground">
              Verification volume by document type
            </p>

            {loading ? (
              <div className="mt-5 space-y-4">
                {[0, 1, 2, 3, 4].map((n) => (
                  <CardSkeleton key={`quick-skeleton-${n}`} />
                ))}
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {reportRows.map((row) => {
                  const max = Math.max(...reportRows.map((r) => r.value));
                  const pct = (row.value / max) * 100;
                  return (
                    <div key={row.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {row.label}
                        </span>
                        <span className="font-mono tabular-nums">
                          {row.value.toLocaleString()}
                        </span>
                      </div>
                      <ProgressBar
                        value={pct}
                        indicatorClassName={
                          row.change >= 0
                            ? "bg-gradient-primary"
                            : "bg-destructive/70"
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
