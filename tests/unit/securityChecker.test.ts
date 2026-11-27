import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  findFlagged,
  isFlagged,
  findFlaggedInDraft,
  registryVersion,
} from "../../lib/guard/securityChecker";

describe("securityChecker", () => {
  test("isFlagged returns true for known flagged address", () => {
    assert.equal(isFlagged("GBADFLAGEXAMPLE000000000000000000000000000000000000000"), true);
  });

  test("findFlagged finds flagged addresses in array", () => {
    const found = findFlagged(["GPHISHINGADDR0000000000000000000000000000000000000000", "GOK"]);
    assert.ok(found.includes("GPHISHINGADDR0000000000000000000000000000000000000000"));
  });

  test("findFlaggedInDraft detects flagged addresses in form fields", () => {
    const draft = {
      assets: "GBADFLAGEXAMPLE000000000000000000000000000000000000000\nGOKASSET",
      recipients: "GPHISHINGADDR0000000000000000000000000000000000000000",
      protocols: "GOKPROTO\nGBADFLAGEXAMPLE000000000000000000000000000000000000000:swap",
    };
    const found = findFlaggedInDraft(draft);
    assert.deepEqual(
      found.sort(),
      [
        "GBADFLAGEXAMPLE000000000000000000000000000000000000000",
        "GPHISHINGADDR0000000000000000000000000000000000000000",
      ].sort(),
    );
  });

  test("registryVersion is populated", () => {
    assert.match(registryVersion(), /2026/);
  });
});
