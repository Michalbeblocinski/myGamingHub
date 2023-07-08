import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { LandingPage, MyProfilePage, ProfilePage } from "./pages";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import {
  landingPagePath,
  loginPath,
  myProfilePath,
} from "./components/navigation/paths";
import { SignForm } from "./components";
import { selectUser } from "./store/authSlice";

const App: React.FC = () => {
  const isAuth = useSelector(selectUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={loginPath()} element={<SignForm />} />
          <Route
            path={landingPagePath()}
            element={isAuth ? <LandingPage /> : <Navigate to={loginPath()} />}
          />
          <Route />
          <Route
            path={myProfilePath()}
            element={isAuth ? <MyProfilePage /> : <Navigate to={loginPath()} />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
