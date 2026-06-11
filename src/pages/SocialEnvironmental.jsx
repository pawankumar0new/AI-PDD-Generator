import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import "./SectionPages.css";

// ── Inline editor ────────────────────────────────────────────────────────────
function InlineEditor({ value, onChange, onSave, onCancel }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "",
    onUpdate({ editor }) { onChange(editor.getHTML()); },
  });

  if (!editor) return null;

  const Btn = ({ onClick, active, disabled, title, children }) => (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick} disabled={disabled}
      title={title} type="button" className={`ife-btn${active ? " ife-btn--active" : ""}`}>
      {children}
    </button>
  );

  return (
    <div className="inline-field-editor">
      <div className="ife-toolbar">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><b style={{fontSize:11}}>B</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><i style={{fontSize:11}}>I</i></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><u style={{fontSize:11}}>U</u></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4"><span style={{fontSize:10,fontWeight:700}}>H4</span></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet"><span style={{fontSize:11}}>•</span></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered"><span style={{fontSize:10}}>1.</span></Btn>
        <div className="ife-sep" />
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><span style={{fontSize:11}}>↩</span></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><span style={{fontSize:11}}>↪</span></Btn>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={onCancel} type="button" className="btn-cancel-edit"><X size={12} /> Cancel</button>
          <button onClick={onSave} type="button" className="btn-save-edit"><Check size={12} /> Save</button>
        </div>
      </div>
      <EditorContent editor={editor} style={{ padding: "16px 24px", minHeight: 120 }} />
    </div>
  );
}

// ── Single editable field block ──────────────────────────────────────────────
function FieldBlock({ title, html }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(html);
  const [draft, setDraft] = useState(html);

  const handleSave = () => { setSaved(draft); setEditing(false); };
  const handleCancel = () => { setDraft(saved); setEditing(false); };

  return (
    <div className="field-block-vp">
      <div className="field-heading-row">
        <h3>{title}</h3>
        <div className="field-heading-actions">
          {!editing ? (
            <button onClick={() => setEditing(true)} type="button" className="btn-edit">
              <Pencil size={10} /> Edit
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={handleCancel} type="button" className="btn-cancel-edit">Cancel</button>
              <button onClick={handleSave} type="button" className="btn-save-edit">
                <Check size={11} /> Save
              </button>
            </div>
          )}
        </div>
      </div>
      {editing ? (
        <InlineEditor value={draft} onChange={setDraft} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div
          className={`field-read-content${!saved ? " field-read-content--empty" : ""}`}
          dangerouslySetInnerHTML={{ __html: saved || "<span class='field-read-empty-hint'>No content yet. Click Edit to add.</span>" }}
        />
      )}
    </div>
  );
}

// ── Section 7 data ────────────────────────────────────────────────────────────
const SOCIAL_FIELDS = [
  {
    title: "7.1.1 Village Social Profile and Integration into WASH Services",
    html: `<p>A detailed social survey report for Bahadur Khaskheli has been prepared separately, capturing comprehensive demographic, socio-economic, and cultural information. This section draws on that report to summarize the key findings and integrate them into the planning and design framework. The survey highlights the community's social dynamics, vulnerabilities, and institutional capacities, which are critical considerations for developing climate-resilient WASH and settlement-improvement interventions.</p>`,
  },
  {
    title: "7.1.2 Demography and Settlement",
    html: `<p>Bahadur Khaskheli consists of 57 households with a total population of 429 individuals. The average household size is approximately 7 persons per household. Children under the age of 18 make up about 31% of the total population (around 134 individuals), reflecting a moderate dependency ratio.</p>
<p>The settlement pattern is clustered, with households organized in compact, contiguous groups. Residential land is partly privately owned and partly on government land, and no rented or homeless households were reported.</p>`,
  },
  {
    title: "7.1.3 Vulnerable Groups and Social Inclusion",
    html: `<p>The survey recorded <strong>6 women-headed households</strong> and <strong>11 persons with disabilities (PWDs)</strong>, including 9 individuals with physical impairments and 2 with speaking impairments. Elderly caregivers were also identified among the households. These groups represent segments of the population that may require additional support and consideration in community-level planning and service delivery.</p>`,
  },
  {
    title: "7.1.4 Livelihoods and Economic Constraints",
    html: `<p>Agriculture, livestock rearing, and daily wage labor are the principal sources of livelihood in Bahadur Khaskheli. The main crops cultivated include wheat, rice, cotton, sugarcane, and seasonal vegetables. Livestock holdings consist of approximately 20 buffaloes, 40 goats, 2 sheep, 4 donkeys, and about 250 poultry birds.</p>
<p>Household incomes are generally low, ranging between <strong>PKR 7,000 and PKR 70,000 per month</strong>, with no access to formal credit or microfinance services. Women contribute significantly to household economies through livestock care, tailoring, and small-scale retail or home-based activities, although much of this work remains unpaid or unrecorded in household income data.</p>`,
  },
  {
    title: "7.1.5 Education and Health Linkages",
    html: `<p>Educational facilities in Bahadur Khaskheli are very limited. The village has a primary school, but it operates in a deteriorated structure with only two male teachers and minimal classroom facilities. The building lacks proper partitions, ventilation, and basic amenities, creating an unconducive learning environment for children.</p>
<p>Despite these limitations, school enrolment is encouraging, with both boys and girls currently attending school in nearby areas, reflecting the community's commitment to education. However, adult literacy levels remain extremely low, particularly among women, where the majority have not attended formal education.</p>
<p>Health conditions are similarly fragile. The nearest accessible healthcare facility is the District Headquarter Hospital (DHQ) in Tando Muhammad Khan, located about 8 kilometres away. It provides Maternal and Child Health (MCH), Immunization, Antenatal Care (ANC), Nutrition, and Family Planning services.</p>
<p>Hygiene practices are weak, with inconsistent handwashing with soap and an absence of structured hygiene education programs. Sanitation coverage is inadequate, with only 15 toilets for 57 households, leading most residents to practice open defecation.</p>`,
  },
  {
    title: "7.1.6 Land and Resettlement Considerations",
    html: `<p>All land within Bahadur Khaskheli is owned by resident households or classified as government land within the settlement boundary. <strong>No displacement or resettlement will occur</strong> as a result of proposed project interventions.</p>
<p>In cases where communal WASH facilities such as water tanks, filtration units, or community toilets require land, contributions will be made through a <strong>Voluntary Land Donation (VLD)</strong> process, ensuring documented consent from landowners and full compliance with safeguard standards. This approach guarantees transparency, community ownership, and the avoidance of any involuntary land acquisition.</p>`,
  },
  {
    title: "7.1.7 Risk, Resilience, and Community Institutions",
    html: `<p>During the 2022 floods, Bahadur Khaskheli experienced severe waterlogging, with floodwater levels reaching up to <strong>4–5 feet</strong> and remaining stagnant for several months. This prolonged inundation weakened katcha housing structures, damaged hand pumps, and disrupted access to safe drinking water and sanitation facilities. The absence of a paved access road further limited mobility and delayed recovery efforts.</p>
<p>The village currently has no designated safe site within its boundaries; during emergencies, residents rely on reaching the main road as an evacuation route. This highlights the need for localized disaster preparedness and the identification of elevated safe zones for emergency shelter and asset protection.</p>
<p>Despite these risks, the community demonstrates strong resilience and social cohesion. Households collectively contribute to minor repair and maintenance activities through informal donations and shared labor. Local leadership, particularly under <strong>Mr. Wali Muhammad</strong>, plays a key role in mobilizing participation and resolving community issues.</p>`,
  },
  {
    title: "7.1.8 Integration with WASH and Settlement Services",
    html: `<ul>
<li><strong>Water Supply:</strong> Reliance on untreated groundwater has contributed to a high incidence of waterborne diseases, including diarrhea and hepatitis. Establishing safe drinking water systems with proper boiling, storage, and hygiene practices is therefore essential to reduce health risks.</li>
<li><strong>Sanitation:</strong> With only 13 existing household toilets and 2 school toilets, and widespread open defecation, there is a critical need to expand household and cluster-based sanitation facilities using flood-resilient latrine designs.</li>
<li><strong>Roads &amp; Drainage:</strong> Paved internal roads are less susceptible to erosion during rainfall, while the absence of a proper drainage network exacerbates flooding and waterlogging issues. Improved lined drains and raised access routes are necessary for both mobility and flood mitigation.</li>
<li><strong>Health &amp; Hygiene:</strong> Limited healthcare access, high disease burden, and weak hygiene behaviors underscore the importance of sustained hygiene promotion and awareness campaigns in Sindhi language, focusing on safe water use, sanitation, and handwashing practices.</li>
<li><strong>Community Institutions:</strong> The community exhibits strong collective action and willingness to contribute financially or through labor for maintenance works. This readiness provides a solid foundation for forming a <strong>Village WASH Committee (VWC)</strong> to oversee operation, maintenance, and grievance redressal mechanisms.</li>
</ul>`,
  },
];

const ENV_FIELDS = [
  {
    title: "7.2 Environmental Integration — Overview",
    html: `<p>The rural villages in Sindh province can be characterized by inadequate accessibility due to poor road connectivity, lack of basic amenities, and infrastructure deficiency. Village Bahadur Khaskheli does not have adequate road connectivity from the main road, which impedes communities from moving forward in mainstream development endeavors at the provincial level.</p>
<p>The village is surrounded by agricultural farmland with apparent environmental and social threats. The low-lying depressions are filled with wastewater that is a potential environmental hazard. Due to heavy rainfall, the village experiences waterlogging that increases salinity of the soil. Village Bahadur Khaskheli is an example of such environmental and social upheaval with poor air quality, water contamination, and degradation of soil fertility.</p>`,
  },
  {
    title: "7.2.1 Environmental Risk & Climate Change",
    html: `<p>Wastewater accumulation is one of the major environmental risks in Bahadur Khaskheli. The risk of flooding is high during monsoon season and the risk of water runoff from the western side has increased in the last 15–20 years. The village has no environmentally sensitive areas like protected areas, forests, or natural sensitive zones. However, sensitive receptors are present in the form of a nearby watercourse, mosque, and school within the village.</p>
<p>There are a limited number of trees and no afforestation drive has ever been launched. The village is situated in the humid climate region with extreme hot temperatures in May and June, and coldest months in December and January. No climate change awareness program has ever been conducted in the village, and communities have limited knowledge and preparedness for disasters.</p>`,
  },
  {
    title: "7.2.2 WASH Intervention",
    html: `<p>The dependence on groundwater sources could pose a higher risk to the health of the village population if wastewater seeps into the ground and pollutes the underground aquifers and wells. The main source of drinking water for Bahadur Khaskheli population is groundwater hand pumps both inside and outside the village. There is no sanitation system and villagers commonly practice open defecation in designated places.</p>
<p>There is no stormwater drainage system in the village, which is the main reason for water accumulation in low-lying depressions. According to village respondents, some hygiene practices are observed such as handwashing with soap and personal hygiene. However, there is very limited awareness about clean environment, drinking water quality, and food hygiene.</p>`,
  },
  {
    title: "7.2.2.1 Water Supply System",
    html: `<p>The proposed design of the water supply system ensures national and international safeguard standards, with water sources installed at a minimum 30–50 metres distance from the sewerage system. At present, 9 hand pumps (out of a total of 32) are providing drinking water to villagers, and the proposed design will install <strong>11 new lead hand pumps</strong> with bore locations in the agricultural field.</p>
<p>All existing hand pumps will be retrofitted with raised platforms. All platforms will be connected to the sewerage network. The location of hand pumps will ensure water quality for drinking, as there is a higher risk of underground aquifer contamination due to wastewater accumulation in depressions. Water quality tests will be conducted to ensure water is safe for drinking.</p>`,
  },
  {
    title: "7.2.2.2 Sanitation System",
    html: `<p>The proposed design of the sanitation system will ensure safeguard standards primarily based on water and soil pollution prevention. All 56 households and a Masjid will have new toilets with sewerage connections. A network of sewerage system will be installed to receive wastewater from toilets and hand pumps.</p>
<p>The toilets are constructed with a technical design that facilitates maintenance and collection of waste. The design slope will ensure smooth flow of wastewater with designated manholes connected to a network of pipes. A <strong>treatment plant</strong> will also be installed to ensure compliance with environmental standards of wastewater disposal.</p>`,
  },
  {
    title: "7.2.2.3 Hygiene Promotion",
    html: `<p>Like other villages in the area, there is no hygiene awareness nor a system for solid and liquid waste disposal. Water collection containers and drinking vessels are not properly cleaned. Hygiene promotion is an essential component of the project, as safe drinking water collected and consumed in contaminated containers will not ensure health and safety of villagers.</p>
<p>Similarly, food-related hygiene is critical, as food cooked in contaminated pots can easily transmit pathogens. The proposed design of hygiene promotion will give due emphasis on hygiene awareness and <strong>behavioral change sessions</strong> with communities, covering safe water use, sanitation practices, and personal hygiene.</p>`,
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function SocialEnvironmental({ village }) {
  return (
    <div className="pdd-content-container">
      <h1>7. Social &amp; Environmental Integration</h1>
      {/* <h2>Village: {village}</h2> */}

      <h2>7.1 Social Integration</h2>
      {SOCIAL_FIELDS.map((f) => (
        <FieldBlock key={f.title} title={f.title} html={f.html} />
      ))}

      <h2>7.2 Environmental Integration</h2>
      {ENV_FIELDS.map((f) => (
        <FieldBlock key={f.title} title={f.title} html={f.html} />
      ))}
    </div>
  );
}