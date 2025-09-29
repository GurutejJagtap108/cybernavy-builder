import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;
const rootKey = "__CYBERNAVY_REACT_ROOT__";
if (!(window as any)[rootKey]) {
  (window as any)[rootKey] = createRoot(container);
}
(window as any)[rootKey].render(<App />);

if (import.meta.hot) {
  import.meta.hot.accept();
}
