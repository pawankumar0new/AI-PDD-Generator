import { useState, useCallback } from "react";

export function useSectionState(sections) {
  const [fieldValues, setFieldValues] = useState({});
  const [loadingFields, setLoadingFields] = useState({});
  const [sectionLoading, setSectionLoading] = useState({});

  const setValue = useCallback((fieldId, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const clearField = useCallback((fieldId) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: "" }));
  }, []);

  const clearSection = useCallback((sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    setFieldValues((prev) => {
      const next = { ...prev };
      section.fields.forEach((f) => {
        next[f.id] = "";
      });
      return next;
    });
  }, [sections]);

  const setLoading = useCallback((fieldId, val) => {
    setLoadingFields((prev) => ({ ...prev, [fieldId]: val }));
  }, []);

  const setSectionLoadingState = useCallback((sectionId, val) => {
    setSectionLoading((prev) => ({ ...prev, [sectionId]: val }));
  }, []);

  return {
    fieldValues,
    loadingFields,
    sectionLoading,
    setValue,
    clearField,
    clearSection,
    setLoading,
    setSectionLoadingState,
  };
}