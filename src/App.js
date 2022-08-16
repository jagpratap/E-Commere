import { StrictMode } from "react";

import "./global.scss";

import Router from "./routes";
import UserProvider from "./context/UserContext";

const App = () => (
  <StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </StrictMode>
);

export default App;
