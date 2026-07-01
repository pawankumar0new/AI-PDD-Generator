import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { COST_DETAIL_FIELD_DEFS, FIELD_API_PAYLOAD } from "../data/pddStructure";


// ─────────────────────────────────────────────────────────────────────────────
// Default "Table 2 Total Cost and Infrastructure Cost Disaggregation"
// Mirrors PROJECT_SUMMARY_DEFAULT_HTML pattern in ProjectSummary.jsx
// ─────────────────────────────────────────────────────────────────────────────
const COST_DETAIL_DEFAULT_HTML = `
<p style="text-align:center;font-style:italic;font-size:12px;color:#6b7280;">Table 2 Total Cost and Infrastructure Cost Disaggregation</p>
<table class="project-summary-table cost-detail-table">
  <thead>
    <tr><th colspan="5" style="text-align:center;">COST SUMMARY OF WASH COMPONENTS</th></tr>
    <tr style="background:#D9E1F3;">
      <td style="text-align:center;font-weight:700;">S.No</td>
      <td style="text-align:center;font-weight:700;">Description</td>
      <td style="text-align:center;font-weight:700;">Total Estimated Cost (Rs.)</td>
      <td style="text-align:center;font-weight:700;">Cost Per Household (Rs.)</td>
      <td style="text-align:center;font-weight:700;">Cost Per Person (Rs.)</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:center;">1</td>
      <td colspan="4" style="text-align:center;font-weight:700;">Sewerage System</td>
    </tr>
    <tr>
      <td style="text-align:center;">a)</td>
      <td>Sewerage System (sewer line &amp; manhole)</td>
      <td style="text-align:right;">5,331,341.00</td>
      <td style="text-align:right;">93,533.00</td>
      <td style="text-align:right;">12,428.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">b)</td>
      <td>Construction of a new household Toilet and retrofitting along with T-Hodi</td>
      <td style="text-align:right;">7,285,581.00</td>
      <td style="text-align:right;">127,818.00</td>
      <td style="text-align:right;">16,983.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">c)</td>
      <td>Anaerobic Baffled Reactor (ABR)</td>
      <td style="text-align:right;">2,093,118.00</td>
      <td style="text-align:right;">36,722.00</td>
      <td style="text-align:right;">4,880.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">d)</td>
      <td>Lift Station</td>
      <td style="text-align:right;">1,712,950.00</td>
      <td style="text-align:right;">30,052.00</td>
      <td style="text-align:right;">3,993.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">e)</td>
      <td>Solar for Lift Station</td>
      <td style="text-align:right;">1,164,012.00</td>
      <td style="text-align:right;">20,422.00</td>
      <td style="text-align:right;">2,714.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">f)</td>
      <td>Slow Sand Filter</td>
      <td style="text-align:right;">1,003,293.00</td>
      <td style="text-align:right;">17,602.00</td>
      <td style="text-align:right;">2,339.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td></td>
      <td style="text-align:right;font-style:italic;font-weight:700;">Total Cost of Sewerage System (A)</td>
      <td style="text-align:right;font-weight:700;">18,590,296.00</td>
      <td style="text-align:right;font-weight:700;">326,149.00</td>
      <td style="text-align:right;font-weight:700;">43,337.00</td>
    </tr>

    <tr>
      <td style="text-align:center;">2</td>
      <td colspan="4" style="text-align:center;font-weight:700;">Water System</td>
    </tr>
    <tr>
      <td style="text-align:center;">a)</td>
      <td>Water System (New Handpumps)</td>
      <td style="text-align:right;">2,341,819.00</td>
      <td style="text-align:right;">41,085.00</td>
      <td style="text-align:right;">5,459.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">b)</td>
      <td>Retrofitting of Handpumps</td>
      <td style="text-align:right;">447,135.00</td>
      <td style="text-align:right;">7,845.00</td>
      <td style="text-align:right;">1,043.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td></td>
      <td style="text-align:right;font-style:italic;font-weight:700;">Total Cost of Water (B)</td>
      <td style="text-align:right;font-weight:700;">2,788,954.00</td>
      <td style="text-align:right;font-weight:700;">48,930.00</td>
      <td style="text-align:right;font-weight:700;">6,502.00</td>
    </tr>

    <tr><th colspan="5" style="text-align:center;">Solid Waste Management</th></tr>
    <tr>
      <td style="text-align:center;">a)</td>
      <td>Construction of disposal bins, provision of PPEs/tools, wheel barrows, drum roller, hand tamper staff training and disposal site for improved solid waste management.</td>
      <td style="text-align:right;">550,000.00</td>
      <td style="text-align:right;">9,650.00</td>
      <td style="text-align:right;">1,283.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td></td>
      <td style="text-align:right;font-style:italic;font-weight:700;">Total Cost of Solid Waste Management (C)</td>
      <td style="text-align:right;font-weight:700;">550,000.00</td>
      <td style="text-align:right;font-weight:700;">9,650.00</td>
      <td style="text-align:right;font-weight:700;">1,283.00</td>
    </tr>
    <tr style="background:#c9d9f0;">
      <td></td>
      <td style="text-align:right;font-style:italic;font-weight:700;">Total Cost of WASH Component (D=A+B+C)</td>
      <td style="text-align:right;font-weight:700;">21,929,250.00</td>
      <td style="text-align:right;font-weight:700;">384,729.00</td>
      <td style="text-align:right;font-weight:700;">51,122.00</td>
    </tr>

    <tr><th colspan="5" style="text-align:center;">COST OF STREET PAVEMENT, CULVERTS &amp; MISCELLANEOUS WORKS</th></tr>
    <tr style="background:#D9E1F3;">
      <td style="text-align:center;font-weight:700;">S.No</td>
      <td style="text-align:center;font-weight:700;">Description</td>
      <td style="text-align:center;font-weight:700;">Total Estimated Cost (Rs.)</td>
      <td style="text-align:center;font-weight:700;">Cost Per Household (Rs.)</td>
      <td style="text-align:center;font-weight:700;">Cost Per Person (Rs.)</td>
    </tr>
    <tr>
      <td style="text-align:center;">3</td>
      <td colspan="4" style="text-align:center;font-weight:700;">Street Pavement, Culvert &amp; Miscellaneous works</td>
    </tr>
    <tr>
      <td style="text-align:center;">a)</td>
      <td>Street Pavement</td>
      <td style="text-align:right;">2,677,800.00</td>
      <td style="text-align:right;">46,979.00</td>
      <td style="text-align:right;">110.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">b)</td>
      <td>Pond Filling and Dewatering</td>
      <td style="text-align:right;">1,651,000.00</td>
      <td style="text-align:right;">28,965.00</td>
      <td style="text-align:right;">68.00</td>
    </tr>
    <tr>
      <td style="text-align:center;">c)</td>
      <td>Sign Board</td>
      <td style="text-align:right;">15,000.00</td>
      <td style="text-align:right;">264.00</td>
      <td style="text-align:right;">1.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td></td>
      <td style="text-align:right;font-style:italic;font-weight:700;">Total Cost (E)</td>
      <td style="text-align:right;font-weight:700;">4,343,800.00</td>
      <td style="text-align:right;font-weight:700;">76,208.00</td>
      <td style="text-align:right;font-weight:700;">179.00</td>
    </tr>

    <tr style="background:#4473C5;">
      <td class="cdt-span-cell" colspan="4" style="color:#0C0C0D;font-weight:700;text-align:right !important;">TOTAL COST WASH &amp; STREET PAVEMENT &amp; CULVERTS (F=D+E)</td>
      <td style="color:#0C0C0D;font-weight:700;text-align:right;">26,273,050.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td class="cdt-span-cell" colspan="4" style="font-weight:700;text-align:right !important;">TOTAL COST PER HOUSEHOLD</td>
      <td style="font-weight:700;text-align:right;">460,937.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td class="cdt-span-cell" colspan="4" style="font-weight:700;text-align:right !important;">TOTAL COST PER PERSON</td>
      <td style="font-weight:700;text-align:right;">51,301.00</td>
    </tr>
    <tr style="background:#dce6f4;">
      <td class="cdt-span-cell" colspan="4" style="font-weight:700;text-align:right !important;">Technical Variations &amp; Contingencies @15%</td>
      <td style="font-weight:700;text-align:right;">7,695.00</td>
    </tr>
    <tr style="background:#c9d9f0;">
      <td class="cdt-span-cell" colspan="4" style="font-weight:700;text-align:right !important;">Total Cost after Contingencies</td>
      <td style="font-weight:700;text-align:right;">58,997.00</td>
    </tr>
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

export default function CostDetail({
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
        <h1 style={{ margin: 0 }}>2. Cost Detail</h1>
        <SectionGenerateBtn
          fields={COST_DETAIL_FIELD_DEFS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 2"
        />
      </div>

      {COST_DETAIL_FIELD_DEFS.map((field) => (
        <LLMFieldBlock
          key={field.id}
          fieldId={field.id}
          label={field.label}
          sectionNumber={field.sectionNumber}
          html={fieldContent[field.id] || (field.id === "cost_detail" ? COST_DETAIL_DEFAULT_HTML : "")}
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