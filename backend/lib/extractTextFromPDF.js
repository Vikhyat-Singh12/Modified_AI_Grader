import PDFParser from "pdf2json";
import axios from "axios";

// Extract text from a **PDF URL**
export const extractTextFromPDFUrl = async (pdfUrl) => {
  try {
    // Download the PDF file as a buffer
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        if (!pdfData.Pages || pdfData.Pages.length === 0) {
          return reject(new Error("No pages found in the PDF."));
        }

        // Extract text safely
        const text = pdfData.Pages.map((page) =>
          page.Texts.map((text) =>
            text.R && text.R.length > 0 ? decodeURIComponent(text.R[0].T) : ""
          ).join(" ")
        ).join("\n");

        resolve(text.trim());
      });

      pdfParser.parseBuffer(buffer);
    });
  } catch (error) {
    console.error("Error extracting text from PDF URL:", error);
    return null;
  }
};
