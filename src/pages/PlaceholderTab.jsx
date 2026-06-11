import React, { useState, useCallback } from "react";
import { FileText, TrendingUp } from "lucide-react";
import TipTapEditor from "../components/TipTapEditor";
import { generateText } from "../utils/api";
import { TABS } from "../data/pddStructure";
import "./PlaceholderTab.css";

const TAB_PROMPTS = {
  2: (village) => [
    { heading: "2.1  Existing Water Supply Infrastructure", prompt: `Write a 2-paragraph assessment of the existing water supply infrastructure in Village ${village}, Sindh. Describe current sources (hand pumps, piped schemes, canals), coverage, condition, and reliability.` },
    { heading: "2.2  Water Quality Analysis", prompt: `Write a 2-paragraph water quality analysis for Village ${village}, Sindh. Cover bacteriological and chemical contamination, fluoride/arsenic levels, seasonal variation, and community perception of water quality.` },
    { heading: "2.3  Proposed Water Supply Scheme", prompt: `Write a 2-paragraph description of the proposed water supply scheme for Village ${village}, Sindh. Describe source selection, technology (RO plant, overhead tank, distribution network), design population, and daily demand calculation.` },
    { heading: "2.4  Operation & Maintenance Plan", prompt: `Write a 2-paragraph O&M plan for the water supply system in Village ${village}, Sindh. Include community management committee roles, tariff structure, spare parts availability, and sustainability measures.` },
  ],
  3: (village) => [
    { heading: "3.1  Existing Sanitation Situation", prompt: `Write a 2-paragraph assessment of the existing sanitation situation in Village ${village}, Sindh.` },
    { heading: "3.2  Proposed Sewerage System Design", prompt: `Write a 2-paragraph description of the proposed sewerage system for Village ${village}, Sindh.` },
    { heading: "3.3  Wastewater Treatment & Disposal", prompt: `Write a 2-paragraph section on wastewater treatment and disposal for Village ${village}, Sindh.` },
    { heading: "3.4  Community Sanitation Committees", prompt: `Write a 2-paragraph section on community sanitation committees for Village ${village}, Sindh.` },
  ],
  4: (village) => [
    { heading: "4.1  Drainage Problem Assessment", prompt: `Write a 2-paragraph drainage problem assessment for Village ${village}, Sindh.` },
    { heading: "4.2  Proposed Stormwater Drainage Design", prompt: `Write a 2-paragraph description of the proposed stormwater drainage design for Village ${village}, Sindh.` },
    { heading: "4.3  Grey Water Management", prompt: `Write a 2-paragraph section on grey water management for Village ${village}, Sindh.` },
    { heading: "4.4  Environmental Safeguards", prompt: `Write a 2-paragraph section on environmental safeguards for drainage works in Village ${village}, Sindh.` },
  ],
  5: (village) => [
    { heading: "5.1  Street Paving & Access Roads", prompt: `Write a 2-paragraph section on street paving and access road works proposed for Village ${village}, Sindh.` },
    { heading: "5.2  Solid Waste Management", prompt: `Write a 2-paragraph section on solid waste management for Village ${village}, Sindh.` },
    { heading: "5.3  Community Buildings & Public Spaces", prompt: `Write a 2-paragraph section on community buildings and public spaces proposed for Village ${village}, Sindh.` },
    { heading: "5.4  Plantation & Beautification", prompt: `Write a 2-paragraph section on plantation and beautification works for Village ${village}, Sindh.` },
  ],
  6: (village) => [
    { heading: "6.1  Bill of Quantities Summary", prompt: `Write a 2-paragraph Bill of Quantities summary for the proposed WASH works in Village ${village}, Sindh.` },
    { heading: "6.2  Value for Money Assessment", prompt: `Write a 2-paragraph value for money assessment for the proposed works in Village ${village}, Sindh.` },
    { heading: "6.3  Financing Plan", prompt: `Write a 2-paragraph financing plan for Village ${village}, Sindh.` },
  ],
  7: (village) => [
    { heading: "7.1  Implementation Schedule", prompt: `Write a 2-paragraph implementation schedule for the proposed works in Village ${village}, Sindh.` },
    { heading: "7.2  Procurement & Contracting", prompt: `Write a 2-paragraph section on procurement and contracting for Village ${village}, Sindh.` },
    { heading: "7.3  Community Governance Structure", prompt: `Write a 2-paragraph section on community governance structure for Village ${village}, Sindh.` },
    { heading: "7.4  Monitoring & Evaluation Framework", prompt: `Write a 2-paragraph M&E framework for Village ${village}, Sindh.` },
  ],
  8: (village) => [
    { heading: "8.1  Risk Register", prompt: `Write a 2-paragraph risk register for the proposed works in Village ${village}, Sindh.` },
    { heading: "8.2  Social Safeguards", prompt: `Write a 2-paragraph social safeguards section for Village ${village}, Sindh.` },
    { heading: "8.3  Environmental Safeguards", prompt: `Write a 2-paragraph environmental safeguards section for Village ${village}, Sindh.` },
    { heading: "8.4  Wider Development Impacts", prompt: `Write a 2-paragraph section on wider development impacts for Village ${village}, Sindh.` },
  ],
};

export default function PlaceholderTab({ tabNumber, tabName, village }) {
  const [editorContent, setEditorContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const sections = TAB_PROMPTS[tabNumber]?.(village) ?? [];
  const totalFields = sections.length;
  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  const handleGenerateAll = useCallback(async () => {
    if (!sections.length) return;
    setIsGenerating(true);
    setProgress({ done: 0, total: totalFields });

    let html = "";
    let done = 0;

    for (const section of sections) {
      html += `<h2>${section.heading}</h2>`;
      try {
        const text = await generateText(section.prompt);
        const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(Boolean).map(p => `<p>${p}</p>`).join("");
        html += paragraphs;
      } catch (err) {
        html += `<p><em>[Error: ${err.message}]</em></p>`;
      }
      done += 1;
      setProgress({ done, total: totalFields });
      setEditorContent(html);
    }

    setIsGenerating(false);
  }, [sections, totalFields]);

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Header card */}
      <div className="placeholder-header-card">
        <div className="placeholder-header-left">
          <div className="placeholder-icon">
            <FileText size={18} color="white" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="placeholder-title">
              {tabNumber}. {tabName}
            </h2>
          </div>
        </div>

        {isGenerating && (
          <div className="placeholder-progress">
            <div className="placeholder-progress-top">
              <div className="placeholder-progress-label">
                <TrendingUp size={12} style={{ color: "#00529d" }} />
                <span>Generating</span>
              </div>
              <span className="placeholder-progress-pct">{pct}%</span>
            </div>
            <div className="placeholder-progress-bottom">
              <span className="placeholder-progress-count">
                {progress.done}/{progress.total}
              </span>
              <div className="placeholder-progress-bar-track">
                <div
                  className="placeholder-progress-bar-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <TipTapEditor
        content={editorContent}
        onChange={setEditorContent}
        onGenerateAll={handleGenerateAll}
        isGenerating={isGenerating}
        village={village}
      />
    </div>
  );
}