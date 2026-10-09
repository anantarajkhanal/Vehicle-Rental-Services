
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Govid from "./pages/Govid";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import BookAVehicle from "./pages/BookAVehicle";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route
          path="/govid"
          element={
            <ProtectedRoute>
              <Govid />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-vehicle"
          element={
            <ProtectedRoute>
              <BookAVehicle />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;