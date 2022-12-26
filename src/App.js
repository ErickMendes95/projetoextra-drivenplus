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

  const userDataLS = JSON.parse(localStorage.getItem("userData"));
  const userMembershipLS = JSON.parse(localStorage.getItem("userMembership"));
  const userCardInfoLS = JSON.parse(localStorage.getItem("userCardInfo"));

  const [userData, setUserData] = useState(userDataLS);
  const [userMembership, setUserMembership] = useState(userMembershipLS);
  const [userCardInfo, setUserCardInfo] = useState(userCardInfoLS);
  
  function GetUserData(userData){
    setUserData(JSON.parse(userData))
    localStorage.setItem("userData", userData)
  }

  function GetUserMembership(userMembership){
    setUserMembership(JSON.parse(userMembership))
    localStorage.setItem("userMembership", userMembership)
  }
  
  function GetUserCardInfo(userCardInfo){
    setUserCardInfo(JSON.parse(userCardInfo))
    localStorage.setItem("userCardInfo", userCardInfo)
  }
  return (
    <UserContext.Provider value={{userData, userMembership, userCardInfo, GetUserData, GetUserMembership, GetUserCardInfo}}>
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
