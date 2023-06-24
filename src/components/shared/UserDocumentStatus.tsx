import React from "react";
import { DocumnetStatus } from "../../models/account.models";

interface UserDocumentStatusProps {
  status:  typeof DocumnetStatus[keyof typeof DocumnetStatus];
  display: string;
}

const UserDocumentStatus: React.FC<UserDocumentStatusProps> = (props) => {
  const statusColorMap = new Map([
    [DocumnetStatus.NOT_LOADED, "text-blue-700"],
    ["", "text-blue-700"],
    [DocumnetStatus.PENDING, "text-orange-500"],
    [DocumnetStatus.CONFIRMED, "text-green-500"],
    [DocumnetStatus.EXPIRED, "text-red-600"],
  ]);
  return (
    <p
      className={`${statusColorMap.get(
        props.status || ""
      )} font-semibold`}
    >
      {props.display || "بارگذاری نشده"}
    </p>
  );
};

export default UserDocumentStatus;