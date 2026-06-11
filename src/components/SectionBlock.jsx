import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, RotateCcw, CheckCircle2 } from "lucide-react";
import SectionField from "./SectionField";
import "./SectionBlock.css";

export default function SectionBlock({
  section,
  fieldValues,
  loadingFields,
  sectionLoading,
  onGenerateField,
  onClearField,
  onGenerateSection,
  onClearSection,
  onChange,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const isSectionLoading = sectionLoading[section.id];
  const allHaveContent = section.fields.every((f) => fieldValues[f.id]);
  const filledCount = section.fields.filter((f) => fieldValues[f.id]).length;
  const totalCount = section.fields.length;

  return (
    <div className="section-block">

      {/* Header */}
      <div
        className={`section-header ${collapsed ? "section-header--collapsed" : "section-header--expanded"}`}
        onClick={() => setCollapsed((v) => !v)}>

        <div className="section-title-group">
          <span className="section-id-badge">{section.id}</span>

          <h3 className="section-title">
            {section.title.replace(/^\d+\.\d+\s+/, "")}
          </h3>

          {allHaveContent ? (
            <span className="complete-badge">
              <CheckCircle2 size={11} />
              Complete
            </span>
          ) : (
            <span className="section-progress-count">
              {filledCount}/{totalCount}
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="section-controls" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onClearSection(section.id)}
            disabled={isSectionLoading}
            type="button"
            title="Clear all fields"
            className="btn-section-clear">
            <RotateCcw size={11} />
            Clear
          </button>

          <button
            onClick={() => onGenerateSection(section.id)}
            disabled={isSectionLoading}
            type="button"
            title="Generate all fields"
            className="btn-section-generate">
            {isSectionLoading ? (
              <>
                <span className="spinner-sm" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles size={11} />
                Generate All
              </>
            )}
          </button>

          <button
            type="button"
            className="section-toggle"
            aria-label="Toggle section">
            {collapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="section-body">
          {section.fields.map((field) => (
            <SectionField
              key={field.id}
              label={field.label}
              fieldId={field.id}
              value={fieldValues[field.id] || ""}
              loading={loadingFields[field.id] || false}
              onChange={onChange}
              onGenerate={onGenerateField}
              onClear={onClearField}
            />
          ))}
        </div>
      )}
    </div>
  );
}