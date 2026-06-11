export const VILLAGES = [
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

export const VILLAGE_PROFILE_SECTIONS = [
  {
    id: "1.1",
    title: "1.1  THE VILLAGE CONTEXT",
    fields: [
      { id: "admin_location", label: "Administrative Location & Access Map" },
      { id: "settlement_pattern", label: "Settlement Pattern & Land Tenure" },
      { id: "migration_history", label: "Migration / History of Settlement" },
    ],
  },
  {
    id: "1.2",
    title: "1.2  SOCIAL PROFILE",
    fields: [
      { id: "demography", label: "Demography" },
      { id: "livelihood", label: "Livelihood" },
      { id: "education_profile", label: "Education Profile" },
      { id: "health", label: "Health" },
      { id: "infrastructure_access", label: "Infrastructure and Access" },
      { id: "behavior_changes", label: "Behavior Changes" },
    ],
  },
  {
    id: "1.3",
    title: "1.3  ENVIRONMENTAL PROFILE",
    fields: [
      { id: "env_profile", label: "Environmental Profile" },
    ],
  },
  {
    id: "1.4",
    title: "1.4  WASH SITUATION IN THE VILLAGE",
    fields: [
      { id: "water_supply_situation", label: "Water Supply Situation" },
      { id: "sanitation_situation", label: "Sanitation Situation" },
      { id: "hygiene_practices", label: "Hygiene Practices" },
      { id: "solid_waste", label: "Solid Waste" },
      { id: "drainage_grey_water", label: "Drainage and Grey Water" },
      { id: "streets_access", label: "Streets and Access" },
    ],
  },
];

// AI generation prompts per field
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