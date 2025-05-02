import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./pages/Dashboard";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./pages/Home";
import Quizes from "./pages/Quizes";
import Quiz from "./pages/Quiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AuthWrapper />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="quizes" element={<Quizes />} />
            <Route path="quizes/quiz/:id" element={<Quiz />} /> {/* Updated this line */}
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;