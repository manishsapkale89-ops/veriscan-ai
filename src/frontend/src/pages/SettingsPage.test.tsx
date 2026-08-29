import { router } from "@/routes";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

async function renderSettings() {
  render(<RouterProvider router={router} />);
  await router.navigate({ to: "/settings" });
  await screen.findByRole("heading", { name: "Settings" });
  await screen.findByDisplayValue("Aarav Mehta");
}

describe("SettingsPage", () => {
  beforeEach(async () => {
    await router.invalidate();
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders the profile fields with initial values", async () => {
    await renderSettings();
    expect(screen.getByDisplayValue("Aarav Mehta")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("aarav.mehta@veriscan.ai"),
    ).toBeInTheDocument();
  });

  it("updates a profile field when edited", async () => {
    const user = userEvent.setup();
    await renderSettings();
    const nameInput = screen.getByLabelText("Name");
    await user.clear(nameInput);
    await user.type(nameInput, "New Name");
    expect(screen.getByDisplayValue("New Name")).toBeInTheDocument();
  });

  it("toggles the theme between light and dark", async () => {
    const user = userEvent.setup();
    await renderSettings();
    const darkButton = screen.getByRole("button", { name: "Dark theme" });
    const lightButton = screen.getByRole("button", { name: "Light theme" });
    expect(darkButton).toHaveAttribute("aria-pressed", "true");
    await user.click(lightButton);
    expect(lightButton).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
