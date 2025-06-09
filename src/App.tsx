// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



// function App() {
//   return (
    

//     <div>
//      <h1>Hello!</h1>
//     </div>a
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}



export default App;