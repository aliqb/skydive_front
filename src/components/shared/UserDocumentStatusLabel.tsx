import React from "react";
import { DocumnetStatus } from "../../models/account.models";

interface UserDocumentStatusLabelProps {
  status: (typeof DocumnetStatus)[keyof typeof DocumnetStatus];
  display: string;
  isUploading: boolean;
}

const UserDocumentStatusLabel: React.FC<UserDocumentStatusLabelProps> = (
  props
) => {
  const statusColorMap = new Map([
    [DocumnetStatus.NOT_LOADED, "text-gray-700"],
    ["", "text-gray-700"],
    [DocumnetStatus.PENDING, "text-orange-500"],
    [DocumnetStatus.CONFIRMED, "text-green-500"],
    [DocumnetStatus.EXPIRED, "text-red-600"],
  ]);
  return (
    <p
      className={`${statusColorMap.get(props.status || "")} ${
        props.isUploading &&
        (props.status === DocumnetStatus.NOT_LOADED || props.status === "")
          ? "opacity-70"
          : ""
      } font-semibold`}
    >
      {props.isUploading ? "آماده ارسال" : props.display || "بارگذاری نشده"}
    </p>
  );
};

export default UserDocumentStatusLabel;
