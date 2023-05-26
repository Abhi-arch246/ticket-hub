import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Protect from "./assets/Protect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <Protect>
              {" "}
              <Home />
            </Protect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
