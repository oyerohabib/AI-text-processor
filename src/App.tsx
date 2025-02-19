import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSend = async () => {
    setOutputText(inputText);
    const language = await detectLanguage(inputText);
    setDetectedLanguage(language);
    setInputText("");
  };

  const handleSummarize = async () => {
    const summary = await summarizeText(outputText);
    setOutputText(summary);
  };

  const handleTranslate = async () => {
    const translation = await translateText(outputText, selectedLanguage);
    setTranslatedText(translation);
  };

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto my-20 p-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex-1 border border-gray-300 rounded-md p-4 mb-4 bg-white overflow-y-auto max-h-80">
          <div className="mb-4">
            <p className="text-gray-800 text-lg font-semibold">{outputText}</p>
            <p className="italic text-gray-500">
              Detected Language: {detectedLanguage}
            </p>
          </div>
          {outputText.length > 150 && (
            <button
              onClick={handleSummarize}
              className="bg-gray-300 text-gray-800 rounded px-4 py-2 mt-2 hover:bg-gray-400"
            >
              Summarize
            </button>
          )}
          <div className="flex mt-4 space-x-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
            >
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="ru">Russian</option>
              <option value="tr">Turkish</option>
              <option value="fr">French</option>
            </select>
            <button
              onClick={handleTranslate}
              className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400"
            >
              Translate
            </button>
          </div>
          {translatedText && (
            <p className="mt-4 font-bold text-gray-800">{translatedText}</p>
          )}
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-28 border border-gray-300 rounded p-2 bg-gray-100 resize-none mb-4"
          placeholder="Type your text here..."
        />
        <button
          onClick={handleSend}
          className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 w-full flex items-center justify-center"
        >
          Send <FaPaperPlane className="ml-2" />
        </button>
      </div>
    </>
  );
}

// Mock API functions
const detectLanguage = async (text: string) => {
  console.log(text);
  return "English";
};

const summarizeText = async (text: string) => {
  return text.substring(0, 150) + "... (summary)";
};

const translateText = async (text: string, lang: string) => {
  console.log(text);
  return `Translated text in ${lang}`;
};

export default App;
