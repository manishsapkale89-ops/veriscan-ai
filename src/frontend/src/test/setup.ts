import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";

// Generated components use data-ocid rather than data-testid.
configure({ testIdAttribute: "data-ocid" });
