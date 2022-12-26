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

  const userDataLS = localStorage.getItem("userData")
  const userMembershipLS = localStorage.getItem("userMembership")
  const userCardInfoLS = localStorage.getItem("userCardInfo")

  const [userData, setUserData] = useState(userDataLS)
  const [userMembership, setUserMembership] = useState(userMembershipLS)
  const [userCardInfo, setUserCardInfo] = useState(userCardInfoLS)
  
  function getUserData(userData){
    setUserData(userData)
    localStorage.setItem("userData", userData)
  }

  function getUserMembership(userMembership){
    setUserMembership(userMembership)
    localStorage.setItem("userMembership", userMembership)
  }
  
  function getUserCardInfo(userCardInfo){
    setUserCardInfo(userCardInfo)
    localStorage.setItem("userCardInfo", userCardInfo)
  }
  return (
    <UserContext.Provider value={{getUserData, getUserMembership, getUserCardInfo}}>
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
