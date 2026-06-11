import React, { useRef } from "react";
import { TABS } from "../data/pddStructure";
import "./TabBar.css";

export default function TabBar({ activeTab, onTabChange, onBack }) {
  const scrollRef = useRef(null);

  const scrollTabs = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="tabbar-outer">
      {/* Step breadcrumb row */}
      <div className="tabbar-step-row">
        <div className="tabbar-step-left">
          {/* Step indicators can be re-enabled here if needed */}
        </div>
        {onBack && (
          <button onClick={onBack} type="button" className="btn-back">
            Edit Structure
          </button>
        )}
      </div>

      {/* SPVO-style angled tab bar */}
      <div className="tabbar-wrapper">
        <button
          onClick={() => scrollTabs(-1)}
          className="tab-arrow tab-arrow-left"
          type="button"
          aria-label="Scroll left">
          «
        </button>

        <div ref={scrollRef} className="tabbar-scroll">
          {TABS.map((tab, index, array) => {
            const isActive = activeTab === tab.id;
            const isLast = index === array.length - 1;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                type="button"
                className={`tab-item${isActive ? " tab-active" : ""}${isLast ? " tab-item-last" : ""}`}>
                <span className="tab-num">{tab.id}</span>
                {tab.shortLabel}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollTabs(1)}
          className="tab-arrow tab-arrow-right"
          type="button"
          aria-label="Scroll right">
          »
        </button>
      </div>
    </div>
  );
}