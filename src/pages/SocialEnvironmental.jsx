/**
 * SocialEnvironmental.jsx — Section 7: Social & Environmental Integration
 * ─────────────────────────────────────────────────────────────────────────────
 * Replaces hardcoded SOCIAL_FIELDS / ENV_FIELDS arrays with LLMFieldBlock
 * per field. Each field has its own Generate button.
 *
 * Props received from App.jsx:
 *   village        {string}
 *   fieldContent   { [fieldId]: htmlString }
 *   fieldLoading   { [fieldId]: boolean }
 *   fieldErrors    { [fieldId]: string|null }
 *   onGenerate     (fieldId, apiPayload) => void
 *   onChange       (fieldId, html) => void
 */

import React from "react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { SOCIAL_FIELD_DEFS, ENV_FIELD_DEFS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

export default function SocialEnvironmental({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  return (
    <div className="pdd-content-container">
      <h1>7. Social &amp; Environmental Integration</h1>

      {/* ── 7.1 Social Integration ── */}
      <h2>7.1  Social Integration</h2>
      {SOCIAL_FIELD_DEFS.map((field) => (
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

      {/* ── 7.2 Environmental Integration ── */}
      <h2 style={{ marginTop: 36 }}>7.2  Environmental Integration</h2>
      {ENV_FIELD_DEFS.map((field) => (
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