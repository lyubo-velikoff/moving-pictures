import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>Action</Badge>);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-[var(--surface-elevated)]");
  });

  it("applies accent variant styles", () => {
    render(<Badge variant="accent">Accent</Badge>);
    const badge = screen.getByText("Accent");
    expect(badge.className).toContain("bg-gradient-to-r");
  });

  it("applies outline variant styles", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("border");
    expect(badge.className).toContain("bg-transparent");
  });

  it("applies success variant styles", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge.className).toContain("text-emerald-400");
  });

  it("applies warning variant styles", () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText("Warning");
    expect(badge.className).toContain("text-amber-400");
  });

  it("applies small size", () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText("Small");
    expect(badge.className).toContain("text-xs");
  });

  it("applies medium size", () => {
    render(<Badge size="md">Medium</Badge>);
    const badge = screen.getByText("Medium");
    expect(badge.className).toContain("text-sm");
  });

  it("accepts custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge.className).toContain("custom-class");
  });
});
