import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import "./SectionPages.css";

// ── Inline editor ────────────────────────────────────────────────────────────
function InlineEditor({ value, onChange, onSave, onCancel }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "",
    onUpdate({ editor }) { onChange(editor.getHTML()); },
  });

  if (!editor) return null;

  const Btn = ({ onClick, active, disabled, title, children }) => (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick} disabled={disabled}
      title={title} type="button" className={`ife-btn${active ? " ife-btn--active" : ""}`}>
      {children}
    </button>
  );

  return (
    <div className="inline-field-editor">
      <div className="ife-toolbar">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><b style={{fontSize:11}}>B</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><i style={{fontSize:11}}>I</i></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><u style={{fontSize:11}}>U</u></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet"><span style={{fontSize:11}}>•</span></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered"><span style={{fontSize:10}}>1.</span></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><span style={{fontSize:11}}>↩</span></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><span style={{fontSize:11}}>↪</span></Btn>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={onCancel} type="button" className="btn-cancel-edit"><X size={12} /> Cancel</button>
          <button onClick={onSave} type="button" className="btn-save-edit"><Check size={12} /> Save</button>
        </div>
      </div>
      <EditorContent editor={editor} style={{ padding: "16px 24px", minHeight: 80 }} />
    </div>
  );
}

// ── Editable table row ────────────────────────────────────────────────────────
function TableRow({ attribute, details, rowIndex }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(details);
  const [draft, setDraft] = useState(details);

  const handleSave = () => { setSaved(draft); setEditing(false); };
  const handleCancel = () => { setDraft(saved); setEditing(false); };

  return (
    <tr className={rowIndex % 2 === 0 ? "vps-tr-odd" : "vps-tr-even"}>
      <td className="vps-td-attr">
        {attribute}
      </td>
      <td className="vps-td-details">
        {editing ? (
          <InlineEditor value={draft} onChange={setDraft} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <div className="vps-details-read">
            <div
              className="pdd-content-container vps-details-text"
              dangerouslySetInnerHTML={{ __html: saved }}
            />
            <button onClick={() => setEditing(true)} type="button" className="btn-edit vps-edit-btn">
              <Pencil size={10} /> Edit
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

// ── Section 6: Village Profile ───────────────────────────────────────────────
const PROFILE_ROWS = [
  { attribute: "District",            details: "Tando Muhammad Khan" },
  { attribute: "Taluka / Tehsil",     details: "Tando Muhammad Khan" },
  { attribute: "Union Council (UC)",  details: "Shaikh Fareed" },
  { attribute: "Deh",                 details: "Fatehpur" },
  { attribute: "Geographic Context",  details: "The settlement pattern is clustered, with households organized in compact, contiguous groups. The village is located approximately 8 km from Tando Muhammad Khan city, which serves as the nearest market and service center." },
  { attribute: "Total Population",    details: "~429 individuals" },
  { attribute: "Households (HHs)",    details: "57 households" },
  { attribute: "Average HH Size",     details: "~7 persons per household" },
  { attribute: "Population Structure",details: "134 adult males (31%); 161 adult females (38%); 134 children under 18 (31%)" },
  { attribute: "Languages",           details: "Sindhi" },
  { attribute: "Caste / Ethnic Composition", details: "Homogeneous – Khaskheli caste" },
  { attribute: "Vulnerable Groups",   details: "6 women-headed HHs; 11 Persons with Disabilities (9 physical, 2 speaking); elderly caregivers identified" },
  { attribute: "Livelihoods",         details: "Agriculture (wheat, rice, cotton, sugarcane, and vegetables); livestock rearing (buffaloes, goats, sheep, poultry); daily wage labor; small-scale retail" },
  { attribute: "Income Range",        details: "Households earn between PKR 7,000–70,000 per month; no access to formal credit or microfinance services" },
  { attribute: "Education",           details: "Primary school exists but in deteriorated condition; 2 male teachers; limited facilities; both boys and girls enrolled though adult literacy remains very low" },
  { attribute: "Adult Literacy",      details: "Low overall; among women, majority have no formal education (92%); among men, most have primary to matriculation level education" },
  { attribute: "Health Facilities",   details: "No functional clinic in village; nearest District Headquarter Hospital (DHQ) Tando Muhammad Khan (~8 km away) provides MCH, ANC, EPI, nutrition, and family planning services; community reports cases of hepatitis linked to unsafe groundwater" },
  { attribute: "Water Sources",       details: "Reliance on untreated groundwater; 32 hand pumps (some less sweet); no water treatment system" },
  { attribute: "Sanitation",          details: "15 toilets identified; widespread open defecation; no sewerage or drainage network" },
  { attribute: "Hygiene Practices",   details: "Inconsistent handwashing with soap; low hygiene awareness; absence of structured hygiene education or IEC programs" },
  { attribute: "Energy & Communications", details: "No gas connection; reliance on firewood and dung for cooking; ~20% HHs have smartphones; communication through mobile calls and mosque announcements" },
  { attribute: "Infrastructure & Access", details: "Katcha internal roads; accessible year-round but difficult during heavy rains; ~8 km from Tando Muhammad Khan city" },
  { attribute: "Disaster Risks",      details: "During 2022 floods, water levels reached 4–5 feet, remaining stagnant for several months; severe waterlogging damaged homes, roads, and WASH facilities; no local safe site; evacuation to main road used as emergency route" },
  { attribute: "Community Institutions", details: "Strong social cohesion; local leadership under Mr. Wali Muhammad; households already contribute to small-scale repairs" },
];

export default function VillageProfileSection({ village }) {
  return (
    <div className="pdd-content-container">
      <h1>6. Village Profile: Achar Khaskheli</h1>
      <h2>UC Bello, District Sujawal &nbsp;·&nbsp; {village}</h2>

      <p>The table below provides a comprehensive profile of the village. Click <strong>Edit</strong> on any row to update the content inline.</p>

      <div className="vps-table-wrap">
        <table className="vps-table">
          <thead>
            <tr>
              <th className="vps-th vps-th-attr">Attribute</th>
              <th className="vps-th">Details</th>
            </tr>
          </thead>
          <tbody>
            {PROFILE_ROWS.map((row, i) => (
              <TableRow key={row.attribute} attribute={row.attribute} details={row.details} rowIndex={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}