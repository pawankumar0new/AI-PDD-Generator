import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import "./SectionPages.css";

// ── Inline field editor (TipTap-backed) ─────────────────────────────────────
function InlineEditor({ value, onChange, onSave, onCancel }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const Btn = ({ onClick, active, disabled, title, children }) => (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={`ife-btn${active ? " ife-btn--active" : ""}`}>
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
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4"><span style={{fontSize:10,fontWeight:700}}>H4</span></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list"><span style={{fontSize:11}}>•</span></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list"><span style={{fontSize:10}}>1.</span></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><span style={{fontSize:11}}>↩</span></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><span style={{fontSize:11}}>↪</span></Btn>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={onCancel} type="button" className="btn-cancel-edit"><X size={12} /> Cancel</button>
          <button onClick={onSave} type="button" className="btn-save-edit"><Check size={12} /> Save</button>
        </div>
      </div>
      <EditorContent editor={editor} style={{ padding: "16px 24px", minHeight: 120 }} />
    </div>
  );
}

// ── Single editable field block ──────────────────────────────────────────────
function FieldBlock({ title, html }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(html);
  const [saved, setSaved] = useState(html);

  const handleSave = () => { setSaved(draft); setEditing(false); };
  const handleCancel = () => { setDraft(saved); setEditing(false); };

  return (
    <div className="field-block-vp">
      <div className="field-heading-row">
        <h3>{title}</h3>
        <div className="field-heading-actions">
          {!editing ? (
            <button onClick={() => setEditing(true)} type="button" className="btn-edit">
              <Pencil size={10} /> Edit
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={handleCancel} type="button" className="btn-cancel-edit">Cancel</button>
              <button onClick={handleSave} type="button" className="btn-save-edit">
                <Check size={11} /> Save
              </button>
            </div>
          )}
        </div>
      </div>
      {editing ? (
        <InlineEditor
          value={draft}
          onChange={setDraft}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div
          className={`field-read-content${!saved ? " field-read-content--empty" : ""}`}
          dangerouslySetInnerHTML={{ __html: saved || "<span class='field-read-empty-hint'>No content yet. Click Edit to add.</span>" }}
        />
      )}
    </div>
  );
}

// ── Section 5: Village Background and Location ───────────────────────────────
export default function VillageBackground({ village }) {
  const fields = [
    {
      title: "Settlement Overview",
      html: `<p>Bahadur Khaskheli is a village with compact and clustered settlement, where households are organized into grouped housing arrangements. Located in Deh Fateh Pur, Union Council Shaikh Fareed, Taluka Tando Muhammad Khan, and District Tando Muhammad Khan, it is one of the villages selected under the Climate Resilient WASH Infrastructure Program for the design of climate-resilient WASH solutions.</p>
<p>The settlement spans 5.5 acres and is home to a population of approximately 429 people across 57 households, of which 25 were identified as beneficiaries under the Sindh Peoples Housing for Flood Affectees (SPHF) program. Agriculture forms the backbone of local livelihoods, with families cultivating wheat, cotton, rice, sugarcane, vegetables, and fruits, while the village is surrounded by agricultural lands.</p>`,
    },
    {
      title: "Geographic Location",
      html: `<p>The groundwater table in the village lies at a depth of approximately 10–15 feet. The village is geographically located at <strong>25.0738008° latitude</strong> and <strong>68.5776989° longitude</strong>. It lies approximately 8 km from Tando Muhammad Khan city, which serves as the nearest market and service center for the community.</p>
<p>The surrounding landscape is predominantly agricultural. A nearby watercourse named <strong>Imam Wah</strong> runs on the eastern side of the village, while agricultural fields surround the village from all four sides. The village does not have adequate road connectivity from the main road, which impedes community access to mainstream development services at the provincial level.</p>`,
    },
    {
      title: "Livelihoods & Economic Base",
      html: `<p>Agriculture forms the primary livelihood for most households. Key crops include wheat, cotton, rice, sugarcane, vegetables, and fruits. Livestock rearing (buffaloes, goats, sheep, and poultry) supplements household income. Daily wage labor and small-scale retail activities are also prevalent among residents.</p>
<p>Household incomes range between <strong>PKR 7,000–70,000 per month</strong>. There is no access to formal credit or microfinance services within the village. Women contribute significantly to household economies through livestock care, tailoring, and home-based activities, though much of this work remains unpaid or unrecorded.</p>`,
    },
  ];

  return (
    <div className="pdd-content-container">
      <h1>5. Village Background and Location</h1>
      {/* <h2>Village: {village}</h2> */}

      {fields.map((f) => (
        <FieldBlock key={f.title} title={f.title} html={f.html} />
      ))}
    </div>
  );
}