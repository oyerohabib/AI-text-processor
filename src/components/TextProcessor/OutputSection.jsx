import { FaRegFileAlt, FaLanguage } from "react-icons/fa";

export const OutputSection = ({
  outputText,
  detectedLanguage,
  translatedText,
  children,
}) => (
  <div className="flex-1 border border-gray-300 rounded-md p-4 mb-4 bg-gray-50 overflow-y-auto">
    <div className="mb-4">
      <p className="text-gray-800 text-lg font-semibold">
        <FaRegFileAlt className="inline mr-2" />
        {outputText}
      </p>
      <p className="italic mt-2 text-gray-500">
        <FaLanguage className="inline mr-2" />
        Detected Language: {detectedLanguage}
      </p>
    </div>
    {children}
    {translatedText && (
      <p className="mt-4 font-bold text-gray-800">{translatedText}</p>
    )}
  </div>
);
