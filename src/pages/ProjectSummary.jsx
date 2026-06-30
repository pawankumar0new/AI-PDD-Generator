import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { PROJECT_SUMMARY_FIELD_DEFS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// Add this constant at the top of the file, after imports:

// Add this constant at the top of the file, after imports:

const PROJECT_SUMMARY_DEFAULT_HTML = `
<p style="text-align:center;font-style:italic;font-size:12px;color:#6b7280;">Table 1 Project Summary</p>
<table class="project-summary-table">   <!-- ← added class here -->
  <thead>
    <tr>
      <th colspan="3">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="text-align:center;width:20px;">1</td><td>Village</td><td>Bahadur Khaskheli</td></tr>
    <tr><td style="text-align:center;width:40px;">2</td><td>Deh</td><td>Fateh Pur</td></tr>
    <tr><td style="text-align:center;width:40px;">3</td><td>Union Council</td><td>Shaikh Fareed</td></tr>
    <tr><td style="text-align:center;width:40px;">4</td><td>Taluka</td><td>Tando Muhammad Khan</td></tr>
    <tr><td style="text-align:center;width:40px;">5</td><td>District</td><td>Tando Muhammad Khan</td></tr>
    <tr><td style="text-align:center;width:40px;">6</td><td>No. of Households in the Village</td><td>57</td></tr>
    <tr><td style="text-align:center;width:40px;">8</td><td>SPHF Houses</td><td>25</td></tr>
    <tr><td style="text-align:center;width:40px;">9</td><td>Population</td><td>429</td></tr>
    <tr><td style="text-align:center;width:40px;">10</td><td>Financial Support</td><td>SPHF (GoS)</td></tr>
    <tr><td style="text-align:center;width:40px;">11</td><td>Project Implementation Lead</td><td>EA Consulting Pvt. Ltd</td></tr>
    <tr><td style="text-align:center;width:40px;">12</td><td>SPHF Implementing Partner (IP)</td><td>NRSP</td></tr>
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

export default function ProjectSummary({
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
        <h1 style={{ margin: 0 }}>1. Project Summary</h1>
        <SectionGenerateBtn
          fields={PROJECT_SUMMARY_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 1"
        />
      </div>

      {PROJECT_SUMMARY_FIELD_DEFS.map((field) => (
        <LLMFieldBlock
          key={field.id}
          fieldId={field.id}
          label={field.label}
          sectionNumber={field.sectionNumber}
          html={fieldContent[field.id] || (field.id === "project_summary" ? PROJECT_SUMMARY_DEFAULT_HTML : "")}
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