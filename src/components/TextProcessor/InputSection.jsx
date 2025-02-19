import { FaPaperPlane } from "react-icons/fa";

export const InputSection = ({ inputText, onInputChange, onSend }) => (
  <div className="mt-4">
    <textarea
      value={inputText}
      onChange={(e) => onInputChange(e.target.value)}
      className="w-full h-28 border border-gray-300 rounded p-2 bg-gray-100 resize-none mb-4"
      placeholder="Type your text here..."
      required
    />
    <button
      onClick={onSend}
      className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 w-full flex items-center justify-center transition"
    >
      Send <FaPaperPlane className="ml-2" />
    </button>
  </div>
);
