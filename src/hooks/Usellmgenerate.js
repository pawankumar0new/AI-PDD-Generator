/**
 * useLLMGenerate
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared hook used by App.jsx to manage LLM generation state for ALL sections.
 *
 * State is lifted to App so content persists across tab switches.
 *
 * Usage (in App.jsx):
 *   const { content, loading, errors, generateField, setFieldContent } = useLLMGenerate();
 *
 * Then pass these four values down as props to every section page.
 *
 * Each section page calls:
 *   generateField(villageName, fieldId, apiPayload)
 *
 * Where apiPayload is ONE item matching the Postman body format:
 *   { section_no, section_name, sub_section_no, sub_sub_section_no }
 */

import { useState, useCallback } from "react";

const API_URL = "http://192.168.110.87:8000/api/v1/village/analyze";




/**
 * Converts a plain-text blob from the API into HTML.
 * - Splits on blank lines → each chunk becomes a <p>
 * - Trims whitespace
 */


function plainTextToHtml(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .split(/\n\s*\n/)           // split on blank lines
    .map((chunk) => chunk.trim().replace(/\n/g, " ")) // collapse internal newlines
    .filter(Boolean)
    .map((chunk) => `<p>${chunk}</p>`)
    .join("");
}

export function useLLMGenerate() {
  /**
   * content: { [villageKey]: { [fieldId]: htmlString } }
   * Keyed by village name so switching village doesn't bleed content.
   */
  const [content, setContent] = useState({});

  /**
   * loading: { [fieldId]: boolean }
   * Global across villages — only one field generates at a time per fieldId.
   */
  const [loading, setLoading] = useState({});

  /**
   * errors: { [fieldId]: string | null }
   */
  const [errors, setErrors] = useState({});

  /**
   * generateField
   * ───────────────────────────────────────────────────────────────────────────
   * @param {string} villageName  — e.g. "Gaji Khan Panhwar"
   * @param {string} fieldId      — e.g. "admin_location"
   * @param {object} apiPayload   — single section descriptor:
   *   { section_no, section_name, sub_section_no, sub_sub_section_no }
   */
  const generateField = useCallback(async (villageName, fieldId, villageId, apiPayload) => {
    if (!villageName || !fieldId || !apiPayload || !villageId) return;

    setLoading((prev) => ({ ...prev, [fieldId]: true }));
    setErrors((prev) => ({ ...prev, [fieldId]: null }));

    const body = {
      village_id: villageId,
      village_name: villageName,
      data: [apiPayload],
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const rawBody = await res.text();

      let rawText = rawBody;
      try {
        const json = JSON.parse(rawBody);
        if (typeof json === "string") {
          rawText = json;
        } else if (typeof json?.result === "string") {
          rawText = json.result;
        } else if (typeof json?.text === "string") {
          rawText = json.text;
        } else if (typeof json?.data === "string") {
          rawText = json.data;
        } else if (typeof json?.response === "string") {
          rawText = json.response;
        } else if (typeof json?.content === "string") {
          rawText = json.content;
        } else {
          rawText = JSON.stringify(json, null, 2);
        }
      } catch {
        // Response wasn't JSON — it's a raw plain-text blob, use it as-is
        rawText = rawBody;
      }

      const html = plainTextToHtml(rawText);

      setContent((prev) => ({
        ...prev,
        [villageName]: {
          ...(prev[villageName] || {}),
          [fieldId]: html,
        },
      }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [fieldId]: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, [fieldId]: false }));
    }
  }, []);

  /**
   * setFieldContent
   * ───────────────────────────────────────────────────────────────────────────
   * Called by LLMFieldBlock when the user edits the TipTap content manually.
   * Keeps the persisted content in sync with edits.
   *
   * @param {string} villageName
   * @param {string} fieldId
   * @param {string} html
   */
  const setFieldContent = useCallback((villageName, fieldId, html) => {
    setContent((prev) => ({
      ...prev,
      [villageName]: {
        ...(prev[villageName] || {}),
        [fieldId]: html,
      },
    }));
  }, []);

  return { content, loading, errors, generateField, setFieldContent };
}