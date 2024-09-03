import { Route, Routes } from "react-router-dom";

// import About from "./pages/About";
import Home from "./pages/Home";
// import ToolDetails from "./pages/ToolDetails";

function App() {
  return (
    <Routes>
      <Route path="/cardano_matrix/" element={<Home />} />

      {/* <Route path="/about" element={<About />} />

      <Route path="/tool/:id" element={<ToolDetails />} /> */}
    </Routes>
  );
}

export default App;
