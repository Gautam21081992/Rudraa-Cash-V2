import { Link, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Identity from "./pages/Identity";
import RudraaCash from "./pages/RudraaCash";
import CoreValues from "./pages/CoreValues";
import About from "./pages/About";
import VisionMission from "./pages/VisionMission";
import Retailers from "./pages/Retailers";
import Ecosystem from "./pages/Ecosystem";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";

function NotFound() {
  return <div className="not-found"><div><h1>Page not found</h1><Link className="button button--primary" to="/">Return to Rudraa Cash</Link></div></div>;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/rudraa-cash" element={<RudraaCash />} />
        <Route path="/core-values" element={<CoreValues />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/retailers" element={<Retailers />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
