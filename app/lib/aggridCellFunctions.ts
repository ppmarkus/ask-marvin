export function CellValueNumberColorClassDecider(props: any) {
  return +props.value < 0 ? "negative-number-color" : "positive-number-color";
}
