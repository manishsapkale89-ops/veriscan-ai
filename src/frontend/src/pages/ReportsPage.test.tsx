import { router } from "@/routes";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

async function renderReports() {
  render(<RouterProvider router={router} />);
  await router.navigate({ to: "/reports" });
  // Wait for the loading skeleton to clear and the table to render.
  await screen.findByRole("heading", { name: "Reports" });
  await screen.findByText("VR-231A9F4");
}

describe("ReportsPage", () => {
  beforeEach(async () => {
    await router.invalidate();
  });

  it("renders the reports table with mock records", async () => {
    await renderReports();
    expect(screen.getByText("VR-231A9F4")).toBeInTheDocument();
    expect(screen.getByText("Rahul Sharma")).toBeInTheDocument();
  });

  it("filters records by search query", async () => {
    const user = userEvent.setup();
    await renderReports();
    const search = screen.getByRole("searchbox", { name: "Search reports" });
    await user.type(search, "Priya");
    expect(await screen.findByText("Priya Patel")).toBeInTheDocument();
    expect(screen.queryByText("Rahul Sharma")).not.toBeInTheDocument();
  });

  it("shows an empty state when no records match", async () => {
    const user = userEvent.setup();
    await renderReports();
    const search = screen.getByRole("searchbox", { name: "Search reports" });
    await user.type(search, "zzzz-no-match");
    expect(
      await screen.findByRole("heading", { name: "No reports found" }),
    ).toBeInTheDocument();
  });
});
