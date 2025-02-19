import { LANGUAGE_MAP } from "../../constants/languageOptions";

export const TranslationControls = ({
  selectedLanguage,
  onLanguageChange,
  onTranslate,
  isTranslating,
}) => (
  <div className="flex space-x-2">
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
    >
      {Object.entries(LANGUAGE_MAP).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
    <button
      onClick={onTranslate}
      className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 transition"
      disabled={isTranslating}
    >
      {isTranslating ? "Translating..." : "Translate"}
    </button>
  </div>
);
