// import Body from "./components/Body";
// import Home from "./components/Home";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ScheduleList from "./components/schedule/ScheduleList";
// import RegistrationForm from "./components/userRegistrationForm/Registration";
// import GameCard from "./components/Games/Game";
// import ParticipantsPage from "./components/ParticipantsPage";
// import About from "./components/About";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Parent layout */}
//         <Route path="/" element={<Body />}>
//         <Route index element={<Home />} />
//         <Route path ="/schedule" element={<ScheduleList/>}/>
//         <Route path ="/register" element={<RegistrationForm/>}/>
//         <Route path ="/games" element={<GameCard/>}/>
//         <Route path ="/about" element={<About/>}/>
//         <Route path ="/participants" element={<ParticipantsPage/>}/>

//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import React, { Suspense, lazy } from "react";
import Body from "./components/Body";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Lazy-loaded components
const ScheduleList = lazy(() => import("./components/schedule/ScheduleList"));
const RegistrationForm = lazy(() => import("./components/userRegistrationForm/Registration"));
const GameCard = lazy(() => import("./components/Games/Game"));
const ParticipantsPage = lazy(() => import("./components/ParticipantsPage"));
const About = lazy(() => import("./components/About"));

function App() {
  return (
    <Router>
      {/* Fallback shows while components load */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />

            {/* Lazy loaded routes */}
            <Route path="/schedule" element={<ScheduleList />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/games" element={<GameCard />} />
            <Route path="/about" element={<About />} />
            <Route path="/participants" element={<ParticipantsPage />} />
            

          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
