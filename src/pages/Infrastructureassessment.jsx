/**
 * InfrastructureAssessment.jsx — Section 8: Infrastructure Assessment and Gaps
 * ─────────────────────────────────────────────────────────────────────────────
 * Single "Generate All" button at the top (inline with heading) generates all fields sequentially.
 */

import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import {
  INFRA_WATER_FIELD_DEFS,
  INFRA_SANITATION_FIELD_DEFS,
  INFRA_DRAINAGE_FIELD_DEFS,
  INFRA_TRACK_FIELD_DEFS,
  INFRA_SOLIDWASTE_FIELD_DEFS,
  FIELD_API_PAYLOAD,
} from "../data/pddStructure";
import "./SectionPages.css";

// ── Helper: Generate All button for the ENTIRE section ──────────────────
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
              borderRadius: "50%", animation: "sec8-spin 0.7s linear infinite",
            }} />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate All — {label}
          </>
        )}
        <style>{`@keyframes sec8-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </div>
  );
}

export default function InfrastructureAssessment({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  const allFields = [
    ...INFRA_WATER_FIELD_DEFS,
    ...INFRA_SANITATION_FIELD_DEFS,
    ...INFRA_DRAINAGE_FIELD_DEFS,
    ...INFRA_TRACK_FIELD_DEFS,
    ...INFRA_SOLIDWASTE_FIELD_DEFS,
  ];

  return (
    <div className="pdd-content-container">
      {/* ── Heading row with button inline ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>8. Infrastructure Assessment and Gaps</h1>
        <SectionGenerateBtn
          fields={allFields}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 8"
        />
      </div>

      {/* ── 8.1 Existing Water Supply System ── */}
      <h2 style={{ marginTop: 24 }}>8.1 Existing Water Supply System</h2>
      {INFRA_WATER_FIELD_DEFS.map((field) => (
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

      {/* ── 8.2 Existing Sanitation System ── */}
      <h2 style={{ marginTop: 36 }}>8.2 Existing Sanitation System</h2>
      {INFRA_SANITATION_FIELD_DEFS.map((field) => (
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

      {/* ── 8.3 Existing Stormwater Drainage ── */}
      <h2 style={{ marginTop: 36 }}>8.3 Existing Stormwater Drainage</h2>
      {INFRA_DRAINAGE_FIELD_DEFS.map((field) => (
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

      {/* ── 8.4 Existing Track Conditions ── */}
      <h2 style={{ marginTop: 36 }}>8.4 Existing Track Conditions</h2>
      {INFRA_TRACK_FIELD_DEFS.map((field) => (
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

      {/* ── 8.5 Solid Waste Disposal System ── */}
      <h2 style={{ marginTop: 36 }}>8.5 Solid Waste Disposal System in Villages</h2>
      {INFRA_SOLIDWASTE_FIELD_DEFS.map((field) => (
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
  );
}