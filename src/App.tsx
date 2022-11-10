import ToastifyConfig from "drivers/toastify/ToastifyConfig";
import RootLayout from "layout/RootLayout";
import ReactQueryConfig from "./drivers/react-query/ReactQueryConfig";
import { Router } from "./drivers/router/router";

function App() {
  return (
    <ReactQueryConfig>
      <ToastifyConfig>
        <RootLayout>
          <Router />
        </RootLayout>
      </ToastifyConfig>
    </ReactQueryConfig>
  );
}

export default App;
