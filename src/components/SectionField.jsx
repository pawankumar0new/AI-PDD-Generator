import React from "react";
import { Sparkles, Trash2 } from "lucide-react";
import "./SectionField.css";

export default function SectionField({
  label,
  fieldId,
  value,
  loading,
  onChange,
  onGenerate,
  onClear,
}) {
  return (
    <div className="field-block">
      {/* Label row */}
      <div className="field-header">
        <div className="field-label-group">
          <div className="field-accent-bar" />
          <label className="field-label">{label}</label>
        </div>

        {(onGenerate || onClear) && (
          <div className="field-actions">
            {onClear && (
              <button
                onClick={() => onClear(fieldId)}
                disabled={loading || !value}
                type="button"
                title="Clear content"
                className="btn-clear">
                <Trash2 size={11} />
                Clear
              </button>
            )}
            {onGenerate && (
              <button
                onClick={() => onGenerate(fieldId)}
                disabled={loading}
                type="button"
                title="Generate with AI"
                className="btn-generate">
                {loading ? (
                  <>
                    <span className="spinner" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles size={11} />
                    Generate
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Textarea wrapper */}
      <div className={`textarea-wrapper ${loading ? "textarea-wrapper--loading" : "textarea-wrapper--idle"}`}>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(fieldId, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()} or click Generate for AI content…`}
          rows={5}
          className={`field-textarea ${
            loading ? "field-textarea--loading" :
            value ? "field-textarea--idle-filled" :
            "field-textarea--idle-empty"
          }`}
        />

        {loading && (
          <div className="textarea-overlay">
            <div className="overlay-icon">
              <Sparkles size={15} color="white" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div className="overlay-dots">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="overlay-dot"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <span className="overlay-text">AI is writing…</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}