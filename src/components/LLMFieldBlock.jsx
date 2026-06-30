import React, { useState, useRef, useEffect } from "react";
import {
  Pencil, Check, X, Sparkles, RefreshCw, AlertCircle,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, ListTodo,
  Heading1, Heading2, Heading3, Heading4,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Unlink, Image as ImageIcon,
  Subscript as SubIcon, Superscript as SupIcon,
  Code, Code2, Minus, Quote,
  Undo, Redo, Table as TableIcon,
  ChevronDown,
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

// ── Dropdown styles injected once ──
const DROPDOWN_CSS = `
  .ife-dropdown-panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
    padding: 6px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 1px;
    user-select: none;
    cursor: default;
    min-width: 168px;
    animation: ife-dropdown-in 0.12s ease;
  }
  @keyframes ife-dropdown-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ife-dropdown-group-label {
    font-size: 10px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    padding: 6px 10px 3px;
    pointer-events: none;
  }
  .ife-dropdown-divider {
    height: 1px;
    background: #f1f5f9;
    margin: 4px 2px;
  }
  .ife-dropdown-item {
    display: flex;
    align-items: center;
    gap: 0;
    width: 100%;
    padding: 0;
    background: none;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    text-align: left;
    transition: background 0.1s;
    user-select: none;
    color: #1e293b;
  }
  .ife-dropdown-item:hover:not(:disabled) {
    background: #f1f5f9;
  }
  .ife-dropdown-item:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }
  .ife-dropdown-item.active {
    background: #eff6ff;
    color: #1d4ed8;
  }
  .ife-dropdown-item.active .ife-di-icon {
    color: #1d4ed8;
  }
  .ife-di-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    color: #64748b;
  }
  .ife-dropdown-item.active .ife-di-icon { color: #1d4ed8; }
  .ife-di-label {
    font-size: 12.5px;
    font-weight: 500;
    line-height: 1;
    padding-right: 10px;
  }
  .ife-di-check {
    margin-left: auto;
    margin-right: 8px;
    color: #1d4ed8;
    display: flex;
    align-items: center;
  }
  /* ── Scrollable More dropdown body ── */
  .ife-dropdown-scroll-body {
    max-height: 256px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding-right: 3px;
  }
  .ife-dropdown-scroll-body::-webkit-scrollbar {
    width: 5px;
  }
  .ife-dropdown-scroll-body::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 99px;
    margin: 6px 0;
  }
  .ife-dropdown-scroll-body::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 99px;
  }
  .ife-dropdown-scroll-body::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  .ife-dropdown-scroll-body {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f8fafc;
  }
  .ife-dropdown-fade {
    position: sticky;
    bottom: -6px;
    height: 22px;
    background: linear-gradient(to bottom, rgba(255,255,255,0), #ffffff);
    pointer-events: none;
    margin-top: -22px;
    border-radius: 0 0 10px 10px;
    flex-shrink: 0;
  }
`;

function DropdownStyles() {
  return <style>{DROPDOWN_CSS}</style>;
}

// ── Normalize table structure on save ──────────────────────────────────────
// TipTap's table extension outputs ALL rows (including the header row) inside
// a single <tbody>, with no <thead>. Our read-mode CSS stripes rows using
// `tbody tr:nth-child(odd/even)`, which assumes the header row is OUTSIDE the
// tbody (as it is in the original default tables). When the header row ends
// up as tbody's first <tr> instead, every row's odd/even parity shifts by
// one — flipping the white/gray striping after every edit+save.
//
// This walks the saved HTML and moves any leading header rows (rows made of
// <th> cells) out of <tbody> and into a proper <thead>, so striping stays
// consistent whether the table came from the default HTML or the editor.
function normalizeTableHtml(html) {
  if (!html || typeof document === "undefined") return html;
  try {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    wrapper.querySelectorAll("table").forEach((table) => {
      const tbody = table.querySelector(":scope > tbody");
      if (!tbody) return;

      const rows = Array.from(tbody.querySelectorAll(":scope > tr"));
      if (rows.length === 0) return;

      // Count leading rows that are header rows (made up of <th> cells).
      let splitIndex = 0;
      while (splitIndex < rows.length && rows[splitIndex].querySelector("th")) {
        splitIndex++;
      }
      if (splitIndex === 0) return; // tbody already starts with a data row — nothing to fix

      let thead = table.querySelector(":scope > thead");
      if (!thead) {
        thead = document.createElement("thead");
        table.insertBefore(thead, tbody);
      }
      for (let i = 0; i < splitIndex; i++) {
        thead.appendChild(rows[i]);
      }
    });

    return wrapper.innerHTML;
  } catch {
    return html; // fail safe — never block a save over this
  }
}

// Reusable dropdown menu item
function DropdownItem({ onClick, active, disabled, icon, label }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      className={`ife-dropdown-item${active ? " active" : ""}`}
    >
      <span className="ife-di-icon">{icon}</span>
      <span className="ife-di-label">{label}</span>
      {active && (
        <span className="ife-di-check">
          <Check size={11} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}

// ── Toolbar primitives ──
function Btn({ onClick, active, disabled, title, children }) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={`ife-btn${active ? " ife-btn--active" : ""}`}
      style={{ cursor: disabled ? "not-allowed" : "pointer", userSelect: "none" }}
    >
      {children}
    </button>
  );
}
function Sep() { return <div className="ife-sep" />; }
function Label({ children }) { return <span className="ife-label">{children}</span>; }

// ── Full TipTap inline editor ──
function InlineEditor({ value, onChange, onSave, onCancel }) {
  const imageInputRef = useRef(null);
  const isLocalEdit = useRef(false);
  const savedSelection = useRef(null); // stores editor selection { from, to } before file dialog opens
  const [listDropdownOpen, setListDropdownOpen] = useState(false);
  const [advancedDropdownOpen, setAdvancedDropdownOpen] = useState(false);
  const [tableDropdownOpen, setTableDropdownOpen] = useState(false);
  const listDropdownRef = useRef(null);
  const advancedDropdownRef = useRef(null);
  const tableDropdownRef = useRef(null);

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
      Image.configure({ inline: true, allowBase64: true }),
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

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(e) {
      if (listDropdownRef.current && !listDropdownRef.current.contains(e.target)) {
        setListDropdownOpen(false);
      }
      if (advancedDropdownRef.current && !advancedDropdownRef.current.contains(e.target)) {
        setAdvancedDropdownOpen(false);
      }
      if (tableDropdownRef.current && !tableDropdownRef.current.contains(e.target)) {
        setTableDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const src = evt.target.result;
      // Restore saved cursor position, then insert image
      if (savedSelection.current !== null) {
        const { from, to } = savedSelection.current;
        savedSelection.current = null;
        editor
          .chain()
          .focus()
          .setTextSelection({ from, to })
          .insertContent({
            type: "image",
            attrs: { src },
          })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "image",
            attrs: { src },
          })
          .run();
      }
      // Reset AFTER the read is done so the same file can be re-selected
      e.target.value = "";
    };
    reader.onerror = () => {
      console.error("FileReader failed to read image");
      e.target.value = "";
    };
    reader.readAsDataURL(file);
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
      <DropdownStyles />
      <div className="ife-toolbar" style={{ position: "relative", zIndex: 100, isolation: "isolate" }}>
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
        <Label>Align</Label>
        <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Left"><AlignLeft size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center"><AlignCenter size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Right"><AlignRight size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify size={12} /></Btn>
        <Sep />

        {/* ── List Dropdown ── */}
        <div ref={listDropdownRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setListDropdownOpen((prev) => !prev)}
            className={`ife-btn${listDropdownOpen ? " ife-btn--active" : ""}`}
            title="Lists"
            style={{ cursor: "pointer", userSelect: "none", gap: 2 }}
          >
            <List size={13} />
            <ChevronDown size={9} style={{ marginLeft: 1, opacity: 0.6 }} />
          </button>
          {listDropdownOpen && (
            <div className="ife-dropdown-panel" style={{ minWidth: 148 }}>
              <DropdownItem
                onClick={() => { editor.chain().focus().toggleBulletList().run(); setListDropdownOpen(false); }}
                active={editor.isActive("bulletList")}
                icon={<List size={14} />}
                label="Bullet list"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().toggleOrderedList().run(); setListDropdownOpen(false); }}
                active={editor.isActive("orderedList")}
                icon={<ListOrdered size={14} />}
                label="Numbered list"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().toggleTaskList().run(); setListDropdownOpen(false); }}
                active={editor.isActive("taskList")}
                icon={<ListTodo size={14} />}
                label="Task list"
              />
            </div>
          )}
        </div>

        {/* ── Table Dropdown ── */}
        <Sep />
        <div ref={tableDropdownRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTableDropdownOpen((prev) => !prev)}
            className={`ife-btn${tableDropdownOpen ? " ife-btn--active" : ""}`}
            title="Table"
            style={{ cursor: "pointer", userSelect: "none", gap: 2 }}
          >
            <TableIcon size={13} />
            <ChevronDown size={9} style={{ marginLeft: 1, opacity: 0.6 }} />
          </button>
          {tableDropdownOpen && (
            <div className="ife-dropdown-panel" style={{ minWidth: 148 }}>
              <DropdownItem
                onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); setTableDropdownOpen(false); }}
                icon={<TableIcon size={14} />}
                label="Insert table"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().addColumnAfter().run(); setTableDropdownOpen(false); }}
                disabled={!editor.can().addColumnAfter()}
                icon={<span style={{ fontSize: 11, fontWeight: 700, width: 14, textAlign: "center" }}>C+</span>}
                label="Add column"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().deleteColumn().run(); setTableDropdownOpen(false); }}
                disabled={!editor.can().deleteColumn()}
                icon={<span style={{ fontSize: 11, fontWeight: 700, width: 14, textAlign: "center" }}>C−</span>}
                label="Delete column"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().addRowAfter().run(); setTableDropdownOpen(false); }}
                disabled={!editor.can().addRowAfter()}
                icon={<span style={{ fontSize: 11, fontWeight: 700, width: 14, textAlign: "center" }}>R+</span>}
                label="Add row"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().deleteRow().run(); setTableDropdownOpen(false); }}
                disabled={!editor.can().deleteRow()}
                icon={<span style={{ fontSize: 11, fontWeight: 700, width: 14, textAlign: "center" }}>R−</span>}
                label="Delete row"
              />
              <DropdownItem
                onClick={() => { editor.chain().focus().deleteTable().run(); setTableDropdownOpen(false); }}
                disabled={!editor.can().deleteTable()}
                icon={<span style={{ fontSize: 11, fontWeight: 700, width: 14, textAlign: "center", color: "#ef4444" }}>✕</span>}
                label="Delete table"
              />
            </div>
          )}
        </div>

        {/* ── Advanced Dropdown ── */}
        <Sep />
        <div ref={advancedDropdownRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setAdvancedDropdownOpen((prev) => !prev)}
            className={`ife-btn${advancedDropdownOpen ? " ife-btn--active" : ""}`}
            title="More tools"
            style={{ cursor: "pointer", userSelect: "none", gap: 2 }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "-0.01em" }}>More</span>
            <ChevronDown size={9} style={{ marginLeft: 1, opacity: 0.6 }} />
          </button>

          {advancedDropdownOpen && (
            <div className="ife-dropdown-panel" style={{ padding: "6px 6px 0 6px" }}>
              <div className="ife-dropdown-scroll-body">
                <span className="ife-dropdown-group-label">Block</span>
                <DropdownItem
                  onClick={() => { editor.chain().focus().toggleBlockquote().run(); setAdvancedDropdownOpen(false); }}
                  active={editor.isActive("blockquote")}
                  icon={<Quote size={14} />}
                  label="Blockquote"
                />
                <DropdownItem
                  onClick={() => { editor.chain().focus().toggleCodeBlock().run(); setAdvancedDropdownOpen(false); }}
                  active={editor.isActive("codeBlock")}
                  icon={<Code2 size={14} />}
                  label="Code block"
                />
                <DropdownItem
                  onClick={() => { editor.chain().focus().setHorizontalRule().run(); setAdvancedDropdownOpen(false); }}
                  icon={<Minus size={14} />}
                  label="Divider"
                />

                <div className="ife-dropdown-divider" />

                <span className="ife-dropdown-group-label">Insert</span>
                <DropdownItem
                  onClick={() => { handleSetLink(); setAdvancedDropdownOpen(false); }}
                  active={editor.isActive("link")}
                  icon={<LinkIcon size={14} />}
                  label="Link"
                />
                {editor.isActive("link") && (
                  <DropdownItem
                    onClick={() => { editor.chain().focus().unsetLink().run(); setAdvancedDropdownOpen(false); }}
                    icon={<Unlink size={14} />}
                    label="Remove link"
                  />
                )}
                <DropdownItem
                  onClick={() => {
                    // Save full selection range before the file dialog steals focus
                    if (editor) {
                      const { from, to } = editor.state.selection;
                      savedSelection.current = { from, to };
                    }
                    setAdvancedDropdownOpen(false);
                    // Delay ensures focus returns to editor before dialog opens
                    setTimeout(() => imageInputRef.current?.click(), 150);
                  }}
                  icon={<ImageIcon size={14} />}
                  label="Image"
                />
              </div>{/* end ife-dropdown-scroll-body */}
              <div className="ife-dropdown-fade" />
            </div>
          )}
        </div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={12} /></Btn>
      </div>
      <EditorContent editor={editor} className="pdd-content" style={{ padding: "16px 24px", minHeight: 300 }} />
    </div>
  );
}

// ── Skeleton loader ──
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

// ── Main exported component ──
export default function LLMFieldBlock({
  fieldId,
  label,
  sectionNumber,
  html,
  loading,
  error,
  onGenerate,
  onChange,
  hideGenerateBtn,
  headingLevel = "h3",
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(html || "");

  useEffect(() => {
    if (!editing) setDraft(html || "");
  }, [html, editing]);

  const handleEditOpen = () => {
    setDraft(html || "");
    setEditing(true);
  };

  const handleSave = () => {
    onChange(normalizeTableHtml(draft));
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
  const HeadingTag = headingLevel;

  return (
    <div className="field-block-vp" style={{ marginBottom: 32 }}>

      {/* ── Heading row ── */}
      <div className="field-heading-row">
        <HeadingTag
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            ...(headingLevel === "h3" && {
              fontSize: 14,
              fontWeight: 700,
              color: "#1d4ed8",
              margin: 0,
              letterSpacing: "0.025em",
            }),
          }}
        >
          {sectionNumber && (
            <span
              style={{
                flexShrink: 0,
                ...(headingLevel === "h3" && {
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1d4ed8",
                }),
              }}
            >
              {sectionNumber}
            </span>
          )}
          {label}
        </HeadingTag>

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
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={handleCancel} type="button" className="btn-cancel-edit">
                <X size={12} /> Cancel
              </button>
              <button onClick={handleSave} type="button" className="btn-save-edit">
                <Check size={12} /> Save
              </button>
            </div>
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
              {/* Edit button – always shown when not loading */}
              {!loading && (
                <button onClick={handleEditOpen} type="button" className="btn-edit">
                  <Pencil size={10} /> {isEmpty ? "Edit" : "Edit"}
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
        /* Empty placeholder – no inline "Write manually" button */
        <div style={{
          padding: "20px 16px",
          background: "#fafaf9",
          border: "1.5px dashed #d6d3d1",
          minHeight: "150px",
          borderRadius: 8,
          textAlign: "center",
        }}>
          <p style={{ fontSize: 13, color: "#a8a29e", fontStyle: "italic", margin: 0 }}>
            No content yet.
          </p>
        </div>
      ) : (
        /* Read-mode */
        <div
          className="pdd-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}