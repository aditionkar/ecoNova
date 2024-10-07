import TotalCarbonFootprint from "./calculators/TotalCarbonFootprint";
import CarbonCredits from "./components/CarbonCredits";
import Goal from "./components/Goal";
//import AllCharts from "./components/AllCharts";
//import Footer from "./components/Footer";
//import Nav from "./components/Nav";
import Navbar from "./components/Navbar";
//import AnalyzePage from "./pages/AnalyzePage";
//import CreditsPage from "./pages/CreditsPage";
//import Credits from "./pages/Credits";
import HomePage from "./pages/HomePage";



export default function App() {
  return (
    <>
     
     
     <div className="bg-white">

     <Navbar/>
     <TotalCarbonFootprint/>
     <CarbonCredits/>
     <Goal/>
     

    <HomePage/>

   


     </div>

    </>
  ) 
}

//http://localhost:8080/api/footprints/all