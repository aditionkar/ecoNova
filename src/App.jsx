import TotalCarbonFootprint from "./calculators/TotalCarbonFootprint";
import CarbonCredits from "./components/CarbonCredits";
import Goal from "./components/Goal";
//import Goal from "./components/Goal";
//import AllCharts from "./components/AllCharts";
//import Footer from "./components/Footer";
//import Nav from "./components/Nav";
import Navbar from "./components/Navbar";
import AnalyzePage from "./pages/AnalyzePage";
import AtHomeCalcPage from "./pages/AtHomeCalcPage";
import CreditsPage from "./pages/CreditsPage";
import PrivTransCalcPage from "./pages/PrivTransCalcPage";
//import Credits from "./pages/Credits";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicTransCalcPage from "./pages/PublicTransCalcPage";
import FoodCalcPage from "./pages/FoodCalcPage";
import FlightCalcPage from "./pages/FlightCalcPage";
import { FootprintProvider } from "./contexts/FootprintContext";
import CalculatorsNavPage from "./pages/CalculatorsNavPage";



export default function App() {
  return (
    <FootprintProvider>
      <div className="bg-white">

        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/Credits" element={<CreditsPage />}/>
            <Route path="/Analyze" element={<AnalyzePage />}/>
            <Route path="/AtHome" element={<AtHomeCalcPage />}/>
            <Route path="/PrivTrans" element={<PrivTransCalcPage />}/>
            <Route path="/PublicTrans" element={<PublicTransCalcPage />}/>
            <Route path="/Food" element={<FoodCalcPage />}/>
            <Route path="/Flight" element={<FlightCalcPage />}/>
            <Route path="/Calculate" element={<CalculatorsNavPage />}/>

</Routes>
</BrowserRouter>

</div>
    </FootprintProvider>
    
  ) 
}

//http://localhost:8080/api/footprints/all