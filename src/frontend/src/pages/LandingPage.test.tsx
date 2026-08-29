import { router } from "@/routes";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("LandingPage", () => {
  it("renders the hero heading and brand", async () => {
    render(<RouterProvider router={router} />);
    expect(
      await screen.findByRole("heading", {
        name: /verify documents in seconds/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("VeriScan").length).toBeGreaterThan(0);
  });

  it("renders the primary navigation links", async () => {
    render(<RouterProvider router={router} />);
    const nav = await screen.findByRole("navigation", { name: "Primary" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reports" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument();
  });

  it("renders the feature cards", async () => {
    render(<RouterProvider router={router} />);
    expect(
      await screen.findByRole("heading", { name: "Real-time AI Screening" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Forgery Detection" }),
    ).toBeInTheDocument();
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    await user.click(toggle);
    expect(
      screen.getByRole("navigation", { name: "Mobile" }),
    ).toBeInTheDocument();
    await user.click(toggle);
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });
});
