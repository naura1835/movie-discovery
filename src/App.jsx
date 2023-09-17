import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/home.component";
import DetailsPage from "./pages/details/details.component";

import "./App.scss";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/movies/:movieId" element={<DetailsPage />} />
      </Routes>
    </main>
  );
}

export default App;
