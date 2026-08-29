import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Fingerprint,
  Gauge,
  Lock,
  Menu,
  ScanLine,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Real-time AI Screening",
    description:
      "Every document is analysed in seconds by a deep-learning engine that inspects structure, texture and metadata for anomalies.",
  },
  {
    icon: ScanLine,
    title: "Forgery Detection",
    description:
      "Detect tampered photos, altered fields and synthetic documents with pixel-level forensics and pattern recognition.",
  },
  {
    icon: Fingerprint,
    title: "Identity Matching",
    description:
      "Cross-check faces, signatures and document data against trusted sources to confirm the person is who they claim to be.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Ready",
    description:
      "Stay audit-ready with tamper-proof verification logs, retention controls and full traceability for every check.",
  },
  {
    icon: Gauge,
    title: "Instant Results",
    description:
      "Get a clear verdict and confidence score in under a minute, with a detailed breakdown you can act on immediately.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Documents are encrypted in transit and at rest. Your data is never shared, sold or used to train models.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Document",
    description:
      "Drop in an ID, passport, licence or any official document. Supported formats are handled automatically.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our engine inspects the document across dozens of forensic signals and cross-references identity data.",
  },
  {
    number: "03",
    title: "Get Verdict",
    description:
      "Receive a clear verdict — Verified, Suspicious or Fake — with a confidence score and full evidence trail.",
  },
  {
    number: "04",
    title: "Take Action",
    description:
      "Approve, flag or reject with one click. Every decision is logged and ready for your compliance review.",
  },
];

const footerColumns = [
  {
    heading: "Product",
    links: ["Dashboard", "Upload", "Reports", "Settings"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API Reference", "Security", "Status"],
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-aurora text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            data-ocid="landing.brand"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elevated">
              <ShieldCheck className="size-5" />
            </span>
            VeriScan
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`landing.nav_${link.label.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild size="lg">
              <Link to="/dashboard" data-ocid="landing.nav_cta">
                Request Demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            data-ocid="landing.menu_toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav
            className="border-t border-border/60 bg-background/95 px-4 py-4 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={`landing.mobile_nav_${link.label.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="lg" className="mt-2">
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Request Demo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          data-ocid="landing.hero"
          className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-20 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div
                className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
                data-ocid="landing.hero_badge"
              >
                <Sparkles className="size-4 text-primary" />
                AI-powered identity &amp; document screening
              </div>

              <h1
                className="animate-fade-in-up mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                Verify documents in seconds,{" "}
                <span className="text-gradient">not days</span>
              </h1>

              <p
                className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                VeriScan uses advanced AI to detect forged IDs, tampered
                documents and identity fraud in real time — giving your team a
                clear verdict and confidence score for every check.
              </p>

              <div
                className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ animationDelay: "240ms" }}
              >
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/dashboard" data-ocid="landing.hero_primary">
                    Start Verifying
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link to="/reports" data-ocid="landing.hero_secondary">
                    View Demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product visual */}
            <div
              className="animate-fade-in-up relative mx-auto mt-16 max-w-4xl"
              style={{ animationDelay: "320ms" }}
            >
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-primary opacity-20 blur-3xl" />
              <GlassCard glow className="p-2 sm:p-3">
                <div className="overflow-hidden rounded-xl border border-border/60 bg-card/80">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                    <span className="size-3 rounded-full bg-destructive/70" />
                    <span className="size-3 rounded-full bg-warning/70" />
                    <span className="size-3 rounded-full bg-success/70" />
                    <span className="ml-3 hidden rounded-md bg-muted px-3 py-1 font-mono text-xs text-muted-foreground sm:block">
                      veriscan.ai/verify/231A9F4
                    </span>
                  </div>

                  <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-6">
                    {/* Document preview */}
                    <div className="sm:col-span-3">
                      <div className="rounded-xl border border-border/60 bg-gradient-subtle p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Document ID
                            </p>
                            <p className="mt-1 font-mono text-lg font-semibold">
                              231A9F4
                            </p>
                          </div>
                          <StatusBadge status="verified" />
                        </div>

                        <div className="mt-5 flex items-center gap-4">
                          <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elevated">
                            <Fingerprint className="size-7" />
                          </div>
                          <div>
                            <p className="font-display font-semibold">
                              National ID Card
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Aadhaar · India
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-2.5">
                          {[
                            { label: "Document integrity", value: "98%" },
                            { label: "Face match", value: "96%" },
                            { label: "Metadata check", value: "Pass" },
                          ].map((row) => (
                            <div
                              key={row.label}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-muted-foreground">
                                {row.label}
                              </span>
                              <span className="font-medium">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI confidence */}
                    <div className="flex flex-col justify-between gap-4 sm:col-span-2">
                      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <BrainCircuit className="size-4 text-primary" />
                          AI Confidence Score
                        </div>
                        <p className="mt-3 font-display text-4xl font-bold">
                          <span className="text-gradient">96.2%</span>
                        </p>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full w-[96%] rounded-full bg-gradient-primary" />
                        </div>
                        <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-success">
                          <CheckCircle2 className="size-4" />
                          Genuine document
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
                        <p className="text-sm font-medium text-muted-foreground">
                          Checks completed
                        </p>
                        <p className="mt-1 font-display text-2xl font-bold">
                          24 / 24
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          All forensic signals passed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Floating stat chips */}
              <div className="animate-float-slow absolute -left-4 top-16 hidden rounded-xl border border-border/60 bg-card/80 px-4 py-3 shadow-elevated backdrop-blur lg:block">
                <p className="text-xs text-muted-foreground">Verified today</p>
                <p className="font-display text-xl font-bold text-success">
                  +12,480
                </p>
              </div>
              <div
                className="animate-float-slow absolute -right-4 bottom-16 hidden rounded-xl border border-border/60 bg-card/80 px-4 py-3 shadow-elevated backdrop-blur lg:block"
                style={{ animationDelay: "2s" }}
              >
                <p className="text-xs text-muted-foreground">Avg. response</p>
                <p className="font-display text-xl font-bold">0.8s</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          data-ocid="landing.features"
          className="border-t border-border/60 bg-background/40 px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Capabilities
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to screen with confidence
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A complete toolkit for verifying identities and documents at
                scale, without slowing your team down.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <GlassCard key={feature.title} hover className="p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-subtle text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          data-ocid="landing.how_it_works"
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                From upload to verdict in four steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A simple, transparent flow your team can trust and your
                customers can understand.
              </p>
            </div>

            <div className="relative mt-14 grid gap-8 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-primary opacity-30 md:block" />
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative text-center md:text-left"
                >
                  <div className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-primary font-display text-lg font-bold text-primary-foreground shadow-elevated md:mx-0">
                    {step.number}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section data-ocid="landing.cta" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-primary px-6 py-16 text-center shadow-elevated sm:px-12">
              <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute -left-10 -top-10 size-64 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-16 -right-10 size-72 rounded-full bg-white/20 blur-3xl" />
              </div>
              <div className="relative">
                <BadgeCheck className="mx-auto size-12 text-primary-foreground/90" />
                <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Start screening documents with AI today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                  Join thousands of teams protecting their business from
                  identity fraud. No credit card required.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-background text-foreground shadow-elevated hover:bg-background/90"
                  >
                    <Link to="/dashboard" data-ocid="landing.cta_primary">
                      Start Verifying
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Link to="/reports" data-ocid="landing.cta_secondary">
                      View Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        data-ocid="landing.footer"
        className="border-t border-border/60 bg-background/60 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <Link
                to="/"
                data-ocid="landing.footer_brand"
                className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elevated">
                  <ShieldCheck className="size-5" />
                </span>
                VeriScan
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                AI-powered identity and document screening that helps you verify
                faster and trust every result.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        data-ocid={`landing.footer_${item.toLowerCase()}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} VeriScan. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname,
                )}`}
                target="_blank"
                rel="noreferrer"
                data-ocid="landing.footer_attribution"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
