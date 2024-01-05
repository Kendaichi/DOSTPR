import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/log-in" element={<Login />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
