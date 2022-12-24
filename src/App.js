import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubPlans from "./pages/SubPlans";
import Subscription from "./pages/Subscription";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/subscriptions" element={<SubPlans/>}/>
        <Route path="/subscriptions/:idPlan" element={<Subscription/>}/>
      </Routes>
      <GlobalStyle/>
    </BrowserRouter>
  )
}

export default App;
