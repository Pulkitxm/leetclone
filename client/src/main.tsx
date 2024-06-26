import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </CookiesProvider>
);