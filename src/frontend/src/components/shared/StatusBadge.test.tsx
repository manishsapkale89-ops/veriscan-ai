import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("StatusBadge", () => {
  it("renders the human-readable label for each status", () => {
    const { rerender } = render(<StatusBadge status="verified" />);
    expect(screen.getByText("Verified")).toBeInTheDocument();

    rerender(<StatusBadge status="suspicious" />);
    expect(screen.getByText("Suspicious")).toBeInTheDocument();

    rerender(<StatusBadge status="fake" />);
    expect(screen.getByText("Fake")).toBeInTheDocument();

    rerender(<StatusBadge status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("exposes a data-ocid keyed by status", () => {
    render(<StatusBadge status="verified" />);
    expect(screen.getByTestId("status_badge_verified")).toBeInTheDocument();
  });
});

describe("ProgressBar", () => {
  it("clamps the value to the 0-100 range", () => {
    const { rerender } = render(<ProgressBar value={150} />);
    expect(screen.getByTestId("progress_bar")).toBeInTheDocument();

    rerender(<ProgressBar value={-10} />);
    expect(screen.getByTestId("progress_bar")).toBeInTheDocument();
  });

  it("shows a formatted label when showLabel is set", () => {
    render(<ProgressBar value={96.2} showLabel />);
    expect(screen.getByText("96.2%")).toBeInTheDocument();
  });

  it("does not render a label by default", () => {
    render(<ProgressBar value={50} />);
    expect(screen.queryByText("50.0%")).not.toBeInTheDocument();
  });
});
