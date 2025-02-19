import { useState } from "react";
import { toast } from "react-toastify";
import { REVERSE_LANGUAGE_MAP } from "../constants/languageOptions";

export const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  const translate = async (text, sourceLang, targetLang) => {
    if (sourceLang === targetLang) {
      toast.error(
        "Language pair are the same. You can only translate between different languages."
      );
      return;
    }

    setIsTranslating(true);
    try {
      if (!("ai" in self && "translator" in self.ai)) {
        throw new Error("Translator API is not supported in this browser.");
      }

      const translatorCapabilities = await self.ai.translator.capabilities();
      const sourceCode = REVERSE_LANGUAGE_MAP[sourceLang];
      const targetCode = targetLang;

      const isAvailable = translatorCapabilities.languagePairAvailable(
        sourceCode,
        targetCode
      );

      if (isAvailable === "no") {
        throw new Error(
          "Translation not possible for the selected language pair."
        );
      }

      const translator = await self.ai.translator.create({
        sourceLanguage: sourceCode,
        targetLanguage: targetCode,
      });

      if (isAvailable === "after-download") {
        toast.info(
          "Language pair not currently available, I am getting it ready. Kindly wait for a few seconds."
        );
        await translator.ready;
      }

      const translation = await translator.translate(text);
      setTranslatedText(translation);
      toast.success("Translation completed successfully.");
    } catch (error) {
      toast.error("Error translating text: " + error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  return { isTranslating, translatedText, translate };
};
