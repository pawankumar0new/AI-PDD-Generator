import React, { useState } from "react";
import { VILLAGE_PROFILE_SECTIONS } from "../data/pddStructure";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./Fieldselector.css";

export default function FieldSelector({ village, onContinue, initialSelected }) {
  const allFieldIds = VILLAGE_PROFILE_SECTIONS.flatMap((s) => s.fields.map((f) => f.id));
  const [selected, setSelected] = useState(
    initialSelected ? new Set(initialSelected) : new Set(allFieldIds)
  );
  const [collapsed, setCollapsed] = useState({});

  const toggleField = (fieldId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(fieldId) ? next.delete(fieldId) : next.add(fieldId);
      return next;
    });
  };

  const toggleSection = (sectionId) => {
    const section = VILLAGE_PROFILE_SECTIONS.find((s) => s.id === sectionId);
    const ids = section.fields.map((f) => f.id);
    const allChecked = ids.every((id) => selected.has(id));
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (allChecked ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  const toggleCollapse = (sectionId, e) => {
    e.stopPropagation();
    setCollapsed((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleContinue = () => {
    onContinue(selected.size === allFieldIds.length ? null : Array.from(selected));
  };

  const noneSelected = selected.size === 0;

  return (
    <div className="field-selector">

      {/* Sections list */}
      <div className="fs-sections">
        {VILLAGE_PROFILE_SECTIONS.map((section) => {
          const sectionFieldIds = section.fields.map((f) => f.id);
          const checkedCount = sectionFieldIds.filter((id) => selected.has(id)).length;
          const allChecked = checkedCount === sectionFieldIds.length;
          const someChecked = checkedCount > 0 && !allChecked;
          const isCollapsed = collapsed[section.id];

          return (
            <div key={section.id} className="fs-section">

              {/* Section header */}
              <div
                className={`fs-section-header ${isCollapsed ? "fs-section-header--collapsed" : "fs-section-header--expanded"}`}
                onClick={() => toggleSection(section.id)}>

                <div className="fs-section-left">
                  {/* Custom checkbox */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`fs-custom-checkbox ${
                      allChecked ? "fs-custom-checkbox--checked" :
                      someChecked ? "fs-custom-checkbox--partial" :
                      "fs-custom-checkbox--unchecked"
                    }`}>
                    {allChecked && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {someChecked && (
                      <div style={{ width: 7, height: 2, background: "#fff", borderRadius: 2 }} />
                    )}
                  </div>

                  <span className="fs-section-badge">{section.id}</span>

                  <span className="fs-section-title">
                    {section.title.replace(/^\d+\.\d+\s+/, "")}
                  </span>
                </div>

                <div className="fs-section-right">
                  <span className="fs-section-count">{checkedCount}/{sectionFieldIds.length}</span>
                  <button
                    onClick={(e) => toggleCollapse(section.id, e)}
                    type="button"
                    className="fs-collapse-btn">
                    {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  </button>
                </div>
              </div>

              {/* Fields list */}
              {!isCollapsed && (
                <div className="fs-fields">
                  {section.fields.map((field) => {
                    const isChecked = selected.has(field.id);
                    return (
                      <label
                        key={field.id}
                        onClick={() => toggleField(field.id)}
                        className={`fs-field${isChecked ? " fs-field--checked" : ""}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                        />
                        <span className="fs-field-label">{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="fs-footer">
        <div className="fs-footer-info">
          <strong>{selected.size}</strong>
          {" "}field{selected.size !== 1 ? "s" : ""} queued for AI generation
        </div>
        <div className="fs-footer-actions">
          <button
            onClick={handleContinue}
            disabled={noneSelected}
            type="button"
            className="btn-continue">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}