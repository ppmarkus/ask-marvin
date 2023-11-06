import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FloatCellRenderer4DecimalsPadded, prettyFormatFloat2Decimals, prettyFormatIntegers } from "@/app/lib/aggridFormatters";
import { CellValueNumberColorClassDecider } from "@/app/lib/aggridCellFunctions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

  useEffect(() => {
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
          } else if (key === "quantity" || key.toLowerCase().includes("notional")) {
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
          } else if (key.toLowerCase().includes("gross") || key.toLowerCase().includes("net") || key.toLowerCase().includes("Fee") || key.toLowerCase().includes("rate") || key.toLowerCase().includes("comm")) {
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
    gridRef.current!.api.setQuickFilter((document.getElementById("filter-broker-recommendation-table") as HTMLInputElement).value);
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          alignItems: "left",
        }}
      >
        <TextField
          id="filter-broker-recommendation-table"
          variant="standard"
          placeholder="Filter"
          onInput={onFilterTextFieldChanged}
          InputProps={{
            style: {
              fontSize: "0.9em",
              paddingBottom: "3px",
              marginBottom: "10px",
              width: "300px",
            },
            startAdornment: <MagnifyingGlassIcon style={{ opacity: 0.3 }} />,
          }}
        />
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "flex-end",
            alignItems: "right",
            padding: 0,
            margin: 0,
            alignSelf: "flex-end",
          }}
        >
          <button onClick={onBtExport} style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Export to Excel
          </button>
        </Box>
      </Box>
      <div style={{ flex: "1", boxSizing: "border-box", height: `calc(${tableHeight}px)` }} className="ag-theme-balham">
        <AgGridReact rowHeight={heightOfRow} ref={gridRef} columnDefs={columnDefs} defaultColDef={defaultColDef} rowData={rowData}></AgGridReact>
      </div>
    </Box>
  );
}

export default ChatResultTable;
