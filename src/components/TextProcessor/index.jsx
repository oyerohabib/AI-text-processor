import { useState } from "react";
import { toast } from "react-toastify";
import { InputSection } from "./InputSection";
import { OutputSection } from "./OutputSection";
import { SummaryControls } from "./SummaryControls";
import { TranslationControls } from "./TranslationControls";
import { useLanguageDetection } from "../../hooks/useLanguageDetection";
import { useTranslation } from "../../hooks/useTranslation";
import { useSummarization } from "../../hooks/useSummarization";

export const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [summaryType, setSummaryType] = useState("key-points");
  const [summaryFormat, setSummaryFormat] = useState("markdown");
  const [summaryLength, setSummaryLength] = useState("medium");

  const { detectedLanguage, detectLanguage } = useLanguageDetection();
  const { isTranslating, translatedText, translate } = useTranslation();
  const { isSummarizing, summarize } = useSummarization();

  const handleSend = async () => {
    if (!inputText) return toast.error("Field cannot be empty");

    try {
      if (outputText !== inputText) {
        setOutputText(inputText);
      }
      await detectLanguage(inputText);
      setInputText("");
    } catch (error) {
      toast.error("Error processing text: " + error.message);
    }
  };

  const handleSummarize = async () => {
    const summary = await summarize(outputText, {
      sharedContext: "This is a general text summarization.",
      type: summaryType,
      format: summaryFormat,
      length: summaryLength,
    });

    if (summary) {
      setOutputText(summary);
    }
  };

  const handleTranslate = () => {
    translate(outputText, detectedLanguage, selectedLanguage);
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">AI Text Processor</h1>

      <OutputSection
        outputText={outputText}
        detectedLanguage={detectedLanguage}
        translatedText={translatedText}
      >
        {outputText.length > 150 && (
          <SummaryControls
            summaryType={summaryType}
            summaryFormat={summaryFormat}
            summaryLength={summaryLength}
            onTypeChange={setSummaryType}
            onFormatChange={setSummaryFormat}
            onLengthChange={setSummaryLength}
            onSummarize={handleSummarize}
            isSummarizing={isSummarizing}
          />
        )}
        <TranslationControls
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          onTranslate={handleTranslate}
          isTranslating={isTranslating}
        />
      </OutputSection>

      <InputSection
        inputText={inputText}
        onInputChange={setInputText}
        onSend={handleSend}
      />
    </div>
  );
};
