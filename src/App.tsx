import RootLayout from "layout/RootLayout";
import ReactQueryConfig from "./drivers/react-query/ReactQueryConfig";
import { Router } from "./drivers/router/router";

function App() {
  return (
    <ReactQueryConfig>
      <RootLayout>
        <Router />
      </RootLayout>
    </ReactQueryConfig>
  );
}

export default App;
