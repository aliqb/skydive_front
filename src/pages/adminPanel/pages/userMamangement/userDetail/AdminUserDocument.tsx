import AdminUserDocumentItem from "../../../../../components/adminPanel/userManagement/AdminUserDocumentItem";

const AdminUserDocument: React.FC = () => {
  return (
    <div className="p-10 flex justify-around flex-wrap ">
        <AdminUserDocumentItem withDate={false} />
        <AdminUserDocumentItem />
        <AdminUserDocumentItem />
        <AdminUserDocumentItem />
      {/* <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div> */}
    </div>
  );
};

export default AdminUserDocument;
