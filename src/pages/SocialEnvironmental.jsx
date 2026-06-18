/**
 * SocialEnvironmental.jsx — Section 7: Social & Environmental Integration
 * ─────────────────────────────────────────────────────────────────────────────
 * Now includes "Generate" buttons for each sub‑section (7.1 and 7.2)
 * in addition to the overall "Generate All" button.
 */

import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import {
  SOCIAL_FIELD_DEFS,
  ENV_FIELD_DEFS,
  FIELD_API_PAYLOAD,
} from "../data/pddStructure";
import "./SectionPages.css";

// ── Flatten all fields from both subsections ───────────────────────────────
const ALL_SOCIAL_ENV_FIELDS = [...SOCIAL_FIELD_DEFS, ...ENV_FIELD_DEFS];

// ── "Generate All" button (unchanged) ──────────────────────────────────────
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
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 16px",
          fontSize: 12,
          fontWeight: 600,
          borderRadius: 4,
          border: "none",
          cursor: isAnyLoading ? "not-allowed" : "pointer",
          color: "#fff",
          background: "linear-gradient(to right, #3b82f6, #1e40af)",
          fontFamily: "inherit",
          opacity: isAnyLoading ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!isAnyLoading) e.currentTarget.style.opacity = "0.88";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = isAnyLoading ? "0.7" : "1";
        }}
      >
        {isAnyLoading ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: 11,
                height: 11,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "sec7-spin 0.7s linear infinite",
              }}
            />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate All — Section 7
          </>
        )}
        <style>{`@keyframes sec7-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </div>
  );
}

// ── NEW: Sub‑section Generate button ──────────────────────────────────────
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
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 14px",
          fontSize: 11.5,
          fontWeight: 600,
          borderRadius: 4,
          border: "none",
          cursor: isAnyLoading ? "not-allowed" : "pointer",
          color: "#fff",
          background: "linear-gradient(to right, #3b82f6, #1e40af)",
          fontFamily: "inherit",
          opacity: isAnyLoading ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!isAnyLoading) e.currentTarget.style.opacity = "0.88";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = isAnyLoading ? "0.7" : "1";
        }}
      >
        {isAnyLoading ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: 11,
                height: 11,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "subsec-spin 0.7s linear infinite",
              }}
            />
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
      {/* ── Heading row with Generate All button ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>7. Social &amp; Environmental Integration</h1>
        <SectionGenerateBtn
          fields={ALL_SOCIAL_ENV_FIELDS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 7"
        />
      </div>

      {/* ── 7.1 Social Integration ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 24,
          marginBottom: 16, 
        }}
      >
        <h2 style={{ margin: 0 }}>7.1 Social Integration</h2>
        <SubSectionGenerateBtn
          fields={SOCIAL_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="7.1"
        />
      </div>
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
          hideGenerateBtn
        />
      ))}

      {/* ── 7.2 Environmental Integration ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 36,
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>7.2 Environmental Integration</h2>
        <SubSectionGenerateBtn
          fields={ENV_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="7.2"
        />
      </div>
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
          hideGenerateBtn
        />
      ))}
    </div>
  );
}