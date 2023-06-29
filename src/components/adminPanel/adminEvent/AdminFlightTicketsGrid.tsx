import { AdminTicketModel } from "../../../models/skyDiveEvents.models";
import Grid from "../../shared/Grid/Grid";
import { useState } from "react";
import { ColDef } from "../../shared/Grid/grid.types";
import EditTicketModal from "./EditTicketModal";

interface AdminFlightTicketsGridProps {
  tickets: AdminTicketModel[];
  onChange: () => void;
}

const AdminFlightTicketsGrid: React.FC<AdminFlightTicketsGridProps> = ({
  tickets,
  onChange,
}) => {
  const [colDefs] = useState<ColDef<AdminTicketModel>[]>([
    {
      field: "ticketNumber",
      headerName: "شماره بلیت",
    },
    {
      field: "ticketType",
      headerName: "نوع بلیت",
    },
    {
      field: "reservable",
      headerName: "قابل رزرو",
      cellRenderer: (item) => (item.reservable ? "هست" : "نیست"),
    },
    {
      field: "status",
      headerName: "وضعیت",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<AdminTicketModel | null>(null);

  function onEdit(ticket: AdminTicketModel) {
    setCurrentRow(ticket);
    setShowEditModal(true);
  }

  function onCloseModal(submitted: boolean) {
    setShowEditModal(false);
    setCurrentRow(null);
    if (submitted) {
      onChange();
    }
  }

  return (
    <>
      {currentRow && (
        <EditTicketModal
          showModal={showEditModal}
          onCloseModal={onCloseModal}
          {...currentRow}
        />
      )}

      <Grid colDefs={colDefs} data={tickets} onEditRow={onEdit}></Grid>
    </>
  );
};

export default AdminFlightTicketsGrid;
