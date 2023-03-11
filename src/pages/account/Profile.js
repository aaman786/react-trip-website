import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../userContext";
import Places from "../place/Places";
import AccountNav from "./AccountNav";

const Profile = () => {
  const [toHome, setToHome] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !toHome) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setToHome("/");
  }

  if (toHome) {
    return <Navigate to={toHome} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            {" "}
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default Profile;
