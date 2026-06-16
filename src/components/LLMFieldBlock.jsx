
import React, { useState, useRef, useEffect } from "react";
import {
  Pencil, Check, X, Sparkles, RefreshCw, AlertCircle,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, ListTodo,
  Heading1, Heading2, Heading3, Heading4,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link as LinkIcon, Unlink, Image as ImageIcon,
  Subscript as SubIcon, Superscript as SupIcon,
  Code, Code2, Minus, Quote,
  Undo, Redo, Table as TableIcon,
} from "lucide-react";
import BaseItalic from "@tiptap/extension-italic";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
 
// ── Toolbar primitives (re-use existing CSS classes from VillageProfile.css) ─
function Btn({ onClick, active, disabled, title, children }) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={`ife-btn${active ? " ife-btn--active" : ""}`}
    >
      {children}
    </button>
  );
}
function Sep() { return <div className="ife-sep" />; }
function Label({ children }) { return <span className="ife-label">{children}</span>; }
 
// ── Full TipTap inline editor ─────────────────────────────────────────────────
function InlineEditor({ value, onChange, onSave, onCancel }) {
  const imageInputRef = useRef(null);
  const isLocalEdit = useRef(false);
 const ItalicExtension = BaseItalic.extend({
  renderHTML({ HTMLAttributes }) {
    return ["em", { ...HTMLAttributes, style: "font-style: italic" }, 0];
  },
});
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] }, gapcursor: false }),
      Underline,
      ItalicExtension,  
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate({ editor }) {
      isLocalEdit.current = true;
      queueMicrotask(() => onChange(editor.getHTML()));
    },
  });
 
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (isLocalEdit.current) { isLocalEdit.current = false; return; }
    if (value !== editor.getHTML()) {
      setTimeout(() => {
        if (!editor.isDestroyed) editor.commands.setContent(value || "", false);
      }, 0);
    }
  }, [value, editor]);
 
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
      <div className="ife-toolbar">
        <Label>H</Label>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="H1"><Heading1 size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2"><Heading2 size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3"><Heading3 size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="H4"><Heading4 size={13} /></Btn>
        <Sep />
        <Label>Style</Label>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strike"><Strikethrough size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Code"><Code size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Sub"><SubIcon size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Sup"><SupIcon size={12} /></Btn>
        <Sep />
        <Label>Mark</Label>
        <Btn onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} active={editor.isActive("highlight", { color: "#fef08a" })} title="Highlight"><Highlighter size={12} /></Btn>
        {[
          { color: "#3b82f6", title: "Blue" },
          { color: "#ef4444", title: "Red" },
          { color: "#22c55e", title: "Green" },
          { color: "#f97316", title: "Orange" },
        ].map(({ color, title }) => (
          <button key={color} onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setColor(color).run()}
            title={title} type="button"
            className="ife-color-swatch" style={{ backgroundColor: color }} />
        ))}
        <button onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Remove colour" type="button" className="ife-color-remove">✕</button>
        <Sep />
        <Label>Align</Label>
        <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Left"><AlignLeft size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center"><AlignCenter size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Right"><AlignRight size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify size={12} /></Btn>
        <Sep />
        <Label>List</Label>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullets"><List size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered"><ListOrdered size={13} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} title="Tasks"><ListTodo size={13} /></Btn>
        <Sep />
        <Label>Block</Label>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote"><Quote size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block"><Code2 size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider"><Minus size={12} /></Btn>
        <Sep />
        <Label>Insert</Label>
        <Btn onClick={handleSetLink} active={editor.isActive("link")} title="Link"><LinkIcon size={12} /></Btn>
        {editor.isActive("link") && (
          <Btn onClick={() => editor.chain().focus().unsetLink().run()} title="Unlink"><Unlink size={12} /></Btn>
        )}
        <ImageIcon size={12} />
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
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={12} /></Btn>
 
        {/* Save / Cancel — always visible in edit mode */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={onCancel} type="button" className="btn-cancel-edit">
            <X size={12} /> Cancel
          </button>
          <button onClick={onSave} type="button" className="btn-save-edit">
            <Check size={12} /> Save
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="tiptap-simple" style={{ padding: "16px 24px", minHeight: 120 }} />
    </div>
  );
}
 
// ── Skeleton loader shown while API is in flight ──────────────────────────────
function SkeletonLoader() {
  return (
    <div style={{ padding: "16px 0" }}>
      {[100, 85, 92, 70].map((w, i) => (
        <div
          key={i}
          style={{
            height: 13,
            width: `${w}%`,
            borderRadius: 4,
            marginBottom: 10,
            background: "linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%)",
            backgroundSize: "200% 100%",
            animation: "llm-shimmer 1.6s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes llm-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
 
// ── Main exported component ───────────────────────────────────────────────────
export default function LLMFieldBlock({
  fieldId,
  label,
  sectionNumber,   // e.g. "1.1.1" — displayed as h3 prefix
  html,            // current content (from App state)
  loading,         // boolean — API in flight
  error,           // string | null
  onGenerate,      // () => void — triggers API call
  onChange,
  hideGenerateBtn,       // (html: string) => void — syncs edits back to App state
}) {
  const [editing, setEditing] = useState(false);
  // draft tracks in-progress edits; initialised from prop on each edit open
  const [draft, setDraft] = useState(html || "");
 
  // Keep draft in sync if parent pushes new content (e.g. after generate)
  useEffect(() => {
    if (!editing) setDraft(html || "");
  }, [html, editing]);
 
  const handleEditOpen = () => {
    setDraft(html || "");
    setEditing(true);
  };
 
  const handleSave = () => {
    onChange(draft);
    setEditing(false);
  };
 
  const handleCancel = () => {
    setDraft(html || "");
    setEditing(false);
  };
 
  const handleDraftChange = (newHtml) => {
    setDraft(newHtml);
  };
 
  const isEmpty = !html || html.trim() === "";
 
  return (
    <div className="field-block-vp" style={{ marginBottom: 32 }}>
 
      {/* ── Heading row ── */}
      <div className="field-heading-row">
        <h3 style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#1d4ed8",
          margin: 0,
          letterSpacing: "0.025em",
          // paddingLeft: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          {sectionNumber && (
            <span style={{
              fontFamily: "monospace",
              fontSize: 14,
              fontWeight: 700,
              // background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
              color: "#1d4ed8",
              // border: "1px solid rgba(147,197,253,0.6)",
              // borderRadius: 6,
              // padding: "2px 7px",
              flexShrink: 0,
            }}>
              {sectionNumber}
            </span>
          )}
          {label}
        </h3>
 
        {/* Action buttons — right side */}
        <div className="field-heading-actions">
          {loading && !hideGenerateBtn ? (
            /* Generating spinner — only shown when hideGenerateBtn is false */
            <button disabled type="button" className="btn-edit" style={{ opacity: 0.75, cursor: "not-allowed" }}>
              <span style={{
                display: "inline-block", width: 11, height: 11,
                border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
                borderRadius: "50%", animation: "llm-btn-spin 0.7s linear infinite",
              }} />
              Generating…
              <style>{`@keyframes llm-btn-spin { to { transform: rotate(360deg); } }`}</style>
            </button>
          ) : editing ? (
            /* Edit mode: Save + Cancel are inside InlineEditor toolbar — nothing here */
            null
          ) : (
            <div style={{ display: "flex", gap: 6 }}>
              {!hideGenerateBtn && (
                <button
                  onClick={onGenerate}
                  type="button"
                  title={isEmpty ? "Generate with AI" : "Regenerate with AI"}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 12px", fontSize: 12, fontWeight: 600,
                    borderRadius: 4, border: "none", cursor: "pointer",
                    color: "#ffffff",
                    background: isEmpty
                      ? "linear-gradient(to right, #3b82f6, #1e40af)"
                      : "linear-gradient(to right, #7c3aed, #4c1d95)",
                    fontFamily: "inherit",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  {isEmpty ? (
                    <><Sparkles size={11} strokeWidth={1.75} /> Generate</>
                  ) : (
                    <><RefreshCw size={11} strokeWidth={1.75} /> Regenerate</>
                  )}
                </button>
              )}
              {!isEmpty && !loading && (   // ← hide Edit button while loading
                <button onClick={handleEditOpen} type="button" className="btn-edit">
                  <Pencil size={10} /> Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
 
      {/* ── Error banner ── */}
      {error && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", marginBottom: 8,
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: 6, fontSize: 12, color: "#b91c1c",
        }}>
          <AlertCircle size={13} />
          <span><strong>API Error:</strong> {error}</span>
        </div>
      )}
 
      {/* ── Content area ── */}
      {loading ? (
        <SkeletonLoader />
      ) : editing ? (
        <InlineEditor
          value={draft}
          onChange={handleDraftChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : isEmpty ? (
        /* Empty placeholder */
        <div style={{
          padding: "20px 16px",
          background: "#fafaf9",
          border: "1.5px dashed #d6d3d1",
          borderRadius: 8,
          textAlign: "center",
        }}>
          <Sparkles size={20} style={{ color: "#a8a29e", marginBottom: 8 }} />
          <p style={{ fontSize: 13, color: "#a8a29e", fontStyle: "italic", margin: 0 }}>
          {hideGenerateBtn
              ? <>No content yet. Click <strong style={{ color: "#00529d" }}>Write manually</strong> to add content.</>
              : <>No content yet. Click <strong style={{ color: "#3b82f6" }}>Generate</strong> to create with AI, or <strong style={{ color: "#00529d" }}>Edit</strong> to write manually.</>
            }
          </p>
          {/* Manual edit option even when empty */}
          <button
            onClick={handleEditOpen}
            type="button"
            style={{
              marginTop: 10, padding: "4px 12px", fontSize: 11, fontWeight: 600,
              borderRadius: 4, border: "1px solid #d6d3d1", background: "#fff",
              cursor: "pointer", color: "#57534e", fontFamily: "inherit",
            }}
          >
            <Pencil size={10} style={{ marginRight: 4 }} />
            Write manually
          </button>
        </div>
      ) : (
        /* Read-mode */
        <div
          className="field-read-content pdd-content-container"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}