import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  FileText, TrendingUp, Pencil, Check,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, ListTodo,
  Heading1, Heading2, Heading3, Heading4,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link as LinkIcon, Unlink, Image as ImageIcon,
  Subscript as SubIcon, Superscript as SupIcon,
  Code, Code2, Minus, Quote,
  Undo, Redo, Table as TableIcon,
} from "lucide-react";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import UnderlineExt from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import { VILLAGE_PROFILE_SECTIONS, FIELD_PROMPTS, VILLAGE_DUMMY_DATA } from "../data/pddStructure";
import { generateText } from "../utils/api";
import "./VillageProfile.css";
import "../App.css";

// ── Toolbar button ────────────────────────────────────────────────────────────
function Btn({ onClick, active, disabled, title, children }) {
  return (
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
}

function Sep() {
  return <div className="ife-sep" />;
}

function Label({ children }) {
  return <span className="ife-label">{children}</span>;
}

// ── Inline TipTap editor ──────────────────────────────────────────────────────
function InlineFieldEditor({ htmlValue, onChange }) {
  const imageInputRef = useRef(null);
  const isLocalEdit = useRef(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] }, gapcursor: false }),
      Placeholder.configure({ placeholder: "Type content here, or use Generate above…" }),
      Highlight.configure({ multicolor: true }),
      UnderlineExt,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      TextStyle,
      Color,
      Subscript,
      Superscript,
      TaskList,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      TaskItem.configure({ nested: true }),
    ],
    content: htmlValue || "",
    onUpdate({ editor }) {
      isLocalEdit.current = true;

      const html = editor.getHTML();

      queueMicrotask(() => {
        onChange(html);
      });
    },
  });


  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (isLocalEdit.current) { isLocalEdit.current = false; return; }
    if (htmlValue !== editor.getHTML()) {
      setTimeout(() => {
        if (!editor.isDestroyed) editor.commands.setContent(htmlValue || "", false);
      }, 0);
    }
  }, [htmlValue, editor]);

  useEffect(() => {
    return () => { if (editor && !editor.isDestroyed) editor.destroy(); };
  }, [editor]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = () => editor.chain().focus().setImage({ src: reader.result }).run();
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSetLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL:", prev);
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="inline-field-editor">
      {/* Toolbar */}
      <div className="ife-toolbar">
        <Label>H</Label>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })} title="Heading 1"><Heading1 size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          active={editor.isActive("heading", { level: 4 })} title="Heading 4"><Heading4 size={13} /></Btn>

        <Sep />
        <Label>Style</Label>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code"><Code size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript"><SubIcon size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript"><SupIcon size={12} /></Btn>

        <Sep />
        <Label>Mark</Label>
        <Btn onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}
          active={editor.isActive("highlight", { color: "#fef08a" })} title="Yellow highlight">
          <Highlighter size={12} />
        </Btn>
        {[
          { color: "#3b82f6", title: "Blue" },
          { color: "#ef4444", title: "Red" },
          { color: "#22c55e", title: "Green" },
          { color: "#f97316", title: "Orange" },
        ].map(({ color, title }) => (
          <button
            key={color}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setColor(color).run()}
            title={`${title} text`}
            type="button"
            className="ife-color-swatch"
            style={{ backgroundColor: color }}
          />
        ))}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Remove colour"
          type="button"
          className="ife-color-remove">
          ✕
        </button>

        <Sep />
        <Label>Align</Label>
        <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Left"><AlignLeft size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center"><AlignCenter size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Right"><AlignRight size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify size={12} /></Btn>

        <Sep />
        <Label>List</Label>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list"><List size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list"><ListOrdered size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} title="Task list"><ListTodo size={13} /></Btn>

        <Sep />
        <Label>Block</Label>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote"><Quote size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block"><Code2 size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule"><Minus size={12} /></Btn>

        <Sep />
        <Label>Insert</Label>
        <Btn onClick={handleSetLink} active={editor.isActive("link")} title="Add / edit link"><LinkIcon size={12} /></Btn>
        {editor.isActive("link") && (
          <Btn onClick={() => editor.chain().focus().unsetLink().run()} title="Remove link"><Unlink size={12} /></Btn>
        )}
        <Btn onClick={() => imageInputRef.current?.click()} title="Upload image"><ImageIcon size={12} /></Btn>
        <input ref={imageInputRef} type="file" accept="image/*" className="ife-file-input" onChange={handleImageUpload} />

        <Sep />
        <Label>Table</Label>
        <Btn
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert table">
          <TableIcon size={12} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
          title="Add column">
          <span style={{ fontSize: 10, fontWeight: 700 }}>C+</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
          title="Delete column">
          <span style={{ fontSize: 10, fontWeight: 700 }}>C−</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
          title="Add row">
          <span style={{ fontSize: 10, fontWeight: 700 }}>R+</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
          title="Delete row">
          <span style={{ fontSize: 10, fontWeight: 700 }}>R−</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          title="Delete table">
          <span style={{ fontSize: 10, fontWeight: 700 }}>Del</span>
        </Btn>

        <Sep />
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={12} /></Btn>
      </div>

      <EditorContent editor={editor} className="tiptap-simple" />
    </div>
  );
}

// ── Single field block ────────────────────────────────────────────────────────
function FieldBlock({ field, value, onSave, onGenerate, isGenerating }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftHtml, setDraftHtml] = useState("");

  const toHtml = (text) => {
    if (!text) return "";
    if (text.trim().startsWith("<")) return text;
    return text.split(/\n\n+/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  };

  const toReadParagraphs = (text) => {
    if (!text) return [];
    if (text.trim().startsWith("<")) {
      const nodes = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      doc.body.childNodes.forEach((node) => {
        const tag = node.nodeName;
        if (tag === "H4") {
          const t = node.textContent?.trim();
          if (t) nodes.push({ type: "h4", text: t });
        } else if (tag === "P") {
          const raw = node.textContent || "";
          raw.split(/\n\n+/).map((s) => s.replace(/\n/g, " ").trim()).filter(Boolean)
            .forEach((t) => nodes.push({ type: "p", text: t }));
        } // inside the doc.body.childNodes.forEach loop, after the H4 and P cases:
        else if (tag === "IMG") {
          nodes.push({ type: "img", src: node.src, alt: node.alt || "", style: node.getAttribute("style") || "" });
        } else if (tag === "TABLE") {
          nodes.push({ type: "table", html: node.outerHTML });
        } else {
          const t = node.textContent?.trim();
          if (t) nodes.push({ type: "p", text: t });
        }
      });
      return nodes;
    }
    return text.split(/\n\n+/).map((p) => ({ type: "p", text: p.trim() })).filter((n) => n.text);
  };

  const handleEdit = () => { setDraftHtml(toHtml(value)); setIsEditing(true); };
  const handleSave = () => { onSave(field.id, draftHtml); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); };

  useEffect(() => {
    if (!isEditing) setDraftHtml(toHtml(value));
  }, [value, isEditing]);

  const paragraphs = toReadParagraphs(value);

  return (
    <div className="field-block-vp">
      {/* Field heading row */}
      <div className="field-heading-row">
        <h3>{field.label}</h3>

        <div className="field-heading-actions">
          {!isEditing ? (
            <button onClick={handleEdit} type="button" className="btn-edit">
              <Pencil size={10} />
              Edit
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={handleCancel} type="button" className="btn-cancel-edit">Cancel</button>
              <button onClick={handleSave} type="button" className="btn-save-edit">
                <Check size={11} />
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content area */}
      {!isEditing ? (
        <div className={`field-read-content${!value ? " field-read-content--empty" : ""}`}>
          {paragraphs.length > 0 ? (
            paragraphs.map((node, i) =>
              node.type === "img" ? (
                <img key={i} src={node.src} alt={node.alt}
                 style={{ maxWidth: "420px", width: "100%", borderRadius: 8, margin: "12px auto", display: "block" }} />
              ) : node.type === "table" ? (
                <div key={i} dangerouslySetInnerHTML={{ __html: node.html }}
                  style={{ overflowX: "auto", margin: "10px 0" }} />
              ) : node.type === "h4" ? (
                <h4 key={i} className="field-read-h4">{node.text}</h4>
              ) : (
                <p key={i}>{node.text}</p>
              )
            )
          ) : (
            <p className="field-read-empty-hint">
              No content yet. Click <strong>Generate</strong> to fill with AI, or <strong>Edit</strong> to write manually.
            </p>
          )}
        </div>
      ) : (
        <InlineFieldEditor htmlValue={draftHtml} onChange={setDraftHtml} />
      )}
    </div>
  );
}

// ── Section view ──────────────────────────────────────────────────────────────
function SectionView({ section, fieldValues, generatingFields, onSave, onGenerate, onGenerateSection }) {
  return (
    <div>
      <h2>{section.title}</h2>

      {section.fields.map((field) => (
        <FieldBlock
          key={field.id}
          field={field}
          value={fieldValues[field.id] || ""}
          onSave={onSave}
          onGenerate={onGenerate}
          isGenerating={!!generatingFields[field.id]}
        />
      ))}
    </div>
  );
}

// ── Main VillageProfile ───────────────────────────────────────────────────────
export default function VillageProfile({ village, selectedFields }) {
  const initialData = VILLAGE_DUMMY_DATA[village] || {};
  const [fieldValues, setFieldValues] = useState(initialData);
  const [generatingFields, setGeneratingFields] = useState({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    setFieldValues(VILLAGE_DUMMY_DATA[village] || {});
    setGeneratingFields({});
    setProgress({ done: 0, total: 0 });
  }, [village]);

  const handleSave = useCallback((fieldId, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const handleGenerate = useCallback(async (fieldId) => {
    const prompt = FIELD_PROMPTS[fieldId];
    if (!prompt) return;
    setGeneratingFields((prev) => ({ ...prev, [fieldId]: true }));
    try {
      const text = await generateText(prompt(village));
      setFieldValues((prev) => ({ ...prev, [fieldId]: text }));
    } catch (err) {
      console.error("Generation error:", err);
    }
    setGeneratingFields((prev) => ({ ...prev, [fieldId]: false }));
  }, [village]);

  const handleGenerateSection = useCallback(async (sectionId) => {
    const section = VILLAGE_PROFILE_SECTIONS.find((s) => s.id === sectionId);
    if (!section) return;
    const fields = selectedFields
      ? section.fields.filter((f) => selectedFields.includes(f.id))
      : section.fields;
    for (const field of fields) await handleGenerate(field.id);
  }, [handleGenerate, selectedFields]);

  const handleGenerateAll = useCallback(async () => {
    const allFields = VILLAGE_PROFILE_SECTIONS
      .flatMap((s) => s.fields)
      .filter((f) => !selectedFields || selectedFields.includes(f.id));
    setIsGeneratingAll(true);
    setProgress({ done: 0, total: allFields.length });
    let done = 0;
    for (const field of allFields) {
      await handleGenerate(field.id);
      done++;
      setProgress({ done, total: allFields.length });
    }
    setIsGeneratingAll(false);
  }, [handleGenerate, selectedFields]);

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  const visibleSections = VILLAGE_PROFILE_SECTIONS
    .map((s) => ({
      ...s,
      fields: selectedFields ? s.fields.filter((f) => selectedFields.includes(f.id)) : s.fields,
    }))
    .filter((s) => s.fields.length > 0);

  return (
    <div className="pdd-content-container">

      <h1>1. Village Profile</h1>

      {visibleSections.map((section) => (
        <SectionView
          key={section.id}
          section={section}
          fieldValues={fieldValues}
          generatingFields={generatingFields}
          onSave={handleSave}
          onGenerate={handleGenerate}
          onGenerateSection={handleGenerateSection}
        />
      ))}
    </div>
  );
}