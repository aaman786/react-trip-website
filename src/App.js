import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import Register from "./pages/register/Register";
import { UserContextProvider } from "./userContext";
import Profile from "./pages/account/Profile";
import Places from "./pages/place/Places";
import AddPlaceForm from "./pages/place/AddPlaceForm";
import IndexPage from "./pages/index/IndexPage";
import ViewPlace from "./pages/view-places/ViewPlace";
import Bookings from "./pages/bookings/Bookings";
import ViewBooking from "./pages/bookings/ViewBooking";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<AddPlaceForm />} />
          <Route path="/account/places/:id" element={<AddPlaceForm />} />
          <Route path="/place/:id" element={<ViewPlace />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/booking/:id" element={<ViewBooking />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
