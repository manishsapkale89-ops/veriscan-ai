import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "@tanstack/react-router";
import {
  BadgeCheck,
  Banknote,
  Car,
  CheckCircle2,
  CreditCard,
  FileText,
  Fingerprint,
  IdCard,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];

const SUPPORTED_DOCUMENTS = [
  { label: "Aadhaar Card", icon: Fingerprint },
  { label: "PAN Card", icon: CreditCard },
  { label: "Passport", icon: IdCard },
  { label: "Driving License", icon: Car },
  { label: "Voter ID", icon: BadgeCheck },
  { label: "Bank Statement", icon: Banknote },
];

const MOCK_RESULT_ID = "VR-2024-001";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type UploadState = "idle" | "uploading" | "complete";

export default function UploadPage() {
  const router = useRouter();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const handleFile = useCallback(
    (selected: File | null) => {
      if (!selected) return;
      setFile(selected);
      setState("uploading");
      setProgress(0);
      clearTimer();

      const start = Date.now();
      const duration = 2600;
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const next = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(next);
        if (next >= 100) {
          clearTimer();
          setState("complete");
          toast.success(
            "Upload complete",
            "Your document is ready for verification.",
          );
        }
      }, 80);
    },
    [clearTimer, toast],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0] ?? null;
      handleFile(dropped);
    },
    [handleFile],
  );

  const reset = useCallback(() => {
    clearTimer();
    setFile(null);
    setState("idle");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }, [clearTimer]);

  const goToResult = useCallback(() => {
    void router.navigate({ to: "/result/$id", params: { id: MOCK_RESULT_ID } });
  }, [router]);

  const isBusy = state === "uploading";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Upload Document"
        subtitle="Submit an identity or financial document for AI-powered verification."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Drop zone + preview */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <GlassCard glow className="p-6 sm:p-8">
            {state === "idle" ? (
              <button
                type="button"
                data-ocid="dropzone"
                aria-label="Upload a document"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-smooth ${
                  isDragging
                    ? "border-primary bg-gradient-subtle scale-[1.01]"
                    : "border-border/70 hover:border-primary/60 hover:bg-accent/20"
                }`}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="bg-gradient-primary flex size-16 items-center justify-center rounded-2xl shadow-elevated"
                >
                  <UploadCloud className="size-8 text-primary-foreground" />
                </motion.div>
                <div>
                  <p className="font-display text-lg font-semibold">
                    Drag &amp; drop your document here
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or click to browse from your device
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  PDF, PNG, JPG, JPEG or WEBP · Max 10 MB
                </p>
              </button>
            ) : (
              <div className="flex flex-col gap-5">
                {/* File preview card */}
                <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div className="bg-gradient-subtle flex size-14 shrink-0 items-center justify-center rounded-xl">
                    <FileText className="size-7 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{file?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file ? formatFileSize(file.size) : ""} ·{" "}
                      {file?.type || "document"}
                    </p>
                  </div>
                  {!isBusy && (
                    <Button
                      data-ocid="remove_file_button"
                      variant="ghost"
                      size="icon"
                      onClick={reset}
                      aria-label="Remove file"
                    >
                      <X className="size-5" />
                    </Button>
                  )}
                </div>

                {/* Progress / success */}
                {state === "uploading" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="size-4 animate-spin text-primary" />
                        Uploading &amp; scanning…
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {progress}%
                      </span>
                    </div>
                    <ProgressBar value={progress} showLabel />
                  </div>
                )}

                {state === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    data-ocid="success_state"
                    className="flex flex-col items-center gap-4 rounded-2xl border border-success/30 bg-success/10 p-6 text-center"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full bg-success/20">
                      <CheckCircle2 className="size-8 text-success" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold">
                        Upload complete
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your document has been queued for AI verification.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Button
                        data-ocid="view_result_button"
                        type="button"
                        onClick={goToResult}
                      >
                        View Verification Result
                      </Button>
                      <Button
                        data-ocid="upload_another_button"
                        type="button"
                        variant="outline"
                        onClick={reset}
                      >
                        Upload another
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            <input
              ref={inputRef}
              data-ocid="file_input"
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </GlassCard>
        </div>

        {/* Supported document types */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="font-display text-base font-semibold">
              Supported document types
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              VeriScan verifies a wide range of identity and financial
              documents.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {SUPPORTED_DOCUMENTS.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.label}
                    data-ocid="document_type_card"
                    className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-background/40 p-4 text-center transition-smooth hover:border-primary/50 hover:bg-accent/20"
                  >
                    <div className="bg-gradient-subtle flex size-10 items-center justify-center rounded-lg">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{doc.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-accent/20 p-3 text-xs text-muted-foreground">
              <Fingerprint className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>
                Documents are analyzed locally in this prototype. No real data
                is uploaded or stored.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
