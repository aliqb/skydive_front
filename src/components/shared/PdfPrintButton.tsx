import useAPi from "../../hooks/useApi";
import { printResponse } from "../../utils/shared";
import SDSpinner from "./Spinner";

interface PdfPrintButtonProps {
  pdfUrl: string;
  fileName: string;
  method?: string;
  body?: string[];
}

const PdfPrintButton: React.FC<PdfPrintButtonProps> = ({
  pdfUrl,
  fileName,
  method = "get",
  body,
}) => {
  const { sendRequest, isPending } = useAPi<string[], Blob>();
  const handlePrint = () => {
    sendRequest(
      {
        url: pdfUrl,
        responseType: "blob",
        method: method,
        data: body,
      },
      (response) => {
        printResponse(fileName, response);
      }
    );
  };

  return (
    <>
    {
      isPending && <SDSpinner color="blue"></SDSpinner>
    }
      {!isPending && (
        <button onClick={handlePrint} className="text-cyan-600">
          چاپ
        </button>
      )}
    </>
  );
};

export default PdfPrintButton;
