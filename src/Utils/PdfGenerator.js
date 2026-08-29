
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportInvoiceToPDF = async () => {
  const element = document.getElementById("invoice-preview");

  if (!element) {
    console.error("Invoice preview not found");
    return;
  }

  try {
    console.log("Generating PDF...");

    // Clone invoice so original UI is not affected
    const clone = element.cloneNode(true);

    // Position clone outside the visible screen
    clone.style.position = "absolute";
    clone.style.left = "-99999px";
    clone.style.top = "0";
    clone.style.width = `${element.offsetWidth}px`;
    clone.style.backgroundColor = "#ffffff";
    clone.style.color = "#111827";

    // Add clone to document
    document.body.appendChild(clone);

    /*
      Convert unsupported CSS colors to safe colors.
      html2canvas can fail when Tailwind/browser returns oklch().
    */
    const allElements = clone.querySelectorAll("*");

    allElements.forEach((el) => {
      const styles = window.getComputedStyle(el);

      // Background
      if (
        styles.backgroundColor &&
        styles.backgroundColor.includes("oklch")
      ) {
        el.style.backgroundColor = "#ffffff";
      }

      // Text color
      if (
        styles.color &&
        styles.color.includes("oklch")
      ) {
        el.style.color = "#111827";
      }

      // Border color
      if (
        styles.borderColor &&
        styles.borderColor.includes("oklch")
      ) {
        el.style.borderColor = "#e5e7eb";
      }

      // Box shadow
      if (
        styles.boxShadow &&
        styles.boxShadow.includes("oklch")
      ) {
        el.style.boxShadow = "none";
      }
    });

    // Capture invoice
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Remove clone
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    const margin = 10;
    const contentWidth = pdfWidth - margin * 2;

    const imageHeight =
      (canvas.height * contentWidth) / canvas.width;

    let heightLeft = imageHeight;
    let position = margin;

    // First page
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      position,
      contentWidth,
      imageHeight
    );

    heightLeft -= pdfHeight - margin * 2;

    // Additional pages
    while (heightLeft > 0) {
      position =
        margin -
        (imageHeight - heightLeft);

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        contentWidth,
        imageHeight
      );

      heightLeft -= pdfHeight - margin * 2;
    }

    // Download
    pdf.save(
      `${element.querySelector("h1")?.textContent?.trim() || "invoice"}.pdf`
    );

    console.log("PDF generated successfully!");

  } catch (error) {
    console.error("PDF generation error:", error);
  }
};

