import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findFlagged, isFlagged, findFlaggedInDraft, registryVersion } from "../../lib/guard/securityChecker";

describe("securityChecker", () => {
  it("isFlagged returns true for known flagged address", () => {
    assert.equal(isFlagged("GBADFLAGEXAMPLE000000000000000000000000000000000000000"), true);
  });

  it("findFlagged finds flagged addresses in array", () => {
    const found = findFlagged(["GPHISHINGADDR0000000000000000000000000000000000000000", "GOK"]);
    assert.ok(found.includes("GPHISHINGADDR0000000000000000000000000000000000000000"));
  });

  it("findFlaggedInDraft detects flagged addresses in form fields", () => {
    const draft = {
      assets: "GBADFLAGEXAMPLE000000000000000000000000000000000000000\nGOKASSET",
      recipients: "GPHISHINGADDR0000000000000000000000000000000000000000",
      protocols: "GOKPROTO\nGBADFLAGEXAMPLE000000000000000000000000000000000000000:swap",
    };
    const found = findFlaggedInDraft(draft);
    assert.deepEqual(found.sort(), [
      "GBADFLAGEXAMPLE000000000000000000000000000000000000000",
      "GPHISHINGADDR0000000000000000000000000000000000000000",
    ].sort());
  });

  it("registryVersion is populated", () => {
    assert.match(registryVersion(), /2026/);
  });
});
