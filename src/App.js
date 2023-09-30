import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Confirmation from "./Confirmation";
import Home from "./Home";
import Poster from "./Poster";
import "./index.css";
import NotFound from "./404";
import EditRound from "./EditRound";
import Round from "./Round";
import Refresh from './Refresh';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./Navbar";
import "./index.css";

import PrivateRoute from "./PrivateRoute";


function App() {

  function getApiUrl(path) {
    return `${process.env.REACT_APP_API_URL}${path}`;
  }
  

  return (
    <>
    <div className="bg-gradient-to-r from-ffbd00 to-[#eca600]">
    <title > SRPC </title>
    <div>
      <Navbar />
    </div>
    <div className="container mx-auto px-4 bg-gradient-to-r from-ffbd00 to-[#eca600]">
    <Refresh />
    </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/confirmation" element={<Confirmation/>} />
        <Route exact path="/poster" element={<PrivateRoute permissionCheckUrl={null}><Poster /></PrivateRoute> } />
        <Route path="/round/1/:posterId" element={<PrivateRoute permissionCheckUrl={getApiUrl("/precheckposter/round1_pre_check/:id")} ><Round round={1}/></PrivateRoute>} />
        <Route path="/round/2/:posterId" element={<PrivateRoute permissionCheckUrl={getApiUrl("/precheckposter/round2_pre_check/:id")} ><Round round={2}/></PrivateRoute>} />
        <Route path="/editscore/1/:posterId" element={<PrivateRoute permissionCheckUrl={getApiUrl("/precheckposter/round1_pre_check_edit/:id")}><EditRound round={1} /></PrivateRoute>}/>
        <Route path="/editscore/2/:posterId" element={<PrivateRoute permissionCheckUrl={getApiUrl("/precheckposter/round2_pre_check_edit/:id")}><EditRound round={2} /></PrivateRoute>}/>
        {/* display 404 page if no route matches */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>
    </>
  );
}

export default App;
