import { AdminTicketModel } from "../../../models/skyDiveEvents.models";
import Grid from "../../shared/Grid/Grid";
import { useState } from "react";
import { ColDef } from "../../shared/Grid/grid.types";
import EditTicketModal from "./EditTicketModal";
import useConfirm from "../../../hooks/useConfirm";
import { BaseResponse } from "../../../models/shared.models";
import useAPi from "../../../hooks/useApi";
import { toast } from "react-toastify";

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
  const { sendRequest: deleteRequest } = useAPi<null, BaseResponse<null>>();
  const [ConfirmModal, confirmation] = useConfirm(
    " این بلیت حذف خواهد شد. آیا مطمئن هستید؟ ",
    "حذف کردن بلیت"
  );

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

  async function onRemove(ticket: AdminTicketModel) {
    const confirm = await confirmation();
    if (confirm) {
      deleteRequest(
        {
          method: "delete",
          url: `/SkyDiveEvents/RemoveTicket/${ticket.id}`,
        },
        (response) => {
          toast.success(response.message);
          onChange();
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    }
  }

  return (
    <>
      <ConfirmModal />
      {currentRow && (
        <EditTicketModal
          showModal={showEditModal}
          onCloseModal={onCloseModal}
          {...currentRow}
        />
      )}

      <Grid
        colDefs={colDefs}
        data={tickets}
        pageSize={null}
        onEditRow={onEdit}
        onRemoveRow={onRemove}
      ></Grid>
    </>
  );
};

export default AdminFlightTicketsGrid;
