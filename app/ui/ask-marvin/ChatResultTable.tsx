import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { CellValueNumberColorClassDecider } from "@/app/lib/aggridCellFunctions";
import {
  FloatCellRenderer4DecimalsPadded,
  prettyFormatFloat2Decimals,
  prettyFormatIntegers,
} from "@/app/lib/aggridFormatters";
import {
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TextField from "@mui/material/TextField";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type RowData = {
  id: string;
  [key: string]: any;
};

const heightOfRow = 22;

function ChatResultTable(tableData: any) {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<RowData[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    // Generate column definitions based on the data
    const enfColDefs = generateColumnDefs(tableData["tableData"]);
    if (enfColDefs) {
      setColumnDefs(enfColDefs);
    }
    // console.log(tableData["tableData"]);
    // console.log(enfColDefs);
    setRowData(tableData["tableData"]);
    const length = tableData["tableData"].length;
    const heightNeeded = length * heightOfRow + 50;
    setTableHeight(Math.min(heightNeeded, 250));
  }, []);

  const defaultColDef = useMemo<ColDef<any>>(() => {
    return {
      resizable: true,
      editable: true,
      sortable: true,
      enableCellChangeFlash: true,
    };
  }, []);

  const generateColumnDefs = (data: RowData[]): ColDef[] => {
    if (data && data.length > 0) {
      const firstRow = data.find((row) => row !== null && row !== undefined);

      if (firstRow) {
        const columns: ColDef[] = Object.keys(firstRow).map((key) => {
          if (key === "name" || key === "bbgTicker") {
            return {
              field: key,
              headerName: key,
              minWidth: 180,
              flex: 1,
            };
          } else if (
            key === "quantity" ||
            key.toLowerCase().includes("notional")
          ) {
            return {
              field: key,
              headerName: key,
              minWidth: 100,
              flex: 1,
              cellRenderer: prettyFormatIntegers,
              cellClass: CellValueNumberColorClassDecider,
            };
          } else if (key.toLowerCase().includes("price")) {
            return {
              field: key,
              headerName: key,
              minWidth: 100,
              flex: 1,
              cellRenderer: FloatCellRenderer4DecimalsPadded,
              cellClass: CellValueNumberColorClassDecider,
            };
          } else if (
            key.toLowerCase().includes("gross") ||
            key.toLowerCase().includes("net") ||
            key.toLowerCase().includes("Fee") ||
            key.toLowerCase().includes("rate") ||
            key.toLowerCase().includes("comm")
          ) {
            return {
              field: key,
              headerName: key,
              minWidth: 100,
              flex: 1,
              cellRenderer: prettyFormatFloat2Decimals,
              cellClass: CellValueNumberColorClassDecider,
            };
          } else {
            return { field: key, headerName: key, minWidth: 100, flex: 1 };
          }
        });
        return columns;
      }
    }
    return [];
  };

  // filter broker recommendation table by using text field
  const onFilterTextFieldChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (
        document.getElementById(
          "filter-broker-recommendation-table",
        ) as HTMLInputElement
      ).value,
    );
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  return (
    <div className="mb-4">
      <div className="items-left flex flex-wrap content-start">
        <div className="hidden font-bold sm:block">
          <TextField
            id="filter-broker-recommendation-table"
            variant="standard"
            placeholder="Filter"
            onInput={onFilterTextFieldChanged}
            InputProps={{
              className: "dark:text-slate-300",
              style: {
                fontSize: "0.9em",
                paddingBottom: "3px",
                marginBottom: "10px",
                width: "200px",
              },
              startAdornment: (
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
              ),
            }}
          />
        </div>
        <div className="grow"></div>
        <div className="m-0 hidden justify-end self-end p-0 sm:block md:flex md:items-end">
          <button
            onClick={onBtExport}
            className="my-2 flex items-center rounded border-2 px-2 text-sm hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <DocumentArrowDownIcon className="mr-2 h-4 w-4" />
            Export to CSV
          </button>
        </div>
      </div>
      {isMounted && rowData && (
        <div
          className={`${
            theme == "light" ? "ag-theme-balham" : "ag-theme-balham-dark"
          }`}
          style={{
            flex: "1",
            boxSizing: "border-box",
            height: `calc(${tableHeight}px)`,
          }}
        >
          <AgGridReact
            rowHeight={heightOfRow}
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rowData}
          ></AgGridReact>
        </div>
      )}
    </div>
  );
}

export default ChatResultTable;
