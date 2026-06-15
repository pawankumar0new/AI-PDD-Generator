/**
 * VillageProfileSection.jsx — Section 6: Village Profile
 * ─────────────────────────────────────────────────────────────────────────────
 * Replaces the hardcoded PROFILE_ROWS table with LLMFieldBlock per section.
 * Each sub-section field has its own Generate button.
 *
 * Props received from App.jsx:
 *   village        {string}
 *   fieldContent   { [fieldId]: htmlString }
 *   fieldLoading   { [fieldId]: boolean }
 *   fieldErrors    { [fieldId]: string|null }
 *   onGenerate     (fieldId, apiPayload) => void
 *   onChange       (fieldId, html) => void
 */

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { VILLAGE_PROFILE_SECTIONS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// ── Collapsible section wrapper ───────────────────────────────────────────────
function ProfileSection({ section, fieldContent, fieldLoading, fieldErrors, onGenerate, onChange }) {
  const [collapsed, setCollapsed] = useState(false);

  const filledCount = section.fields.filter((f) => fieldContent[f.id]).length;
  const totalCount  = section.fields.length;
  const allFilled   = filledCount === totalCount;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Section heading row */}
      <div
        onClick={() => setCollapsed((v) => !v)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", padding: "10px 14px",
          background: "linear-gradient(to right, #eff6ff, #f0f9ff)",
          border: "1px solid #bfdbfe",
          borderRadius: collapsed ? 8 : "8px 8px 0 0",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "monospace", fontSize: 11, fontWeight: 900,
            background: "#1d4ed8", color: "#fff",
            borderRadius: 5, padding: "2px 8px",
          }}>
            {section.id}
          </span>
          <h2 style={{
            margin: 0, fontSize: 13, fontWeight: 700,
            color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            {section.title.replace(/^\d+\.\d+\s+/, "")}
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: allFilled ? "#15803d" : "#6b7280",
            background: allFilled ? "#dcfce7" : "#f3f4f6",
            borderRadius: 999, padding: "2px 8px",
          }}>
            {filledCount}/{totalCount} filled
          </span>
          {collapsed ? <ChevronDown size={14} color="#6b7280" /> : <ChevronUp size={14} color="#6b7280" />}
        </div>
      </div>

      {/* Fields */}
      {!collapsed && (
        <div style={{
          border: "1px solid #bfdbfe", borderTop: "none",
          borderRadius: "0 0 8px 8px", padding: "20px 20px 8px",
          background: "#fff",
        }}>
          {section.fields.map((field) => (
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
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function VillageProfileSection({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  return (
    <div className="pdd-content-container">
      <h1>6. Village Profile</h1>
      <p style={{ fontSize: 13, color: "#78716c", marginBottom: 20, paddingLeft: 12 }}>
        Village: <strong style={{ color: "#1a3e74" }}>{village}</strong>. Click{" "}
        <strong style={{ color: "#3b82f6" }}>Generate</strong> on each field to populate with AI,
        or <strong style={{ color: "#00529d" }}>Edit</strong> to write manually.
      </p>

      {VILLAGE_PROFILE_SECTIONS.map((section) => (
        <ProfileSection
          key={section.id}
          section={section}
          fieldContent={fieldContent}
          fieldLoading={fieldLoading}
          fieldErrors={fieldErrors}
          onGenerate={onGenerate}
          onChange={onChange}
        />
      ))}
    </div>
  );
}