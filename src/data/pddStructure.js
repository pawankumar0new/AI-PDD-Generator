// ─────────────────────────────────────────────────────────────────────────────
// pddStructure.js
// ─────────────────────────────────────────────────────────────────────────────

export const VILLAGES = [
  "Bahadur khskheli-Fateh Pur",   // ← add this
  "Gaji Khan Panhwar",
  "Noor Muhammad Jaskani",
  "Ali Bux Khoso",
  "Muhammad Khan Morio",
  "Ghulam Nabi Shar",
];

export const TABS = [
  { id: 1,  label: "Section 1",  shortLabel: "Section 1" },
  { id: 2,  label: "Section 2",  shortLabel: "Section 2" },
  { id: 3,  label: "Section 3",  shortLabel: "Section 3" },
  { id: 4,  label: "Section 4",  shortLabel: "Section 4" },
  { id: 5,  label: "Village Background and Location",              shortLabel: "Section 5" },
  { id: 6,  label: "Village Profile: Achar Khaskheli",            shortLabel: "Section 6" },
  { id: 7,  label: "Social & Environmental Integration",          shortLabel: "Section 7" },
  { id: 8,  label: "Section 8",  shortLabel: "Section 8" },
  { id: 9,  label: "Section 9",  shortLabel: "Section 9" },
  { id: 10, label: "Section 10", shortLabel: "Section 10" },
  { id: 11, label: "Section 11", shortLabel: "Section 11" },
  { id: 12, label: "Section 12", shortLabel: "Section 12" },
  { id: 13, label: "Section 13", shortLabel: "Section 13" },
  { id: 14, label: "Section 14", shortLabel: "Section 14" },
  { id: 15, label: "Section 15", shortLabel: "Section 15" },
  { id: 16, label: "Section 16", shortLabel: "Section 16" },
  { id: 17, label: "Section 17", shortLabel: "Section 17" },
  { id: 18, label: "Section 18", shortLabel: "Section 18" },
  { id: 19, label: "Section 19", shortLabel: "Section 19" },
  { id: 20, label: "Section 20", shortLabel: "Section 20" },
];

// ─────────────────────────────────────────────────────────────────────────────
// VILLAGE PROFILE SECTIONS  (Section 6 — used by VillageProfileSection.jsx)
// ─────────────────────────────────────────────────────────────────────────────
export const VILLAGE_PROFILE_SECTIONS = [
  {
    id: "1.1",
    title: "1.1  THE VILLAGE CONTEXT",
    fields: [
      { id: "admin_location",    label: "Administrative Location & Access Map",  sectionNumber: "1.1.1" },
      { id: "settlement_pattern", label: "Settlement Pattern & Land Tenure",      sectionNumber: "1.1.2" },
      { id: "migration_history", label: "Migration / History of Settlement",      sectionNumber: "1.1.3" },
    ],
  },
  {
    id: "1.2",
    title: "1.2  SOCIAL PROFILE",
    fields: [
      { id: "demography",           label: "Demography",                  sectionNumber: "1.2.1" },
      { id: "livelihood",           label: "Livelihood",                  sectionNumber: "1.2.2" },
      { id: "education_profile",    label: "Education Profile",           sectionNumber: "1.2.3" },
      { id: "health",               label: "Health",                      sectionNumber: "1.2.4" },
      { id: "infrastructure_access",label: "Infrastructure and Access",   sectionNumber: "1.2.5" },
      { id: "behavior_changes",     label: "Behavior Changes",            sectionNumber: "1.2.6" },
    ],
  },
  {
    id: "1.3",
    title: "1.3  ENVIRONMENTAL PROFILE",
    fields: [
      { id: "env_profile", label: "Environmental Profile", sectionNumber: "1.3.1" },
    ],
  },
  {
    id: "1.4",
    title: "1.4  WASH SITUATION IN THE VILLAGE",
    fields: [
      { id: "water_supply_situation", label: "Water Supply Situation",  sectionNumber: "1.4.1" },
      { id: "sanitation_situation",   label: "Sanitation Situation",    sectionNumber: "1.4.2" },
      { id: "hygiene_practices",      label: "Hygiene Practices",       sectionNumber: "1.4.3" },
      { id: "solid_waste",            label: "Solid Waste",             sectionNumber: "1.4.4" },
      { id: "drainage_grey_water",    label: "Drainage and Grey Water", sectionNumber: "1.4.5" },
      { id: "streets_access",         label: "Streets and Access",      sectionNumber: "1.4.6" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FIELD API PAYLOAD MAP
// ─────────────────────────────────────────────────────────────────────────────
// Maps every fieldId → the exact object sent in the `data` array of the POST
// body to http://192.168.110.87:9000/api/v1/village/analyze
//
// Usage:
//   import { FIELD_API_PAYLOAD } from "../data/pddStructure";
//   const payload = FIELD_API_PAYLOAD["admin_location"];
//   // → { section_no: "1", section_name: "Administrative Location & Access Map",
//   //     sub_section_no: "1.1", sub_sub_section_no: "1.1.1" }
//
// ─────────────────────────────────────────────────────────────────────────────
export const VILLAGE_ID_MAP = {
  "Bahadur khskheli-Fateh Pur": "054ff8aa-285d-4e44-89bf-d91ada9da2ca", // ← add this (matches test payload)
  "Bahadur Khaskheli": "054ff8aa-285d-4e44-89bf-d91ada9da2ca",
  "Noor Muhammad Jaskani": "0ccc8851-61e3-4eb2-b007-1fcaf18d3233",
  "Ali Bux Khoso": "replace-with-real-uuid",
  "Muhammad Khan Morio": "replace-with-real-uuid",
  "Ghulam Nabi Shar": "replace-with-real-uuid",
};
export const FIELD_API_PAYLOAD = {

  // ── Section 5: Village Background and Location ──────────────────────────────
  village_background: {
    section_no: "5",
    section_name: "Village Background and Location",
    sub_section_no: "",
    sub_section_name: "",
    sub_sub_section_no: "",
    sub_sub_section_name: "",
  },

  // ── Section 1.1: The Village Context ────────────────────────────────────────
  admin_location: {
    section_no: "1",
    section_name: "The Village Context",
    sub_section_no: "1.1",
    sub_section_name: "The Village Context",
    sub_sub_section_no: "1.1.1",
    sub_sub_section_name: "Administrative Location & Access Map",
  },
  settlement_pattern: {
    section_no: "1",
    section_name: "The Village Context",
    sub_section_no: "1.1",
    sub_section_name: "The Village Context",
    sub_sub_section_no: "1.1.2",
    sub_sub_section_name: "Settlement Pattern & Land Tenure",
  },
  migration_history: {
    section_no: "1",
    section_name: "The Village Context",
    sub_section_no: "1.1",
    sub_section_name: "The Village Context",
    sub_sub_section_no: "1.1.3",
    sub_sub_section_name: "Migration / History of Settlement",
  },

  // ── Section 1.2: Social Profile ─────────────────────────────────────────────
  demography: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.2",
    sub_section_name: "Social Profile",
    sub_sub_section_no: "1.2.1",
    sub_sub_section_name: "Demography",
  },
  livelihood: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.2",
    sub_section_name: "Social Profile",
    sub_sub_section_no: "1.2.2",
    sub_sub_section_name: "Livelihood",
  },
  education_profile: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.2",
    sub_section_name: "Social Profile",
    sub_sub_section_no: "1.2.3",
    sub_sub_section_name: "Education Profile",
  },
  health: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.2",
    sub_section_name: "Social Profile",
    sub_sub_section_no: "1.2.4",
    sub_sub_section_name: "Health",
  },
  infrastructure_access: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.2",
    sub_section_name: "Social Profile",
    sub_sub_section_no: "1.2.5",
    sub_sub_section_name: "Infrastructure and Access",
  },
  behavior_changes: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.2",
    sub_section_name: "Social Profile",
    sub_sub_section_no: "1.2.6",
    sub_sub_section_name: "Behavior Changes",
  },

  // ── Section 1.3: Environmental Profile ──────────────────────────────────────
  env_profile: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.3",
    sub_section_name: "Environmental Profile",
    sub_sub_section_no: "",
    sub_sub_section_name: "",
  },

  // ── Section 1.4: WASH Situation ──────────────────────────────────────────────
  water_supply_situation: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.4",
    sub_section_name: "WASH Situation in the Village",
    sub_sub_section_no: "1.4.1",
    sub_sub_section_name: "Water Supply Situation",
  },
  sanitation_situation: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.4",
    sub_section_name: "WASH Situation in the Village",
    sub_sub_section_no: "1.4.2",
    sub_sub_section_name: "Sanitation Situation",
  },
  hygiene_practices: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.4",
    sub_section_name: "WASH Situation in the Village",
    sub_sub_section_no: "1.4.3",
    sub_sub_section_name: "Hygiene Practices",
  },
  solid_waste: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.4",
    sub_section_name: "WASH Situation in the Village",
    sub_sub_section_no: "1.4.4",
    sub_sub_section_name: "Solid Waste",
  },
  drainage_grey_water: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.4",
    sub_section_name: "WASH Situation in the Village",
    sub_sub_section_no: "1.4.5",
    sub_sub_section_name: "Drainage and Grey Water",
  },
  streets_access: {
    section_no: "1",
    section_name: "Village Profile",
    sub_section_no: "1.4",
    sub_section_name: "WASH Situation in the Village",
    sub_sub_section_no: "1.4.6",
    sub_sub_section_name: "Streets and Access",
  },

  // ── Section 7: Social & Environmental Integration ───────────────────────────
  // Social fields
  social_context: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.1",
    sub_sub_section_name: "Social Context Overview",
  },
  social_vulnerability: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.2",
    sub_sub_section_name: "Demography and Settlement",
  },
  social_gender: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.3",
    sub_sub_section_name: "Gender Dynamics and Women Empowerment",
  },
  social_livelihoods: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.4",
    sub_sub_section_name: "Livelihoods and Economic Constraints",
  },
  social_education_health: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.5",
    sub_sub_section_name: "Education and Health Linkages",
  },
  social_land: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.6",
    sub_sub_section_name: "Land and Resettlement Considerations",
  },
  social_risk: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.7",
    sub_sub_section_name: "Risk, Resilience and Community Institutions",
  },
  social_wash_integration: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.1",
    sub_section_name: "Social Integration",
    sub_sub_section_no: "7.1.8",
    sub_sub_section_name: "Integration with WASH and Settlement Services",
  },

  // Environmental fields
  env_overview: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.2",
    sub_section_name: "Environmental Integration",
    sub_sub_section_no: "",
    sub_sub_section_name: "",
  },
  env_risk_climate: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.2",
    sub_section_name: "Environmental Integration",
    sub_sub_section_no: "7.2.1",
    sub_sub_section_name: "Environmental Risk and Climate Change",
  },
  env_wash_intervention: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.2",
    sub_section_name: "Environmental Integration",
    sub_sub_section_no: "7.2.2",
    sub_sub_section_name: "WASH Intervention",
  },
  env_water_supply: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.2",
    sub_section_name: "Environmental Integration",
    sub_sub_section_no: "7.2.2.1",
    sub_sub_section_name: "Water Supply System",
  },
  env_sanitation: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.2",
    sub_section_name: "Environmental Integration",
    sub_sub_section_no: "7.2.2.2",
    sub_sub_section_name: "Sanitation System",
  },
  env_hygiene_promotion: {
    section_no: "7",
    section_name: "Social & Environmental Integration",
    sub_section_no: "7.2",
    sub_section_name: "Environmental Integration",
    sub_sub_section_no: "7.2.2.3",
    sub_sub_section_name: "Hygiene Promotion",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL & ENVIRONMENTAL FIELD DEFINITIONS  (Section 7)
// These replace the hardcoded arrays in SocialEnvironmental.jsx
// ─────────────────────────────────────────────────────────────────────────────
export const SOCIAL_FIELD_DEFS = [
  { id: "social_context",          label: "Social Context Overview",                    sectionNumber: "7.1.1" },
  { id: "social_vulnerability",    label: "Demographics and Settlement",                sectionNumber: "7.1.2" },
  { id: "social_gender",           label: "Gender Dynamics and Women Empowerment",      sectionNumber: "7.1.3" },
  { id: "social_livelihoods",      label: "Livelihoods and Economic Constraints",       sectionNumber: "7.1.4" },
  { id: "social_education_health", label: "Education and Health Linkages",              sectionNumber: "7.1.5" },
  { id: "social_land",             label: "Land and Resettlement Considerations",       sectionNumber: "7.1.6" },
  { id: "social_risk",             label: "Risk, Resilience and Community Institutions",sectionNumber: "7.1.7" },
  { id: "social_wash_integration", label: "Integration with WASH and Settlement Services", sectionNumber: "7.1.8" },
];

export const ENV_FIELD_DEFS = [
  { id: "env_overview",          label: "Environmental Integration — Overview",  sectionNumber: "7.2" },
  { id: "env_risk_climate",      label: "Environmental Risk & Climate Change",   sectionNumber: "7.2.1" },
  { id: "env_wash_intervention", label: "WASH Intervention",                     sectionNumber: "7.2.2" },
  { id: "env_water_supply",      label: "Water Supply System",                   sectionNumber: "7.2.2.1" },
  { id: "env_sanitation",        label: "Sanitation System",                     sectionNumber: "7.2.2.2" },
  { id: "env_hygiene_promotion", label: "Hygiene Promotion",                     sectionNumber: "7.2.2.3" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Legacy AI generation prompts (kept for PlaceholderTab — not used by LLM hook)
// ─────────────────────────────────────────────────────────────────────────────
export const FIELD_PROMPTS = {
  admin_location: (village) =>
    `Write a 2-paragraph Administrative Location & Access Map description for Village ${village} in rural Sindh, Pakistan. Include district, union council, taluka, GPS coordinates (approximate), and nearest town for market/healthcare access. Write in formal technical report style.`,
  settlement_pattern: (village) =>
    `Write a 2-paragraph Settlement Pattern & Land Tenure section for Village ${village} in Sindh. Describe whether the village is clustered or dispersed, land ownership patterns, and how layout affects WASH infrastructure planning.`,
  migration_history: (village) =>
    `Write a 2-paragraph Migration / History of Settlement section for Village ${village} in Sindh. Describe founding families, how the village grew, kinship-based migration, and current community composition.`,
  demography: (village) =>
    `Write a 2-paragraph demographic profile for Village ${village} in Sindh. Include estimated total households, population, average household size, children under 18 percentage, adult male/female ratio, and dependency ratio.`,
  livelihood: (village) =>
    `Write a 2-paragraph livelihood profile for Village ${village} in rural Sindh. Describe primary livelihoods (agriculture, livestock, labor), income levels, seasonal work patterns, and economic vulnerability.`,
  education_profile: (village) =>
    `Write a 2-paragraph education profile for Village ${village} in Sindh. Describe school enrollment rates, gender gaps in education, literacy rates, school infrastructure availability, and challenges.`,
  health: (village) =>
    `Write a 2-paragraph health profile for Village ${village} in Sindh. Describe access to healthcare facilities, common diseases (especially WASH-related), maternal health, and challenges faced by community.`,
  infrastructure_access: (village) =>
    `Write a 2-paragraph infrastructure and access section for Village ${village} in Sindh. Describe road connectivity, electricity, telecommunications, and how access affects service delivery.`,
  behavior_changes: (village) =>
    `Write a 2-paragraph behavior change section for Village ${village} in Sindh related to WASH. Describe current hygiene practices, open defecation status, handwashing habits, and recommended interventions.`,
  env_profile: (village) =>
    `Write a 4-paragraph environmental profile for Village ${village} in Sindh. Include climate, rainfall pattern, flood risk, soil type, groundwater availability, and environmental hazards.`,
  water_supply_situation: (village) =>
    `Write a 3-paragraph water supply situation for Village ${village} in Sindh. Describe current water sources (hand pumps, canals, tankers), water quality, collection time, access challenges, and gaps.`,
  sanitation_situation: (village) =>
    `Write a 3-paragraph sanitation situation for Village ${village} in Sindh. Describe toilet coverage, open defecation practices, latrine types, and sanitation challenges.`,
  hygiene_practices: (village) =>
    `Write a 3-paragraph hygiene practices section for Village ${village} in Sindh. Describe handwashing practices, soap availability, menstrual hygiene management, and awareness levels.`,
  solid_waste: (village) =>
    `Write a 3-paragraph solid waste management section for Village ${village} in Sindh. Describe current waste disposal practices, open dumping, health hazards, and recommended measures.`,
  drainage_grey_water: (village) =>
    `Write a 2-paragraph drainage and grey water section for Village ${village} in Sindh. Describe existing drainage, stagnant water issues, grey water disposal, and health impacts.`,
  streets_access: (village) =>
    `Write a 2-paragraph streets and access section for Village ${village} in Sindh. Describe street condition, paving status, accessibility for PWDs and women, and impact on WASH infrastructure maintenance.`,
};

export const VILLAGE_DUMMY_DATA = {};