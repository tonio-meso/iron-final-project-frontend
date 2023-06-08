import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./../src/pages/Homepage";
import Myaccount from "./pages/Myaccount";
import About from "./pages/About";
import Selectionform from "./pages/Selectionform";
import Mycollection from "./pages/Mycollection";
import Recommendations from "./pages/MovieSuggestion";
import AuthForm from "./components/Authform";
import Swipepage from "./pages/SwipePage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {" "}
        {/* we wrapp all the component with the layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/myaccount" element={<Myaccount />}></Route>

          <Route path="/auth">
            <Route path="login" element={<AuthForm mode="Log in" />} />
            <Route path="signup" element={<AuthForm mode="Signup" />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/selectionform" element={<Selectionform />}></Route>
            <Route path="/swipepage" element={<Swipepage />}></Route>
            <Route path="/mycollection" element={<Mycollection />}></Route>
            <Route
              path="/moviesuggestion"
              element={<Recommendations />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
