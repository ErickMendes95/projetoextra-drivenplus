import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";
import GlobalStyle from "./GlobalStyle"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubPlans from "./pages/SubPlans";
import Subscription from "./pages/Subscription";

function App() {

  const [token, setToken] = useState()
  const [userData, setUserData] = useState()
  const [userMembership, setUserMembership] = useState()
  const [userCardInfo, setUserCardInfo] = useState()
  
  return (
    <UserContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
          <Route path="/subscriptions" element={<SubPlans/>}/>
          <Route path="/subscriptions/:idPlan" element={<Subscription/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
        <GlobalStyle/>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
