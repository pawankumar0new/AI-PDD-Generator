import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { OM_COST_FIELD_DEFS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// ─────────────────────────────────────────────────────────────────────────────
// Default "Table 4 Operations and Maintenance Cost (Per life cycle analysis)"
// + the narrative text that follows it in the PDF.
// Mirrors PROJECT_SUMMARY_DEFAULT_HTML / COST_DETAIL_DEFAULT_HTML pattern
// ─────────────────────────────────────────────────────────────────────────────
const OM_COST_DEFAULT_HTML = `
<p style="text-align:center;font-style:italic;font-size:12px;color:#6b7280;">Table 4 Operations and Maintenance Cost (Per life cycle analysis)</p>
<table class="om-cost-table">
  <thead>
    <tr><th colspan="5" style="text-align:center;">Operation &amp; Maintenance Cost</th></tr>
    <tr>
      <th style="text-align:center;">Particular</th>
      <th style="text-align:center;">Life Span</th>
      <th style="text-align:center;">Cost Over the Lifespan (PKR)</th>
      <th style="text-align:center;">Average Annual Cost (PKR) for the Village</th>
      <th style="text-align:center;">Average Monthly Cost (PKR) per Household</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tuff Paver</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">476,769</td>
      <td style="text-align:right;">31,785</td>
      <td style="text-align:right;">37</td>
    </tr>
    <tr>
      <td>Sewerage System</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">1,397,624</td>
      <td style="text-align:right;">93,175</td>
      <td style="text-align:right;">108</td>
    </tr>
    <tr>
      <td>HH Toilet</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">460,086</td>
      <td style="text-align:right;">30,672</td>
      <td style="text-align:right;">36</td>
    </tr>
    <tr>
      <td>New Hand Pumps</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">603,069</td>
      <td style="text-align:right;">40,205</td>
      <td style="text-align:right;">47</td>
    </tr>
    <tr>
      <td>Repairing of Existing HP</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">784,845</td>
      <td style="text-align:right;">52,324</td>
      <td style="text-align:right;">61</td>
    </tr>
    <tr>
      <td>ABR</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">361,151</td>
      <td style="text-align:right;">24,077</td>
      <td style="text-align:right;">28</td>
    </tr>
    <tr>
      <td>Slow Sand Filter</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">55,714</td>
      <td style="text-align:right;">3,714</td>
      <td style="text-align:right;">4</td>
    </tr>
    <tr>
      <td>Lift Station</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">556,175</td>
      <td style="text-align:right;">37,078</td>
      <td style="text-align:right;">43</td>
    </tr>
    <tr>
      <td>Solar for (Lift Station)</td>
      <td style="text-align:center;">15 Years</td>
      <td style="text-align:right;">1,398,765</td>
      <td style="text-align:right;">93,251</td>
      <td style="text-align:right;">108</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td colspan="2" style="font-weight:700;text-align:center;">Total</td>
      <td style="text-align:right;font-weight:700;">6,094,198</td>
      <td style="text-align:right;font-weight:700;">406,281</td>
      <td style="text-align:right;font-weight:700;">470</td>
    </tr>
  </tbody>
</table>
<p>Out of PKR 471 cost per household, approximately 30% is the unskilled labor cost, while the other 70% is the material and skilled labor cost. With this actual monetary contribution per house is PKR 330 per month.</p>
<p><strong>Note:</strong></p>
<p>For consistency, all life cycle cost calculations in this study have been based on a 15-year analysis period. However, it is noted that certain components such as the Anaerobic Baffled Reactor (ABR) and other reinforced concrete (RCC) structures, typically have service lives exceeding 40 years. These assets are therefore expected to remain operational well beyond the 15-year horizon considered in this assessment.</p>
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

export default function OmCost({
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
        <h1 style={{ margin: 0 }}>4. O&M COST (Life Cycle Cost Analysis)</h1>
        <SectionGenerateBtn
          fields={OM_COST_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 4"
        />
      </div>

      {OM_COST_FIELD_DEFS.map((field) => (
        <LLMFieldBlock
          key={field.id}
          fieldId={field.id}
          label={field.label}
          sectionNumber={field.sectionNumber}
          html={fieldContent[field.id] || (field.id === "om_cost" ? OM_COST_DEFAULT_HTML : "")}
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