import React, { useState } from "react";
import TabBar from "./components/TabBar";
import PlaceholderTab from "./pages/PlaceholderTab";
import VillageBackground from "./pages/VillageBackground";
import VillageProfileSection from "./pages/VillageProfileSection";
import SocialEnvironmental from "./pages/SocialEnvironmental";
import { VILLAGES, TABS } from "./data/pddStructure";
import { MapPin, ChevronDown } from "lucide-react";
import "./App.css";

export default function App() {
  const [selectedVillage, setSelectedVillage] = useState("");
  const [activeTab, setActiveTab] = useState(5);

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
    setActiveTab(5);
  };

  const renderTabContent = () => {
    if (!selectedVillage) return null;

    if (activeTab === 5) {
      return <VillageBackground village={selectedVillage} />;
    }
    if (activeTab === 6) {
      return <VillageProfileSection village={selectedVillage} />;
    }
    if (activeTab === 7) {
      return <SocialEnvironmental village={selectedVillage} />;
    }

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
            <div className="empty-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="empty-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="empty-card-bar" />
                  <div className="empty-card-bar short" />
                  <div className="empty-card-bar medium" />
                </div>
              ))}
            </div>
            <p className="empty-text">Select a village above to start generating your PDD</p>
          </div>
        )}
      </main>
    </div>
  );
}