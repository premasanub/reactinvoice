import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportInvoiceToPDF = () => {
  const input = document.getElementById('invoice-template'); 
  if (!input) return;

  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const width = imgWidth * ratio;
    const height = imgHeight * ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save("invoice.pdf");
  });
};