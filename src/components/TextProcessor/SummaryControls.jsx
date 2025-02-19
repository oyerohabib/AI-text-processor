import {
  SUMMARY_LENGTHS,
  SUMMARY_FORMATS,
  SUMMARY_TYPES,
} from "../../constants/summaryOptions";

export const SummaryControls = ({
  summaryType,
  summaryFormat,
  summaryLength,
  onTypeChange,
  onFormatChange,
  onLengthChange,
  onSummarize,
  isSummarizing,
}) => (
  <div className="flex space-x-2 mb-4">
    <select
      value={summaryType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
    >
      {SUMMARY_TYPES.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <select
      value={summaryFormat}
      onChange={(e) => onFormatChange(e.target.value)}
      className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
    >
      {SUMMARY_FORMATS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <select
      value={summaryLength}
      onChange={(e) => onLengthChange(e.target.value)}
      className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
    >
      {SUMMARY_LENGTHS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <button
      onClick={onSummarize}
      className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 transition"
      disabled={isSummarizing}
    >
      {isSummarizing ? "Summarizing..." : "Summarize"}
    </button>
  </div>
);
