import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, ListTodo,
  Heading1, Heading2, Heading3, Heading4,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link as LinkIcon, Image as ImageIcon,
  Subscript as SubIcon, Superscript as SupIcon,
  Code, Code2, Minus, Quote,
  Undo, Redo, Sparkles, Unlink,
} from "lucide-react";
/* Reuse the VillageProfile CSS for toolbar primitives (ife-btn, ife-sep etc.)
   or import a shared toolbar CSS. Here we inline minimal styles via style prop
   to keep TipTapEditor self-contained. */

function Btn({ onClick, active, disabled, title, children }) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      style={{
        width: 28, height: 28,
        borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: active ? "none" : "1px solid transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        background: active ? "#00529d" : "transparent",
        color: active ? "#fff" : "#495057",
        flexShrink: 0,
        transition: "all 0.12s",
        opacity: disabled ? 0.3 : 1,
      }}
      onMouseEnter={e => { if (!disabled && !active) { e.currentTarget.style.background = "#e8f0fb"; e.currentTarget.style.color = "#1a3e74"; } }}
      onMouseLeave={e => { if (!disabled && !active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#495057"; } }}>
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, height: 16, background: "#dee2e6", margin: "0 2px", flexShrink: 0 }} />;
}

function Label({ children }) {
  return (
    <span style={{ fontSize: 9, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 2px", flexShrink: 0 }}>
      {children}
    </span>
  );
}

export default function TipTapEditor({ content, onChange, onGenerateAll, isGenerating }) {
  const imageInputRef = useRef(null);
  const isLocalEdit = useRef(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Placeholder.configure({
        placeholder: 'Click "Generate All Fields" to populate this document, or start typing…',
      }),
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      TextStyle,
      Color,
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: content || "",
    onUpdate({ editor }) {
      isLocalEdit.current = true;
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (isLocalEdit.current) { isLocalEdit.current = false; return; }
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content || "", false);
    }
  }, [content]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = () => { editor.chain().focus().setImage({ src: reader.result }).run(); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSetLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL:", prev);
    if (url === null) return;
    if (url === "") { editor.chain().focus().unsetLink().run(); }
    else { editor.chain().focus().setLink({ href: url }).run(); }
  };

  if (!editor) return null;

  return (
    <div style={{ fontFamily: "inherit", border: "1px solid #dee2e6", borderRadius: 4, overflow: "hidden" }}>

      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", flexWrap: "wrap",
        gap: 2, padding: "8px 12px",
        borderBottom: "1px solid #dee2e6", background: "#f8f9fa",
      }}>
        <Label>H</Label>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1"><Heading1 size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4"><Heading4 size={12} /></Btn>

        <Sep />
        <Label>Style</Label>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code"><Code size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript"><SubIcon size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript"><SupIcon size={11} /></Btn>

        <Sep />
        <Label>Mark</Label>
        <Btn onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} active={editor.isActive("highlight", { color: "#fef08a" })} title="Highlight"><Highlighter size={11} /></Btn>
        {[
          { color: "#1a3e74", title: "Navy" },
          { color: "#ef4444", title: "Red" },
          { color: "#22c55e", title: "Green" },
          { color: "#f97316", title: "Orange" },
        ].map(({ color, title }) => (
          <button key={color} onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().setColor(color).run()}
            title={title} type="button"
            style={{ width: 18, height: 18, borderRadius: 3, border: "2px solid #fff", boxShadow: "0 0 0 1px #ccc", background: color, cursor: "pointer", flexShrink: 0 }} />
        ))}
        <button onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().unsetColor().run()} title="Remove colour" type="button"
          style={{ width: 18, height: 18, borderRadius: 3, border: "1px solid #ccc", background: "#fff", cursor: "pointer", flexShrink: 0, fontSize: 9, fontWeight: 700, color: "#888", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        <Sep />
        <Label>Align</Label>
        <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Left"><AlignLeft size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center"><AlignCenter size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Right"><AlignRight size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify size={11} /></Btn>

        <Sep />
        <Label>List</Label>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet"><List size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered"><ListOrdered size={12} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} title="Tasks"><ListTodo size={12} /></Btn>

        <Sep />
        <Label>Block</Label>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote"><Quote size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block"><Code2 size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider"><Minus size={11} /></Btn>

        <Sep />
        <Label>Insert</Label>
        <Btn onClick={handleSetLink} active={editor.isActive("link")} title="Link"><LinkIcon size={11} /></Btn>
        {editor.isActive("link") && (
          <Btn onClick={() => editor.chain().focus().unsetLink().run()} title="Remove link"><Unlink size={11} /></Btn>
        )}
        <Btn onClick={() => imageInputRef.current?.click()} title="Image"><ImageIcon size={11} /></Btn>
        <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

        <Sep />
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={11} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={11} /></Btn>

        {/* Generate All button — far right */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={onGenerateAll}
          disabled={isGenerating}
          type="button"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 14px", fontSize: 12, fontWeight: 600,
            borderRadius: 4, border: "none", cursor: isGenerating ? "not-allowed" : "pointer",
            color: "#fff",
            background: "linear-gradient(to right, #3b82f6, #1e40af)",
            fontFamily: "inherit",
            opacity: isGenerating ? 0.7 : 1,
            marginLeft: "auto",
          }}>
          {isGenerating ? (
            <>
              <span style={{
                display: "inline-block", width: 12, height: 12,
                border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
                borderRadius: "50%", animation: "tiptap-spin 0.7s linear infinite",
              }} />
              Generating…
            </>
          ) : (
            <>
              <Sparkles size={12} strokeWidth={1.75} />
              Generate All Fields
            </>
          )}
        </button>
      </div>

      <style>{`@keyframes tiptap-spin { to { transform: rotate(360deg); } }`}</style>
      <EditorContent editor={editor} className="tiptap-simple" style={{ padding: 24, minHeight: 200 }} />
    </div>
  );
}