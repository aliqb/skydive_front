import useAPi from "../../hooks/useApi";
import printJS from "print-js";

interface PdfPrintButtonProps {
  pdfUrl: string;
  fileName: string;
}

const PdfPrintButton: React.FC<PdfPrintButtonProps> = ({
  pdfUrl,
  fileName,
}) => {
  const { sendRequest } = useAPi<null, Blob>();
  const handlePrint = () => {
    sendRequest(
      {
        url: pdfUrl,
        responseType: "blob",
      },
      (response) => {
        console.log(response);
        const url = URL.createObjectURL(response);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.pdf`;
        // link.click();

        printJS({ printable: url, documentTitle: 'test.pdf' });
        URL.revokeObjectURL(url);
      }
    );
  };

  return (
    <>
      <button onClick={handlePrint} className="text-cyan-600">
        چاپ
      </button>
    </>
  );
};

export default PdfPrintButton;
