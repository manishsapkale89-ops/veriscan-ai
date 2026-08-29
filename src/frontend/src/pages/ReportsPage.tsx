import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { verificationRecords } from "@/data/mockData";
import { useToast } from "@/hooks/useToast";
import type { DocumentType, VerificationStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  FileCheck2,
  FileSearch,
  Search,
  SearchX,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const statusOptions: { value: "all" | VerificationStatus; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "verified", label: "Verified" },
  { value: "suspicious", label: "Suspicious" },
  { value: "fake", label: "Fake" },
];

const documentTypeOptions: { value: "all" | DocumentType; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "Aadhaar Card", label: "Aadhaar Card" },
  { value: "PAN Card", label: "PAN Card" },
  { value: "Passport", label: "Passport" },
  { value: "Driving License", label: "Driving License" },
  { value: "Voter ID", label: "Voter ID" },
  { value: "Bank Statement", label: "Bank Statement" },
];

const statusAccent: Record<string, string> = {
  verified: "bg-success/15 text-success",
  suspicious: "bg-warning/15 text-warning",
  fake: "bg-destructive/15 text-destructive",
};

export default function ReportsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | VerificationStatus>("all");
  const [documentType, setDocumentType] = useState<"all" | DocumentType>("all");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return verificationRecords.filter((record) => {
      if (status !== "all" && record.status !== status) return false;
      if (documentType !== "all" && record.documentType !== documentType)
        return false;
      if (!query) return true;
      return (
        record.documentNumber.toLowerCase().includes(query) ||
        record.holderName.toLowerCase().includes(query) ||
        record.documentType.toLowerCase().includes(query)
      );
    });
  }, [search, status, documentType]);

  const handleExport = () => {
    toast.success(
      "Export started",
      "Your report is being prepared for download.",
    );
  };

  const goToResult = (id: string) => {
    navigate({ to: "/result/$id", params: { id } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Search and review all previous document verifications"
        action={
          <Button
            data-ocid="reports.export_button"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="size-4" />
            Export
          </Button>
        }
      />

      {/* Search + filters */}
      <section
        data-ocid="reports.filters_section"
        aria-label="Search and filters"
        className="flex flex-col gap-3 lg:flex-row lg:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            data-ocid="reports.search_input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by document number, holder name, or type..."
            className="pl-9"
            aria-label="Search reports"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "all" | VerificationStatus)
            }
          >
            <SelectTrigger
              data-ocid="reports.status_select"
              className="w-full sm:w-44"
              aria-label="Filter by status"
            >
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={documentType}
            onValueChange={(value) =>
              setDocumentType(value as "all" | DocumentType)
            }
          >
            <SelectTrigger
              data-ocid="reports.type_select"
              className="w-full sm:w-44"
              aria-label="Filter by document type"
            >
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {documentTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Reports table */}
      <section data-ocid="reports.table_section" aria-label="Reports table">
        <GlassCard className="p-5 sm:p-6">
          {loading ? (
            <LoadingSkeleton lines={6} />
          ) : filtered.length === 0 ? (
            <div
              data-ocid="reports.empty_state"
              className="flex flex-col items-center justify-center gap-3 py-16 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <SearchX className="size-7" />
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                No reports found
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                No verifications match your current search and filters. Try
                adjusting your criteria to see more results.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Document ID</th>
                    <th className="pb-3 pr-4 font-medium">Document Type</th>
                    <th className="pb-3 pr-4 font-medium">Holder</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Confidence</th>
                    <th className="pb-3 text-right font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record, index) => (
                    <tr
                      key={record.id}
                      data-ocid={`reports.row.${index + 1}`}
                      className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/40"
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                              statusAccent[record.status] ??
                              "bg-primary/15 text-primary"
                            }`}
                          >
                            <FileCheck2 className="size-4" />
                          </span>
                          <span className="font-mono text-xs font-medium">
                            {record.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-muted-foreground">
                        {record.documentType}
                      </td>
                      <td className="py-3.5 pr-4 font-medium">
                        {record.holderName}
                      </td>
                      <td className="py-3.5 pr-4 text-muted-foreground">
                        {record.date}
                      </td>
                      <td className="py-3.5 pr-4">
                        <StatusBadge status={record.status} />
                      </td>
                      <td className="py-3.5 pr-4">
                        <ProgressBar
                          value={record.confidenceScore}
                          showLabel
                          className="w-28"
                        />
                      </td>
                      <td className="py-3.5 text-right">
                        <Button
                          data-ocid={`reports.view_result_button.${index + 1}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => goToResult(record.id)}
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
    </div>
  );
}
