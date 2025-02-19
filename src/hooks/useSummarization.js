import { useState } from "react";
import { toast } from "react-toastify";

export const useSummarization = () => {
  const [isSummarizing, setIsSummarizing] = useState(false);

  const summarize = async (text, options) => {
    if (!text) {
      toast.error("No text available to summarize.");
      return null;
    }

    setIsSummarizing(true);
    try {
      if (!("ai" in self && "summarizer" in self.ai)) {
        throw new Error("Summarizer API is not supported in this browser.");
      }

      const capabilities = await self.ai.summarizer.capabilities();
      const { available } = capabilities;

      if (available === "no") {
        throw new Error("Summarizer API is not usable.");
      }

      const summarizer = await self.ai.summarizer.create(options);
      if (available === "after-download") {
        await summarizer.ready;
      }

      const stream = await summarizer.summarizeStreaming(text);
      let summaryResult = "";

      for await (const segment of stream) {
        summaryResult += segment;
      }

      toast.success("Summary generated successfully.");
      return summaryResult;
    } catch (error) {
      toast.error("Error summarizing text: " + error.message);
      return null;
    } finally {
      setIsSummarizing(false);
    }
  };

  return { isSummarizing, summarize };
};
