import { useState } from "react";
import { toast } from "react-toastify";
import { InputSection } from "./InputSection";
import { OutputSection } from "./OutputSection";
import { SummaryControls } from "./SummaryControls";
import { TranslationControls } from "./TranslationControls";
import { useLanguageDetection } from "../../hooks/useLanguageDetection";
import { useTranslation } from "../../hooks/useTranslation";
import { useSummarization } from "../../hooks/useSummarization";
import { FaInfoCircle } from "react-icons/fa";

export const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [originalTextLength, setOriginalTextLength] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [summaryType, setSummaryType] = useState("key-points");
  const [summaryFormat, setSummaryFormat] = useState("markdown");
  const [summaryLength, setSummaryLength] = useState("medium");

  const { detectedLanguage, detectLanguage } = useLanguageDetection();
  const { isTranslating, translatedText, translate, setTranslatedText } =
    useTranslation();
  const { isSummarizing, summarize } = useSummarization();

  const handleSend = async () => {
    if (!inputText) return toast.error("Field cannot be empty");

    try {
      if (outputText !== inputText) {
        setOutputText(inputText);
        setOriginalTextLength(inputText.length);
      }
      await detectLanguage(inputText);
      setInputText("");
    } catch (error) {
      toast.error("Error processing text: " + error.message);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setTranslatedText("");
    setOriginalTextLength(0);
    detectLanguage("");
  };

  const handleSummarize = async () => {
    const originalText = outputText;
    setOutputText("Summarizing your text, please wait...");
    const summary = await summarize(outputText, {
      sharedContext: "This is a general text summarization.",
      type: summaryType,
      format: summaryFormat,
      length: summaryLength,
    });

    if (summary) {
      setOutputText(summary);
      setOriginalTextLength(summary.length);
    } else {
      setOutputText(originalText);
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
        {originalTextLength > 150 ? (
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
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <div className="flex items-center">
              <FaInfoCircle className="text-blue-500 mr-2 flex-shrink-0" />
              <p className="text-blue-700 text-sm">
                Summarization is only available for text longer than 150
                characters.
                <span className="block mt-1 text-blue-600 text-xs">
                  Current length: {outputText.length} characters
                </span>
              </p>
            </div>
          </div>
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
        onClear={handleClear}
      />
    </div>
  );
};
