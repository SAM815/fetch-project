import { useNavigate } from "react-router-dom";
import logo from "../Assets/fetch_logo.png";


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-md flex items-center px-4 " style={{ height: "64px",backgroundColor: '#FFB749' }}>
      <img
        src= {logo}
        alt="dog"
        className="h-10 w-auto ml-4 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Navbar;
