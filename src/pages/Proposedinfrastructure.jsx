/**
 * ProposedInfrastructure.jsx — Section 10: Proposed Infrastructure Solutions
 * ─────────────────────────────────────────────────────────────────────────────
 * Single "Generate All" button at the top (inline with heading) generates all fields sequentially.
 */

import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import {
  PROP_WATER_FIELD_DEFS,
  PROP_SANITATION_FIELD_DEFS,
  PROP_DRAINAGE_FIELD_DEFS,
  PROP_PAVEMENT_FIELD_DEFS,
  PROP_SOLIDWASTE_FIELD_DEFS,
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
              borderRadius: "50%", animation: "sec10-spin 0.7s linear infinite",
            }} />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate All — {label}
          </>
        )}
        <style>{`@keyframes sec10-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </div>
  );
}

export default function ProposedInfrastructure({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  const allFields = [
    ...PROP_WATER_FIELD_DEFS,
    ...PROP_SANITATION_FIELD_DEFS,
    ...PROP_DRAINAGE_FIELD_DEFS,
    ...PROP_PAVEMENT_FIELD_DEFS,
    ...PROP_SOLIDWASTE_FIELD_DEFS,
  ];

  return (
    <div className="pdd-content-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>10. Proposed Infrastructure Solutions</h1>
        <SectionGenerateBtn
          fields={allFields}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 10"
        />
      </div>

      <h2 style={{ marginTop: 24 }}>10.1 Proposed Solution for Water Supply System</h2>
      {PROP_WATER_FIELD_DEFS.map((field) => (
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

      <h2 style={{ marginTop: 36 }}>10.2 Proposed Solution for Sanitation</h2>
      {PROP_SANITATION_FIELD_DEFS.map((field) => (
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

      <h2 style={{ marginTop: 36 }}>10.3 Proposed Stormwater Drainage</h2>
      {PROP_DRAINAGE_FIELD_DEFS.map((field) => (
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

      <h2 style={{ marginTop: 36 }}>10.4 Proposed Street Pavement Infrastructure</h2>
      {PROP_PAVEMENT_FIELD_DEFS.map((field) => (
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

      <h2 style={{ marginTop: 36 }}>10.5 Proposed Solid Waste Management Solution</h2>
      {PROP_SOLIDWASTE_FIELD_DEFS.map((field) => (
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