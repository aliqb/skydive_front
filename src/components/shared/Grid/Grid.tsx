import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import CostModal from "../../adminPanel/CostModal";
import { ColDef, GridRow, GridRowActions } from "./grid.types";
import SDTooltip from "../Tooltip";
import GridRowOtherActionComponent from "./GridOtherRowActionComponent";
import GridRowMoreActionComponent from "./GridRowMoreActionsComponent";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GridProps<T = any> {
  data: T[];
  colDefs: ColDef[];
  fetchData?: () => void;
  onDoubleClick?: (data: T) => void;
  rowActions?: GridRowActions<T> | null;
  onEditRow?: (item: T) => void;
  onRemoveRow?: (item: T) => void;
}

function Grid<T>({
  data,
  colDefs: colDefs,
  fetchData,
  onDoubleClick,
  onEditRow,
  onRemoveRow,
  rowActions = { edit: true, remove: true, otherActions: [], moreActions: [] },
}: GridProps<T>) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [gridRows, setGridRows] = useState<GridRow<T>[]>([]);

  useEffect(() => {
    const rows: GridRow[] = data.map((item) => {
      return new GridRow<T>(item, colDefs);
    });
    setGridRows(rows);
  }, [data, colDefs]);

  const onRowDobuleClisk = (item: T) => {
    console.log(item);
    if (onDoubleClick) {
      onDoubleClick(item);
    }
  };

  const handleOnOpenModal = (id?: string) => {
    setSelectedRowId(id || "");
    setOpenModal(true);
  };
  const handleOnCloseModal = () => {
    setOpenModal(false);
  };
  {
    return (
      <>
        {openModal && (
          <CostModal
            showModal={openModal}
            onOpenModal={handleOnOpenModal}
            onCloseModal={handleOnCloseModal}
            fetchData={fetchData}
            rowId={selectedRowId}
          />
        )}

        <div className="overflow-x-auto w-full">
          <div>
            <Table hoverable className="text-right">
              <Table.Head>
                {colDefs.map((column, index) => (
                  <Table.HeadCell key={index}>
                    {column.headerName}
                  </Table.HeadCell>
                ))}
                {rowActions && <Table.HeadCell>عملیات</Table.HeadCell>}
                {/* <Table.HeadCell>عملیات</Table.HeadCell> */}
              </Table.Head>
              <Table.Body className="divide-y">
                {gridRows.map((row, index) => (
                  <Table.Row
                    onDoubleClick={(event) => {
                      event.stopPropagation();
                      onRowDobuleClisk(row.data);
                    }}
                    className={`${
                      onDoubleClick && "!cursor-pointer"
                    } bg-white dark:border-gray-700 dark:bg-gray-800`}
                    key={index}
                  >
                    {row.cells.map((cell, index) => (
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        key={index}
                      >
                        {cell}
                      </Table.Cell>
                    ))}
                    {rowActions && (
                      <Table.Cell>
                        <div className="flex gap-4 items-center">
                          {rowActions.edit && (
                            <SDTooltip
                              content="ویرایش"
                              trigger="hover"
                              placement="bottom"
                            >
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  onEditRow && onEditRow(row.data);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-cyan-600"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                            </SDTooltip>
                          )}
                          {rowActions.remove && (
                            <SDTooltip
                              content="حذف"
                              trigger="hover"
                              placement="bottom"
                              className="flex"
                            >
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  onRemoveRow && onRemoveRow(row.data);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-red-600"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </SDTooltip>
                          )}
                          {rowActions.otherActions.map((action, index) => {
                            return (
                              <GridRowOtherActionComponent
                                key={index}
                                action={action}
                                row={row}
                              />
                            );
                          })}
                          {rowActions.moreActions?.length && (
                            <GridRowMoreActionComponent
                              actions={rowActions.moreActions}
                              row={row}
                            />
                          )}
                        </div>
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </>
    );
  }
}
export default Grid;
