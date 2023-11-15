function truncate(num: number, places: number) {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}

export function PercentCellRenderer2Decimals(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value * 100, 2);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRenderer2DecimalsFixed(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: string = truncate(props.value * 100, 4).toFixed(2);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRenderer2DecimalsFixed0Blank(props: any) {
  if (typeof props.value === "number") {
    if (props.value == 0) {
      return "";
    }
    const truncated_val: string = truncate(props.value * 100, 4).toFixed(2);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRendererNoDecimalsFixed(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: string = truncate(props.value * 100, 4).toFixed(0);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRenderer2DecimalsFixedOrBlank(props: any) {
  if (typeof props.value === "number") {
    if (props.value == 0) {
      return "";
    }
    const truncated_val: string = truncate(props.value * 100, 4).toFixed(2);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRenderer3Decimals(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value * 100, 3);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRenderer4Decimals(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value * 100, 4);
    return `${truncated_val}%`;
  }
  return props.value;
}

export function PercentCellRenderer1Decimal(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value * 100, 1);
    return `${truncated_val * 100}%`;
  }
  return props.value;
}

export function prettyFormatIntegers(props: any) {
  if (typeof props.value === "number") {
    return props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return props.value;
}
export function prettyFormatFloatNoDecimals(props: any) {
  if (typeof props.value === "number") {
    const val = truncate(props.value, 0);
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return props.value;
}

export function FloatCellRenderer2Decimal(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value, 2);
    return truncated_val;
  }
  return props.value;
}

export function FloatCellRenderer2Decimal0Blank(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value, 2);
    if (truncated_val == 0) {
      return "";
    }
    return truncated_val;
  }
  return props.value;
}

export function FloatCellRenderer4Decimal(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: number = truncate(props.value, 4);
    return truncated_val;
  }
  return props.value;
}

export function FloatCellRenderer8DecimalsPadded(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: string = truncate(props.value, 8).toFixed(8);
    return truncated_val;
  }
  return props.value;
}

export function FloatCellRenderer4DecimalsPadded(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: string = truncate(props.value, 4).toFixed(4);
    return truncated_val;
  }
  return props.value;
}

export function FloatCellRenderer2DecimalsPadded(props: any) {
  if (typeof props.value === "number") {
    const truncated_val: string = truncate(props.value, 2).toFixed(2);
    return truncated_val;
  }
  return props.value;
}

export function prettyFormatFloat2Decimals(props: any) {
  if (typeof props.value === "number") {
    const val = truncate(props.value, 2);
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return props.value;
}

export function prettyFormatFloat4Decimals(props: any) {
  if (typeof props.value === "number") {
    const val = truncate(props.value, 4);
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return props.value;
}

export function yyyymmddToyyyymmWithDashes(props: any) {
  if (typeof props.value === "string") {
    return props.value.substring(0, 7);
  }
  return props.value;
}

export function blankWikiCommentCellStyle(params: any): string | undefined {
  if (
    params.value === null ||
    params.value === undefined ||
    params.value.toString().trim() === ""
  ) {
    // if the params.data has a property called recommendationType and the value is not "Subscribe" then return the style
    if (
      params.data.recommendationType &&
      params.data.recommendationType !== "Subscribe"
    ) {
      return "wiki-no-comment-cell-style";
    }
  }
}
