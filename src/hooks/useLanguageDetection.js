import { useState } from "react";
import { toast } from "react-toastify";
import { LANGUAGE_MAP } from "../constants/languageOptions";

export const useLanguageDetection = () => {
  const [detectedLanguage, setDetectedLanguage] = useState("");

  const detectLanguage = async (text) => {
    if (!text) return;

    try {
      if (!("ai" in self && "languageDetector" in self.ai)) {
        throw new Error(
          "Language Detector API is not supported in this browser."
        );
      }

      const capabilities = await self.ai.languageDetector.capabilities();
      const { available } = capabilities;

      if (available === "no") {
        throw new Error("Language Detector API is not usable.");
      }

      const detector = await self.ai.languageDetector.create();
      if (available === "after-download") {
        await detector.ready;
      }

      const languages = await detector.detect(text);
      const detectedLangCode = languages[0].detectedLanguage;
      const detectedLangFull =
        LANGUAGE_MAP[detectedLangCode] || detectedLangCode;

      setDetectedLanguage(detectedLangFull);
      return detectedLangFull;
    } catch (error) {
      toast.error("Error detecting language: " + error.message);
      return null;
    }
  };

  return { detectedLanguage, detectLanguage };
};
