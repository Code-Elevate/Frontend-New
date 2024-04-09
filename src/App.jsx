import React from "react";
import "./App.css";
import SignInPage from "./pages/signinPage/signinPage";
import SignUpPage from "./pages/signupPage/signupPage";
import ContestRegistration from './pages/contestRegistrationPage/contestRegistrationPage';
import ContestDetails from './pages/contestDetailsPage/contestDetailsPage';
import ProfilePage from "./pages/profilePage/profilePage";
import ExplorePage from "./pages/explorePage/explorePage";
import HostContestPage from "./pages/hostContestPage/hostContestPage";
import AddProblemsPage from "./pages/addProblemsPage/addProblemsPage";
import ProblemsPage from "./pages/problemsPage/problemsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ExplorePage/>} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/contestRegistration/:contestId" element={<ContestRegistration/>}/>
      <Route path="/contest/:contestId" element={<ContestDetails />}/>
      <Route  path="/profilePage" exact element={<ProfilePage />}/>
      <Route  path="/hostContest" exact element={<HostContestPage />}/>
      <Route  path="/addProblems/:contestId" exact element={<AddProblemsPage />}/>
      <Route path="/problems/:contestId" element={<ProblemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
