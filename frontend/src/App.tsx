import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/useAuth";

function App() {
  return <>
    <UserProvider>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </UserProvider>
  </>;
}

export default App;
