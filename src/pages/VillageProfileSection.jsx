/**
 * VillageProfileSection.jsx — Section 6: Village Profile
 * ─────────────────────────────────────────────────────────────────────────────
 * Now uses a single "Generate All" button for the entire section.
 * Individual field‑generate buttons are hidden.
 * Sub‑sections are displayed with plain h2 headings (no collapsible wrappers).
 */

import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { VILLAGE_PROFILE_SECTIONS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// ── Flatten all fields from all subsections ────────────────────────────────
const ALL_PROFILE_FIELDS = VILLAGE_PROFILE_SECTIONS.flatMap((section) => section.fields);

// ── "Generate All" button (same as Sections 8, 9, 10) ──────────────────────
function SectionGenerateBtn({ fields, fieldLoading, onGenerate, label }) {
  const isAnyLoading = fields.some((f) => fieldLoading[f.id]);

  const handleGenerateAll = useCallback(async () => {
    for (const field of fields) {
      await new Promise((resolve) => {
        onGenerate(field.id, FIELD_API_PAYLOAD[field.id]);
        setTimeout(resolve, 300);
      });
    }
  }, [fields, onGenerate]);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", margin: 0 }}>
      <button
        onClick={handleGenerateAll}
        disabled={isAnyLoading}
        type="button"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 16px", fontSize: 12, fontWeight: 600,
          borderRadius: 4, border: "none",
          cursor: isAnyLoading ? "not-allowed" : "pointer",
          color: "#fff",
          background: "linear-gradient(to right, #3b82f6, #1e40af)",
          fontFamily: "inherit",
          opacity: isAnyLoading ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => { if (!isAnyLoading) e.currentTarget.style.opacity = "0.88"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = isAnyLoading ? "0.7" : "1"; }}
      >
        {isAnyLoading ? (
          <>
            <span style={{
              display: "inline-block", width: 11, height: 11,
              border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
              borderRadius: "50%", animation: "sec6-spin 0.7s linear infinite",
            }} />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate All — Section 6
          </>
        )}
        <style>{`@keyframes sec6-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
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
      {/* ── Heading row with Generate All button ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>6. Village Profile</h1>
        <SectionGenerateBtn
          fields={ALL_PROFILE_FIELDS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 6"
        />
      </div>

      {/* <p style={{ fontSize: 13, color: "#78716c", marginBottom: 20, paddingLeft: 12 }}>
        Village: <strong style={{ color: "#1a3e74" }}>{village}</strong>. Click{" "}
        <strong style={{ color: "#3b82f6" }}>Generate All</strong> to populate every field with AI.
        You can still <strong style={{ color: "#00529d" }}>Edit</strong> each field manually after generation.
      </p> */}

      {/* ── Subsections ── */}
      {VILLAGE_PROFILE_SECTIONS.map((section, index) => (
        <div key={section.id}>
          <h2 style={{ marginTop: index === 0 ? 24 : 36 }}>
            {section.title}
          </h2>
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
              hideGenerateBtn
            />
          ))}
        </div>
      ))}
    </div>
  );
}