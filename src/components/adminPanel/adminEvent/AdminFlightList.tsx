import SDButton from "../../shared/Button";
import AddFlightModal from "./AddFlightModal";
import AdminFlightItem from "./AdminFlightItem";
import { useState } from "react";

const AdminFlighList: React.FC<{ dayId: string; date: string }> = ({
  dayId,
  date,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  function startAddFlight() {
    setShowAddModal(true);
  }

  function onCloseAddModa() {
    setShowAddModal(false);
  }
  return (
    <>
      {showAddModal && (
        <AddFlightModal
          showModal={showAddModal}
          dayId={dayId}
          date={date}
          onCloseModal={onCloseAddModa}
        />
      )}
      <div>
        <div className="flex gap-2 ">
          <SDButton color="success" className="px-8" onClick={startAddFlight}>
            افزودن
          </SDButton>
          <SDButton color="failure" className="px-8">
            حذف
          </SDButton>
        </div>
        <div className="mt-8">
          <AdminFlightItem withHeader={true} />
          <AdminFlightItem />
          <AdminFlightItem />
          <AdminFlightItem />
          <AdminFlightItem />
          <AdminFlightItem />
        </div>
      </div>
    </>
  );
};

export default AdminFlighList;
