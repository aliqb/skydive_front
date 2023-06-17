import { FormEvent, useState } from "react";
import useAPi from "../../hooks/useApi";
import SDSpinner from "./Spinner";

interface LabeledFileInputProps {
  accepFiles?: string;
  title: string;
  field?: string;
  url?: string;
  onUpload: (id: string) => void;
  onRemove?: ()=>void;
}
const LabeledFileInput: React.FC<LabeledFileInputProps> = ({
  accepFiles = "",
  title,
  field = "file",
  url = "/file",
  onUpload,
  onRemove
}) => {
  const { sendRequest, errors, isPending } = useAPi<FormData, string>();
  const [uploadedFile, setUploadedFile] = useState<File|null>();
  function onChange(event: FormEvent) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || !files.length) {
      return;
    }
    const file: File = files[0];
    console.log(file);
    const formData = new FormData();
    formData.append(field, file);
    sendRequest(
      {
        url: url,
        data: formData,
        method: "post",
      },
      (response) => {
        setUploadedFile(file)
        onUpload(response)
      }
    );
  }

  function resetUploadedFile(){
    setUploadedFile(null);
    onRemove && onRemove();
  }

  return (
    <div>
      {!(isPending || errors || uploadedFile) && (
        <label
          htmlFor={title}
          className="text-blue-700 font-semibold cursor-pointer"
        >
          بارگذاری فایل
        </label>
      )}
      {isPending && <SDSpinner className="h-8 w-8"></SDSpinner>}
      {errors && (
        <p className="text-red-600 font-semibold">
          {errors.message || "خطا در بارگذاری"}
        </p>
      )}
      {uploadedFile && (
        <span>
          <button className="text-red-600 ml-2 -mb-6 translate-y-[2px]" onClick={resetUploadedFile}>X</button>
          <a
            className="text-blue-700"
            href={URL.createObjectURL(uploadedFile)}
            download={uploadedFile.name}
          >
            {uploadedFile.name}
          </a>
        </span>
      )}
      <input
        type="file"
        id={title}
        className="hidden"
        accept={accepFiles}
        onChange={onChange}
      />
    </div>
  );
};

export default LabeledFileInput;
