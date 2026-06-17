import React, { useState } from "react";
import TabBar from "./components/TabBar";
import PlaceholderTab from "./pages/PlaceholderTab";
import VillageBackground from "./pages/VillageBackground";
import VillageProfileSection from "./pages/VillageProfileSection";
import SocialEnvironmental from "./pages/SocialEnvironmental";
import InfrastructureAssessment from "./pages/InfrastructureAssessment";
import DesignCriteria from "./pages/DesignCriteria";
import ProposedInfrastructure from "./pages/ProposedInfrastructure";
import RiskMatrix from "./pages/RiskMatrix";
import QuantitiesCostEstimates from "./pages/QuantitiesCostEstimates";
import OperationMaintenance from "./pages/OperationMaintenance";
import EconomicAnalysis from "./pages/EconomicAnalysis";
import ProjectImplementation from "./pages/ProjectImplementation";
import ProjectSummary from "./pages/ProjectSummary";
import CostDetail from "./pages/CostDetail";
import SubComponents from "./pages/SubComponents";
import OmCost from "./pages/OmCost";
import Stakeholders from "./pages/Stakeholders";
import OtherBenefits from "./pages/OtherBenefits";
import EnvironmentalSocialReview from "./pages/EnvironmentalSocialReview";
import ESSignoff from "./pages/ESSignoff";
import ProjectManagement from "./pages/ProjectManagement";
// import { VILLAGES, TABS } from "./data/pddStructure";
import { useLLMGenerate } from "./hooks/useLLMGenerate";
import { MapPin, ChevronDown } from "lucide-react";
import { VILLAGES, TABS, VILLAGE_ID_MAP } from "./data/pddStructure";
import "./App.css";

export default function App() {
  const [selectedVillage, setSelectedVillage] = useState("");
  const [activeTab, setActiveTab] = useState(5);

  // ── LLM state lifted here so content persists across tab switches ──────────
  const { content, loading, errors, generateField, setFieldContent } = useLLMGenerate();
  const handleGenerate = (fieldId, apiPayload) => {
    const villageId = VILLAGE_ID_MAP[selectedVillage];
    if (!villageId) {
      console.error(`No village ID for ${selectedVillage}`);
      return;
    }
    generateField(selectedVillage, fieldId, villageId, apiPayload);
  };

  
  // Helpers scoped to the currently selected village
  const villageContent = content[selectedVillage] || {};

  const handleChange = (fieldId, html) => {
    setFieldContent(selectedVillage, fieldId, html);
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
    setActiveTab(5);
  };

  const renderTabContent = () => {
    if (!selectedVillage) return null;

    if (activeTab === 1) {
      return (
        <ProjectSummary
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 2) {
      return (
        <CostDetail
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 3) {
      return (
        <SubComponents
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 4) {
      return (
        <OmCost
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    // ── Section 5: Village Background ────────────────────────────────────────
    if (activeTab === 5) {
      return (
        <VillageBackground
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    // ── Section 6: Village Profile ────────────────────────────────────────────
    if (activeTab === 6) {
      return (
        <VillageProfileSection
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    // ── Section 7: Social & Environmental Integration ─────────────────────────
    if (activeTab === 7) {
      return (
        <SocialEnvironmental
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }
      if (activeTab === 8) {
      return (
        <InfrastructureAssessment
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }
 
    // ── Section 9: Design Criteria ────────────────────────────────────────────
    if (activeTab === 9) {
      return (
        <DesignCriteria
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }
 
    // ── Section 10: Proposed Infrastructure Solutions ─────────────────────────
    if (activeTab === 10) {
      return (
        <ProposedInfrastructure
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 11) {
      return (
        <RiskMatrix
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 12) {
      return (
        <QuantitiesCostEstimates
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 13) {
      return (
        <OperationMaintenance
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }
    
    if (activeTab === 14) {
      return (
        <EconomicAnalysis
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 15) {
      return (
        <ProjectImplementation
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 16) {
      return (
        <ProjectManagement
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 17) {
      return (
        <Stakeholders
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 18) {
      return (
        <OtherBenefits
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 19) {
      return (
        <EnvironmentalSocialReview
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    if (activeTab === 20) {
      return (
        <ESSignoff
          village={selectedVillage}
          fieldContent={villageContent}
          fieldLoading={loading}
          fieldErrors={errors}
          onGenerate={handleGenerate}
          onChange={handleChange}
        />
      );
    }

    // ── All other sections: PlaceholderTab ────────────────────────────────────
    const tab = TABS.find((t) => t.id === activeTab);
    return (
      <PlaceholderTab
        tabNumber={activeTab}
        tabName={tab?.label || `Section ${activeTab}`}
        village={selectedVillage}
      />
    );
  };

  return (
    <div className="app">
      <main className="main-content">

        {/* Page header */}
        <div className="page-hero">
          <div className="hero-left">
            <h1 className="hero-title">AI PDD Generator</h1>
            <p className="hero-desc">
              Generate structured Project Design Documents for CRSDP villages using AI. Select a village to begin.
            </p>
          </div>
        </div>

        {/* Village Selector */}
        <div
          className="intro-y box p-4 mt-0 mb-5 flex items-center gap-4 flex-wrap"
          style={{ borderTop: "3px solid #00529d" }}>
          <div className="flex items-center gap-2 flex-shrink-0">
            <MapPin size={15} style={{ color: "#00529d" }} />
            <label
              className="text-sm font-bold"
              style={{ color: "#1a3e74", whiteSpace: "nowrap" }}
              htmlFor="village-select">
              Select Village
            </label>
          </div>
          <div className="select-wrapper">
            <select
              id="village-select"
              className="village-select"
              value={selectedVillage}
              onChange={handleVillageChange}>
              <option value="" disabled>— Choose a village to generate PDD —</option>
              {VILLAGES.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <ChevronDown size={15} className="select-chevron" />
          </div>
        </div>

        {/* Content */}
        {selectedVillage ? (
          <div className="content-area">
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="bg-white rounded-b-lg shadow-md p-5 tab-content">
              {renderTabContent()}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            {/* <div className="empty-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="empty-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="empty-card-bar" />
                  <div className="empty-card-bar short" />
                  <div className="empty-card-bar medium" />
                </div>
              ))}
            </div> */}
            <p className="empty-text">Select a village above to start generating your PDD</p>
          </div>
        )}
      </main>
    </div>
  );
}