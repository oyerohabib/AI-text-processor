// components/TextProcessor/InputSection.jsx
import { FaPaperPlane, FaTimes } from "react-icons/fa";

export const InputSection = ({ inputText, onInputChange, onSend, onClear }) => (
  <div className="mt-4">
    <div className="relative">
      <textarea
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        className="w-full h-36 border border-gray-300 rounded p-2 bg-gray-100 resize-none mb-4"
        placeholder="Type your text here..."
        required
      />
    </div>
    <div className="flex space-x-2">
      <button
        onClick={onSend}
        className="flex-1 bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 flex items-center justify-center transition cursor-pointer"
      >
        Send <FaPaperPlane className="ml-2" />
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Reset
      </button>
    </div>
  </div>
);
