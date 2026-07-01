import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { SUB_COMPONENTS_FIELD_DEFS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// ─────────────────────────────────────────────────────────────────────────────
// Default "Table 3 Details of Project Sub-components"
// Mirrors PROJECT_SUMMARY_DEFAULT_HTML / COST_DETAIL_DEFAULT_HTML pattern
// ─────────────────────────────────────────────────────────────────────────────
const SUB_COMPONENTS_DEFAULT_HTML = `
<p style="text-align:center;font-style:italic;font-size:12px;color:#6b7280;">Table 3 Details of Project Sub-components</p>
<table class="sub-components-table">
  <thead>
    <tr>
      <th>Description</th>
      <th colspan="2">Sub-Components</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="14">Water:</td>
      <td>Rehabilitation of Existing Hand pump platforms/steps/ramps</td>
      <td style="text-align:right;">32 Nos.</td>
    </tr>
    <tr><td>Proposed Hand pump (LEAD)</td><td style="text-align:right;">11 Nos.</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP1</td><td style="text-align:right;">170 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP2</td><td style="text-align:right;">236 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP3</td><td style="text-align:right;">305 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP4</td><td style="text-align:right;">295 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP5</td><td style="text-align:right;">610 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP6</td><td style="text-align:right;">689 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP7</td><td style="text-align:right;">102 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP8</td><td style="text-align:right;">256 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP9</td><td style="text-align:right;">312 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP10</td><td style="text-align:right;">380 ft</td></tr>
    <tr><td>1.25&rdquo; HDPE Lead Pipe Length for HP11</td><td style="text-align:right;">535 ft</td></tr>
    <tr><td>4&rdquo; UPVC Drain Pipe</td><td style="text-align:right;">1425 ft</td></tr>

    <tr>
      <td rowspan="9">Sanitation:</td>
      <td>Construction of New Toilets</td>
      <td style="text-align:right;">57 Nos.</td>
    </tr>
    <tr><td>Rehabilitation of Existing Toilets</td><td style="text-align:right;">02 Nos.</td></tr>
    <tr><td style="font-weight:700;">Sewerage System</td><td></td></tr>
    <tr><td style="padding-left:32px;">a. 8&rdquo; Dia Pipe</td><td style="text-align:right;">1934 ft.</td></tr>
    <tr><td style="padding-left:32px;">b. 4&rdquo; Dia Pipe</td><td style="text-align:right;">1841 ft.</td></tr>
    <tr><td style="padding-left:32px;">c. Manholes</td><td style="text-align:right;">27 Nos.</td></tr>
    <tr><td style="font-weight:700;">Anaerobic Baffle Reactor</td><td></td></tr>
    <tr><td style="padding-left:32px;">a. Dimension of Settler</td><td style="text-align:right;">12.2 ft &times; 5.25 ft &times; 5.6 ft</td></tr>
    <tr><td style="padding-left:32px;">b. Dimension of Baffled Reactors</td><td style="text-align:right;">2.8 ft &times; 9.8 ft &times; 5.6 ft</td></tr>

    <tr>
      <td rowspan="5">&nbsp;</td>
      <td>Slow Sand Filter</td>
      <td style="text-align:right;">13.5 ft x 6.9 ft x 7.5 ft</td>
    </tr>
    <tr><td>Total Street Pavement Length</td><td style="text-align:right;">519 ft.</td></tr>
    <tr><td>Street Pavement Width</td><td style="text-align:right;">9.9 ft</td></tr>
    <tr><td>Total Walkway Length</td><td style="text-align:right;">1408 ft</td></tr>
    <tr><td>Walkway Width</td><td style="text-align:right;">5 ft</td></tr>
  </tbody>
</table>
`;

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
              borderRadius: "50%", animation: "sec1-spin 0.7s linear infinite",
            }} />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={11} strokeWidth={1.75} />
            Generate {label}
          </>
        )}
        <style>{`@keyframes sec1-spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </div>
  );
}

export default function SubComponents({
  village,
  fieldContent,
  fieldLoading,
  fieldErrors,
  onGenerate,
  onChange,
}) {
  return (
    <div className="pdd-content-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>3. Sub Components</h1>
        <SectionGenerateBtn
          fields={SUB_COMPONENTS_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 3"
        />
      </div>

      {SUB_COMPONENTS_FIELD_DEFS.map((field) => (
        <LLMFieldBlock
          key={field.id}
          fieldId={field.id}
          label={field.label}
          sectionNumber={field.sectionNumber}
          html={fieldContent[field.id] || (field.id === "sub_components" ? SUB_COMPONENTS_DEFAULT_HTML : "")}
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