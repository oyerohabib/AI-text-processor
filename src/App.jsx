import { TextProcessor } from "./components/TextProcessor";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <TextProcessor />
    </ErrorBoundary>
  );
}

export default App;

// Previous Coupled Implementation
// import { useState } from "react";
// import { FaPaperPlane, FaLanguage, FaRegFileAlt } from "react-icons/fa";
// import { toast } from "react-toastify";
// import ErrorBoundary from "./components/ErrorBoundary";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [outputText, setOutputText] = useState("");
//   const [detectedLanguage, setDetectedLanguage] = useState("");
//   const [translatedText, setTranslatedText] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const [isTranslating, setIsTranslating] = useState(false);
//   const [isSummarizing, setIsSummarizing] = useState(false);

//   // New state variables for summarization options
//   const [summaryType, setSummaryType] = useState("key-points");
//   const [summaryFormat, setSummaryFormat] = useState("markdown");
//   const [summaryLength, setSummaryLength] = useState("medium");

//   const languageMap = {
//     en: "English",
//     pt: "Portuguese",
//     es: "Spanish",
//     ru: "Russian",
//     tr: "Turkish",
//     fr: "French",
//     ar: "Arabic",
//     ht: "Haitian Creole",
//     zh: "Chinese",
//     de: "German",
//     it: "Italian",
//     nl: "Dutch",
//     ja: "Japanese",
//     ko: "Korean",
//     hi: "Hindi",
//     bn: "Bengali",
//     ur: "Urdu",
//     ta: "Tamil",
//     te: "Telugu",
//     vi: "Vietnamese",
//     pl: "Polish",
//     uk: "Ukrainian",
//     ro: "Romanian",
//     el: "Greek",
//     he: "Hebrew",
//     hu: "Hungarian",
//     sv: "Swedish",
//     th: "Thai",
//     fi: "Finnish",
//     da: "Danish",
//     no: "Norwegian",
//     cs: "Czech",
//     id: "Indonesian",
//     ms: "Malay",
//     fa: "Persian",
//     sr: "Serbian",
//     bg: "Bulgarian",
//     hr: "Croatian",
//     sk: "Slovak",
//     lt: "Lithuanian",
//     sl: "Slovenian",
//     et: "Estonian",
//     lv: "Latvian",
//   };

//   // Reverse the map to get short form from full form
//   const reverseLanguageMap = Object.fromEntries(
//     Object.entries(languageMap).map(([key, value]) => [value, key])
//   );

//   const handleSend = async () => {
//     if (!inputText) return toast.error("Field cannot be empty");
//     try {
//       // Only set outputText if it's not already set
//       if (outputText !== inputText) {
//         setOutputText(inputText);
//       }

//       const languages = await detectLanguage(inputText);
//       const detectedLangCode = languages[0].detectedLanguage;
//       const detectedLangFull =
//         languageMap[detectedLangCode] || detectedLangCode;
//       setDetectedLanguage(detectedLangFull);

//       // Clear input text after setting output
//       setInputText("");
//     } catch (error) {
//       toast.error("Error detecting language: " + error.message);
//     }
//   };

//   const detectLanguage = async (text) => {
//     if ("ai" in self && "languageDetector" in self.ai) {
//       const capabilities = await self.ai.languageDetector.capabilities();

//       const { available } = capabilities; // Destructure the available property

//       if (available === "no") {
//         throw new Error("Language Detector API is not usable.");
//       } else if (available === "readily") {
//         const detector = await self.ai.languageDetector.create();
//         return await detector.detect(text);
//       } else if (available === "after-download") {
//         const detector = await self.ai.languageDetector.create({
//           monitor(m) {
//             m.addEventListener("downloadprogress", (e) => {
//               console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
//             });
//           },
//         });
//         await detector.ready;
//         return await detector.detect(text);
//       }
//     } else {
//       throw new Error(
//         "Language Detector API is not supported in this browser."
//       );
//     }
//   };

//   const handleSummarize = async () => {
//     if (!outputText) return toast.error("No text available to summarize.");
//     setIsSummarizing(true);
//     setOutputText("Summarizing your text, please wait...");

//     try {
//       if ("ai" in self && "summarizer" in self.ai) {
//         const capabilities = await self.ai.summarizer.capabilities();
//         const { available } = capabilities;

//         if (available === "no") {
//           throw new Error("Summarizer API is not usable.");
//         }

//         const options = {
//           sharedContext: "This is a general text summarization.",
//           type: summaryType, // Use selected type
//           format: summaryFormat, // Use selected format
//           length: summaryLength, // Use selected length
//         };

//         let summarizer;
//         if (available === "readily") {
//           summarizer = await self.ai.summarizer.create(options);
//         } else if (available === "after-download") {
//           summarizer = await self.ai.summarizer.create(options);
//           await summarizer.ready; // Wait for the summarizer to be ready
//         }

//         // Implement streaming summarization
//         const stream = await summarizer.summarizeStreaming(outputText);
//         let summaryResult = ""; // Initialize a variable to hold the summary

//         for await (const segment of stream) {
//           const newContent = segment; // Get the new content directly
//           console.log(newContent);
//           summaryResult += newContent; // Append new content to the summary result
//         }

//         setOutputText(summaryResult); // Set the output text to the new summary
//         toast.success("Summary generated successfully.");
//       } else {
//         throw new Error("Summarizer API is not supported in this browser.");
//       }
//     } catch (error) {
//       toast.error("Error summarizing text: " + error.message);
//     } finally {
//       setIsSummarizing(false);
//     }
//   };

//   const handleTranslate = async () => {
//     setIsTranslating(true);
//     try {
//       if ("ai" in self && "translator" in self.ai) {
//         const translatorCapabilities = await self.ai.translator.capabilities();

//         // Check if the language pair is available
//         const sourceLang = reverseLanguageMap[detectedLanguage]; // earlier detected language after user pressed send button
//         const targetLang = selectedLanguage; // selected language to translate to

//         if (sourceLang === targetLang)
//           return toast.error(
//             "Language pair are the same. You can only translate between different languages."
//           );

//         const isAvailable = translatorCapabilities.languagePairAvailable(
//           sourceLang,
//           targetLang
//         );

//         if (isAvailable === "no") {
//           throw new Error(
//             "Translation not possible for the selected language pair."
//           );
//         } else if (isAvailable === "after-download") {
//           toast.info(
//             "Language pair not currently available, I am getting it ready. Kindly wait for a few seconds."
//           );
//           const translator = await self.ai.translator.create({
//             sourceLanguage: sourceLang,
//             targetLanguage: targetLang,
//             monitor(m) {
//               m.addEventListener("downloadprogress", (e) => {
//                 console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
//               });
//             },
//           });
//           await translator.ready; // Wait for the translator to be ready
//           const translation = await translator.translate(outputText);
//           setTranslatedText(translation);
//           toast.success(
//             "Thank you for waiting, translation has now been completed."
//           );
//         } else if (isAvailable === "readily") {
//           const translator = await self.ai.translator.create({
//             sourceLanguage: sourceLang,
//             targetLanguage: targetLang,
//           });
//           const translation = await translator.translate(outputText);
//           setTranslatedText(translation);
//         }
//       } else {
//         throw new Error("Translator API is not supported in this browser.");
//       }
//     } catch (error) {
//       toast.error("Error translating text: " + error.message);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className="flex flex-col max-w-3xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-4">
//           AI Text Processor
//         </h1>
//         <div className="flex-1 border border-gray-300 rounded-md p-4 mb-4 bg-gray-50 overflow-y-auto">
//           <div className="mb-4">
//             <p className="text-gray-800 text-lg font-semibold">
//               <FaRegFileAlt className="inline mr-2" />
//               {outputText}
//             </p>
//             <p className="italic mt-2 text-gray-500">
//               <FaLanguage className="inline mr-2" />
//               Detected Language: {detectedLanguage}
//             </p>
//           </div>
//           {outputText.length > 150 && (
//             <div className="flex space-x-2 mb-4">
//               <select
//                 value={summaryType}
//                 onChange={(e) => setSummaryType(e.target.value)}
//                 className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
//               >
//                 <option value="key-points">Key Points</option>
//                 <option value="tl;dr">TL;DR</option>
//                 <option value="teaser">Teaser</option>
//                 <option value="headline">Headline</option>
//               </select>
//               <select
//                 value={summaryFormat}
//                 onChange={(e) => setSummaryFormat(e.target.value)}
//                 className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
//               >
//                 <option value="markdown">Markdown</option>
//                 <option value="plain-text">Plain Text</option>
//               </select>
//               <select
//                 value={summaryLength}
//                 onChange={(e) => setSummaryLength(e.target.value)}
//                 className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
//               >
//                 <option value="short">Short</option>
//                 <option value="medium">Medium</option>
//                 <option value="long">Long</option>
//               </select>
//               <button
//                 onClick={handleSummarize}
//                 className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 transition"
//                 disabled={isSummarizing}
//               >
//                 {isSummarizing ? "Summarizing..." : "Summarize"}
//               </button>
//             </div>
//           )}
//           <div className="flex mt-4 space-x-2">
//             <select
//               value={selectedLanguage}
//               onChange={(e) => setSelectedLanguage(e.target.value)}
//               className="border border-gray-300 rounded p-2 bg-gray-100 flex-1"
//             >
//               <option value="en">English</option>
//               <option value="pt">Portuguese</option>
//               <option value="es">Spanish</option>
//               <option value="ru">Russian</option>
//               <option value="tr">Turkish</option>
//               <option value="fr">French</option>
//               <option value="ar">Arabic</option>
//               <option value="ko">Korean</option>
//             </select>
//             <button
//               onClick={handleTranslate}
//               className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 transition"
//               disabled={isTranslating}
//             >
//               {isTranslating ? "Translating..." : "Translate"}
//             </button>
//           </div>
//           {translatedText && (
//             <p className="mt-4 font-bold text-gray-800">{translatedText}</p>
//           )}
//         </div>

//         <textarea
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           className="w-full h-28 border border-gray-300 rounded p-2 bg-gray-100 resize-none mb-4"
//           placeholder="Type your text here..."
//           required
//         />
//         <button
//           onClick={handleSend}
//           className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-900 w-full flex items-center justify-center transition"
//         >
//           Send <FaPaperPlane className="ml-2" />
//         </button>
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;
