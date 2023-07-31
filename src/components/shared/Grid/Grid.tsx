/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "flowbite-react";
import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from "react";
import {
  ColDef,
  ColHeader,
  ColSortChangeEvent,
  GridGetData,
  GridParams,
  GridRef,
  GridRow,
  GridRowActions,
  GridSortItem,
  SortStateType,
} from "./grid.types";
import SDTooltip from "../Tooltip";
import GridRowOtherActionComponent from "./GridOtherRowActionComponent";
import GridRowMoreActionComponent from "./GridRowMoreActionsComponent";
import ReactPaginate from "react-paginate";
import { SelectPageEvent } from "../../../models/shared.models";
import SDSpinner from "../Spinner";
import GridHeaderComponent from "./GridHeaderComponent";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GridProps<T = any> {
  data?: T[];
  getData?: GridGetData<T>;
  colDefs: ColDef<T>[];
  // fetchData?: () => void;
  onDoubleClick?: (data: T) => void;
  rowActions?: GridRowActions<T> | null;
  onEditRow?: (item: T) => void;
  onRemoveRow?: (item: T) => void;
  pageSize?: number | null;
  onPagination?: (gridParams: GridParams) => void;
  multiSortable?: boolean;
}

function MainGrid<T = any>(
  {
    data,
    colDefs,
    // fetchData,
    onDoubleClick,
    onEditRow,
    onRemoveRow,
    getData,
    rowActions = {
      edit: true,
      remove: true,
      otherActions: [],
      moreActions: [],
    },
    pageSize: defaultPageSize = 10,
    onPagination,
    multiSortable = false,
  }: GridProps<T>,
  ref: ForwardedRef<GridRef>
) {
  const [gridRows, setGridRows] = useState<GridRow<T>[]>([]);
  const [colHeaders, setColHeaders] = useState<ColHeader[]>([]);
  const [pageCount, setPageCount] = useState<number>();
  const [selectedPage, setSelectedPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(defaultPageSize);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [gridSorts, setGridSorts] = useState<GridSortItem[]>([]);
  const makeGridRows = useCallback((items: T[], colDefs: ColDef<T>[]) => {
    const rows: GridRow[] = items.map((item) => {
      return new GridRow<T>(item, colDefs);
    });

    setGridRows(rows);
  }, []);

  const loadGrid = useCallback(
    (gridParams?: GridParams) => {
      if (data) {
        makeGridRows(data, colDefs);
      } else if (getData) {
        setIsPending(true);
        const isRefreshing = gridParams === undefined;
        const params: GridParams = isRefreshing
          ? {
              pageIndex: 1,
              pageSize: pageSize === null ? 100000 : pageSize,
              sorts: [],
            }
          : gridParams;
        getData(params, (items: T[], total: number) => {
          makeGridRows(items, colDefs);
          if (pageSize) {
            setPageCount(Math.ceil(total / pageSize));
          }
          if (isRefreshing) {
            setSelectedPage(0);
          }
          setIsPending(false);
        });
      }
    },
    [data, colDefs, makeGridRows, getData, pageSize]
  );

  const onRowDobuleClisk = (item: T) => {
    console.log(item);
    if (onDoubleClick) {
      onDoubleClick(item);
    }
  };

  const handlePageClick = (event: SelectPageEvent) => {
    if (pageSize !== null) {
      setSelectedPage(event.selected);
      if (onPagination) {
        onPagination({
          pageIndex: event.selected,
          pageSize: pageSize,
          sorts: gridSorts,
        });
        return;
      }
      if (getData) {
        setIsPending(true);
        loadGrid({
          pageIndex: event.selected + 1,
          pageSize: pageSize,
          sorts: gridSorts,
        });
        // getData(
        //   { pageIndex: event.selected + 1, pageSize: pageSize },
        //   (items: T[], total: number) => {
        //     makeGridRows(items, colDefs);
        //     if (pageSize) {
        //       setPageCount(Math.ceil(total / pageSize));
        //     }
        //     setIsPending(false);
        //   }
        // );
      }
    }
  };

  const onSortChange = ({ field, sort }: ColSortChangeEvent) => {
    setGridSorts((sorts) => {
      let newSorts: GridSortItem[] = [];
      if (sort === "none") {
        newSorts = sorts.filter((item) => item.field !== field);
      } else {
        const itemIndex = sorts.findIndex((item) => item.field === field);
        if (itemIndex === -1) {
          if (multiSortable) {
            newSorts = [...sorts, { field, sort }];
          } else {
            newSorts = [{ field, sort }];
          }
        } else {
          newSorts = sorts.map((item, index) => {
            if (index === itemIndex) {
              return { field: item.field, sort: sort };
            }
            return { ...item };
          });
        }
      }
      loadGrid({
        pageIndex: selectedPage + 1,
        pageSize: pageSize === null ? 100000 : pageSize,
        sorts: newSorts,
      });
      return newSorts;
    });
  };

  useEffect(() => {
    const headers: ColHeader[] = colDefs.map((col) => {
      const sortItem = gridSorts.find((item) => item.field === col.field);
      const sort: SortStateType = sortItem ? sortItem.sort : "none";
      return {
        col: col,
        sort: sort,
      };
    });
    setColHeaders(headers);
  }, [gridSorts, colDefs]);

  useEffect(() => {
    loadGrid();
  }, [loadGrid]);

  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [defaultPageSize]);

  useImperativeHandle(ref, () => ({
    refresh() {
      loadGrid();
    },
  }));

  {
    return (
      <div>
        <div className="overflow-x-auto w-full">
          <div>
            <Table hoverable className="text-right border border-gray-300">
              <Table.Head>
                {colHeaders.map((header, index) => (
                  <Table.HeadCell key={index}>
                    <GridHeaderComponent
                      colHeader={header}
                      onSortChange={onSortChange}
                    />
                  </Table.HeadCell>
                ))}
                {rowActions && <Table.HeadCell>عملیات</Table.HeadCell>}
                {/* <Table.HeadCell>عملیات</Table.HeadCell> */}
              </Table.Head>
              <Table.Body className="divide-y">
                {isPending && (
                  <Table.Row>
                    <Table.Cell
                      colSpan={colDefs.length + Number(Boolean(rowActions))}
                    >
                      <div className="flex justify-center py-12">
                        <SDSpinner color="blue" size={28} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
                {!isPending &&
                  gridRows.map((row, index) => (
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
                            {rowActions.otherActions &&
                              rowActions.otherActions.map((action, index) => {
                                return (
                                  <GridRowOtherActionComponent
                                    key={index}
                                    action={action}
                                    row={row}
                                  />
                                );
                              })}
                            {rowActions.moreActions &&
                              rowActions.moreActions.length > 0 && (
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
        {!!pageCount && pageCount > 1 && (
          <ReactPaginate
            breakLabel="..."
            forcePage={selectedPage}
            nextLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            }
            renderOnZeroPageCount={null}
            containerClassName="flex gap-5  justify-end bg-gray-50 py-2 pl-4"
            nextClassName="flex items-center"
            previousClassName="flex items-center"
            pageLinkClassName="p-1 block hover:text-cyan-400 transition-all ease-linear duration-75"
            nextLinkClassName="p-1 block hover:text-cyan-400 transition-all ease-linear duration-75"
            previousLinkClassName="p-1 block hover:text-cyan-400 transition-all ease-linear duration-75"
            breakClassName="p-1 block hover:text-cyan-400"
            activeClassName="text-cyan-500"
            pageClassName="text-base "
          />
        )}
      </div>
    );
  }
}
const Grid = forwardRef(MainGrid) as <T = any>(
  props: GridProps<T> & { ref?: React.ForwardedRef<GridRef> }
) => ReturnType<typeof MainGrid>;
export default Grid;
