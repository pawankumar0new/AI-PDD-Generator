/**
 * VillageProfileSection.jsx — Section 6: Village Profile
 */

import React, { useCallback } from "react";
import { Sparkles } from "lucide-react";
import LLMFieldBlock from "../components/LLMFieldBlock";
import { VILLAGE_PROFILE_SECTIONS, FIELD_API_PAYLOAD } from "../data/pddStructure";
import "./SectionPages.css";

// ── Default table — values taken directly from PDD PDF ───────────────────────
const VILLAGE_PROFILE_DEFAULT_HTML = `
<p style="text-align:center;font-style:italic;font-size:12px;color:#6b7280;">Table 5 Village Profile</p>
<table style="width:100%;border-collapse:collapse;font-size:13px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
  <thead>
    <tr>
      <th style="background:#4473C5;color:#fff;font-weight:700;padding:14px 20px;text-align:left;font-size:13px;width:280px;min-width:280px;">Attribute</th>
      <th style="background:#4473C5;color:#fff;font-weight:700;padding:14px 20px;text-align:left;font-size:13px;">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">District</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Tando Muhammad Khan</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Taluka / Tehsil</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Tando Muhammad Khan</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Union Council (UC)</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Shaikh Fareed</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Deh</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Fateh Pur</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Geographic Context</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">The settlement pattern is clustered, with households organized in compact, contiguous groups. The village is located approximately 8 km from Tando Muhammad Khan city, which serves as the nearest market and service center.</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Total Population</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">~429 individuals</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Households (HHs)</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">57 households</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Average HH Size</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">~7 persons per household</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Population Structure</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">134 adult males (31%); 161 adult females (38%); 134 children under 18 (31%)</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Languages</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Sindhi</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Caste / Ethnic Composition</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Homogeneous – Khaskheli caste</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Vulnerable Groups</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">6 women-headed HHs; 11 Persons with Disabilities (9 physical, 2 speaking); elderly caregivers identified</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Livelihoods</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Agriculture (wheat, rice, cotton, sugarcane, and vegetables); livestock rearing (buffaloes, goats, sheep, poultry); daily wage labor; small-scale retail</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Income Range</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Households earn between PKR 7,000–70,000 per month; no access to formal credit or microfinance services</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Education</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Primary school exists but in deteriorated condition; 2 male teachers; limited facilities; both boys and girls enrolled though adult literacy remains very low</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Adult Literacy</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Low overall; among women, majority have no formal education (92%); among men, most have primary to matriculation level education</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Health Facilities</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">No functional clinic in village; nearest District Headquarter Hospital (DHQ) Tando Muhammad Khan (~8 km away) provides MCH, ANC, EPI, nutrition, and family planning services; community reports cases of hepatitis linked to unsafe groundwater</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Water Sources</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Reliance on untreated groundwater; 32 hand pumps (some less sweet); no water treatment system</td></tr>
    <tr style="background:#ffffff;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Sanitation</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">15 toilets identified; widespread open defecation; no sewerage or drainage network</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Hygiene Practices</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Inconsistent handwashing with soap; low hygiene awareness; absence of structured hygiene education or IEC programs</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Energy & Communications </td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">No gas connection; reliance on firewood and dung for cooking; ~20% HHs have smartphones; communication through mobile calls and mosque announcements</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Infrastructure & Access </td><td  style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Katcha internal roads; accessible year-round but difficult during heavy rains; ~8 km from Tando Muhammad Khan city </td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Disaster Risks</td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">During 2022 floods, water levels reached 4–5 feet, remaining stagnant for several months; severe waterlogging damaged homes, roads, and WASH facilities; no local safe site; evacuation to main road used as emergency route</td></tr>
    <tr style="background:#f0f4f8;"><td style="padding:14px 20px;font-weight:700;color:#1a3e74;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;width:280px;min-width:280px;vertical-align:top;text-align:left;">Community Institutions </td><td style="padding:14px 20px;border-top:1px solid #e2e8f0;color:#1a1a2e;vertical-align:top;">Strong social cohesion; local leadership under Mr. Wali Muhammad; households already contribute to small-scale repairs</td></tr>
  </tbody>
</table>
`;

// ── Flatten all fields from all subsections ────────────────────────────────
const ALL_PROFILE_FIELDS = VILLAGE_PROFILE_SECTIONS.flatMap((section) => section.fields);

// ── "Generate All" button ──────────────────────────────────────────────────
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
        <h1 style={{ margin: 0 }}>6.&nbsp; VILLAGE PROFILE{village ? `: ${village.toUpperCase()}` : ""}</h1>
        <SectionGenerateBtn
          fields={ALL_PROFILE_FIELDS}
          fieldLoading={fieldLoading}
          onGenerate={onGenerate}
          label="Section 6"
        />
      </div>

      {/* ── Village Profile table only ── */}
      <LLMFieldBlock
        fieldId="admin_location"
        label=""
        sectionNumber=""
        html={fieldContent["admin_location"] || VILLAGE_PROFILE_DEFAULT_HTML}
        loading={fieldLoading["admin_location"] || false}
        error={fieldErrors["admin_location"] || null}
        onGenerate={() => onGenerate("admin_location", FIELD_API_PAYLOAD["admin_location"])}
        onChange={(html) => onChange("admin_location", html)}
        hideGenerateBtn
      />
    </div>
  );
}