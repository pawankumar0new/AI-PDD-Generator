/**
 * VillageBackground.jsx — Section 5: Village Background and Location
 * ─────────────────────────────────────────────────────────────────────────────
 * Now uses LLMFieldBlock instead of hardcoded dummy HTML.
 * Each sub-field has its own Generate button that fires one API call.
 *
 * Props received from App.jsx:
 *   village        {string}
 *   fieldContent   { [fieldId]: htmlString }   — from useLLMGenerate
 *   fieldLoading   { [fieldId]: boolean }       — from useLLMGenerate
 *   fieldErrors    { [fieldId]: string|null }   — from useLLMGenerate
 *   onGenerate     (fieldId, apiPayload) => void
 *   onChange       (fieldId, html) => void
 */

import React from "react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// ── Field definitions for Section 5 ─────────────────────────────────────────
// Section 5 is a narrative section — we treat each sub-topic as one field.
// The section numbers here are UI labels only (not returned by the API).
const SECTION5_FIELDS = [
  {
    id:            "village_background",
    label:         "Village Background and Location",
    sectionNumber: "5",
  },
  {
    id:            "admin_location",
    label:         "Administrative Location & Access Map",
    sectionNumber: "1.1.1",
  },
  {
    id:            "settlement_pattern",
    label:         "Settlement Pattern & Land Tenure",
    sectionNumber: "1.1.2",
  },
  {
    id:            "migration_history",
    label:         "Migration / History of Settlement",
    sectionNumber: "1.1.3",
  },
];

export default function VillageBackground({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  return (
    <div className="pdd-content-container">
      <h1>5. Village Background and Location</h1>

      {SECTION5_FIELDS.map((field) => (
        <LLMFieldBlock
          key={field.id}
          fieldId={field.id}
          label={field.label}
          sectionNumber={field.sectionNumber}
          html={fieldContent[field.id] || ""}
          loading={fieldLoading[field.id] || false}
          error={fieldErrors[field.id] || null}
          onGenerate={() => onGenerate(field.id, FIELD_API_PAYLOAD[field.id])}
          onChange={(html) => onChange(field.id, html)}
        />
      ))}
    </div>
  );
}