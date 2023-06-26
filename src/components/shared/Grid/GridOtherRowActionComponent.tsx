/* eslint-disable @typescript-eslint/no-explicit-any */
import SDTooltip from "../Tooltip";
import { GridRow, GridRowOtherAction } from "./grid.types";

function GridRowOtherActionComponent<T>(props: {
  action: GridRowOtherAction<T>;
  row: GridRow<T>;
}) {
  let mustShow = true;
  let musDisable = false;
  if (props.action.showField !== undefined) {
    let field = props.action.showField;
    const invert = field.includes("!");
    if (invert) {
      field = field.slice(1);
      mustShow = !(props.row.data as any)[props.action.showField];
    } else {
      mustShow = !!(props.row.data as any)[props.action.showField];
    }
  }

  if (props.action.disableField !== undefined) {
    let field = props.action.disableField;
    const invert = field.includes("!");
    if (invert) {
      field = field.slice(1);
      musDisable = (props.row.data as any)[props.action.disableField];
    } else {
      musDisable = !(props.row.data as any)[props.action.disableField];
    }
  }
  return mustShow ? (
    <SDTooltip
      content={props.action.descriptions}
      trigger="hover"
      placement="bottom"
    >
      <button
        onClick={(event) => {
          event.stopPropagation();
          props.action.onClick(props.row.data);
        }}
        disabled={musDisable}
        className="disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {props.action.icon}
      </button>
    </SDTooltip>
  ) : (
    <></>
  );
}

export default GridRowOtherActionComponent;
