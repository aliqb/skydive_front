/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ColDef<T = any> {
  field: string;
  headerName: string;
  onClick?: (item: T) => void;
  template?: React.ReactNode | string;
  cellRenderer?: (item: T) => React.ReactNode | string;
}

export class GridRow<T = any> {
  data: T;
  //   _rowData:{
  //     [key:index] : React.ReactNode | string
  //   }
  private _cells: (React.ReactNode | string)[] = [];
  constructor(data: T, colDefs: ColDef[]) {
    this.data = data;
    colDefs.forEach((col) => {
      let cell: React.ReactNode | string;
      if (col.field) {
        cell = (this.data as any)[col.field];
      }
      if (col.template) {
        cell = col.template;
      }
      if (col.onClick) {
        cell = (
          <button
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => col.onClick!(this.data)}
            className="font-medium text-cyan-600 dark:text-cyan-500"
          >
            {cell}
          </button>
        );
      }
      if (col.cellRenderer) {
        cell = col.cellRenderer(data);
      }
      this._cells.push(cell);
    });
  }


  get cells() {
    return [...this._cells];
  }

  //   get rowData() {
  //     return this._rowData;
  //   }
}


export interface GridRowActions<T>{
    edit?: boolean,
    remove?: boolean,
    otherActions?: GridRowOtherAction<T>[],
    moreActions?:GridRowOtherAction<T>[]
}

export interface GridRowOtherAction<T>{
    icon: React.ReactNode,
    descriptions: string,
    showField?: string,
    disableField?:string,
    onClick:(item:T)=>void,
}


export interface GridParams{
  pageIndex: number;
  pageSize: number;
}

export type GridGetData<T> = (gridParams: GridParams, setRows: (items: T[],total:number) => void) => void;

export interface GridRef {
  refresh: ()=>void
}