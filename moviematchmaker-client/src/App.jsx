import { Routes, Route } from "react-router-dom";
import Homepage from "./../src/pages/Homepage";
import SwipePage from "./pages/SwipePage";
import MovieSuggestion from "./pages/MovieSuggestion";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/swipepage" element={<SwipePage />}></Route>
        <Route path="/moviesuggestion" element={<MovieSuggestion />}></Route>
      </Routes>
    </>
  );
}

export default App;
