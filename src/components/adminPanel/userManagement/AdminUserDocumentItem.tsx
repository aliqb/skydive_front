import { DocumentItem } from "../../../models/account.models";
import SDButton from "../../shared/Button";
import SDCard from "../../shared/Card";

interface AdminUserDocumentItemProp {
  withDate?: boolean;
}

const AdminUserDocumentItem: React.FC<AdminUserDocumentItemProp> = ({
  withDate = true,
}) => {
  return (
    <SDCard className="border w-52 flex flex-col items-center mb-6">
      <div className="border w-40 ">
        <a className="h-48 block">
          <img
            className="w-full h-full object-contain"
            src="https://fastly.picsum.photos/id/58/200/200.jpg?hmac=aol3E3KC2fpsVXlPhgxLR9-CLoUQa-kbswhZx-gYzCE"
            alt=""
          />
        </a>
        <p className="text-xs text-center pb-2">بارگذاری در 1401/02/03</p>
      </div>
      <div className="text-center mt-2 mb-3">
        <p className="font-bold text-xl mb-1">کارت ملی</p>
        <p className="font-semibold mb-1">تایید شده</p>
        {withDate && <p className="text-sm">تاریخ انقضا: 1401/02/05</p>}
      </div>
      {(
        <div className="flex justify-center gap-1 mt-auto">
          <SDButton color="success" size="xs" className="px-0 py-0">
            تأیید
          </SDButton>
          <SDButton size="xs" className="px-0 py-0" color="failure">
            عدم تأیید
          </SDButton>
        </div>
      )}
    </SDCard>
  );
};

export default AdminUserDocumentItem;
