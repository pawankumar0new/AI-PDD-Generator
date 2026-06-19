/**
 * DesignCriteria.jsx — Section 9: Design Criteria
 * ─────────────────────────────────────────────────────────────────────────────
 * Now includes "Generate" buttons for each sub‑section (9.1–9.3) in addition
 * to the overall "Generate All" button.
 */

import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import {
  DESIGN_WATER_FIELD_DEFS,
  DESIGN_SANITATION_FIELD_DEFS,
  DESIGN_DRAINAGE_FIELD_DEFS,
  FIELD_API_PAYLOAD,
} from "../data/pddStructure";
import "./SectionPages.css";

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
              borderRadius: "50%", animation: "sec9-spin 0.7s linear infinite",
            }} />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate All — {label}
          </>
        )}
        <style>{`@keyframes sec9-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </div>
  );
}

function SubSectionGenerateBtn({ fields, fieldLoading, onGenerate, label }) {
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
          padding: "4px 14px", fontSize: 11.5, fontWeight: 600,
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
              borderRadius: "50%", animation: "subsec-spin 0.7s linear infinite",
            }} />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate {label}
          </>
        )}
        <style>{`@keyframes subsec-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </div>
  );
}

export default function DesignCriteria({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  const allFields = [
    ...DESIGN_WATER_FIELD_DEFS,
    ...DESIGN_SANITATION_FIELD_DEFS,
    ...DESIGN_DRAINAGE_FIELD_DEFS,
  ];

  return (
    <div className="pdd-content-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>9. Design Criteria</h1>
        <SectionGenerateBtn
          fields={allFields}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 9"
        />
      </div>

      {/* 9.1 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>9.1 Design Considerations for Water Supply</h2>
        <SubSectionGenerateBtn
          fields={DESIGN_WATER_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="9.1"
        />
      </div>
      {DESIGN_WATER_FIELD_DEFS.map((field) => (
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

      {/* 9.2 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 36, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>9.2 Design Considerations for Sanitation</h2>
        <SubSectionGenerateBtn
          fields={DESIGN_SANITATION_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="9.2"
        />
      </div>
      {DESIGN_SANITATION_FIELD_DEFS.map((field) => (
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

      {/* 9.3 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 36, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>9.3 Design Considerations for Stormwater Drainage</h2>
        <SubSectionGenerateBtn
          fields={DESIGN_DRAINAGE_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="9.3"
        />
      </div>
      {DESIGN_DRAINAGE_FIELD_DEFS.map((field) => (
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