interface AdminEventFieldProp {
  title: string;
  value: string;
}

const AdminEventField: React.FC<AdminEventFieldProp> = ({ title, value }) => {
  return (
    <div className="flex gap-6">
      <p className="font-bold">{title}</p>
      <p>{value}</p>
    </div>
  );
};


export default AdminEventField