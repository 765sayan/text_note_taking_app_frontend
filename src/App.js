import FrontPage from "./pages/FrontPage";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/">
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
