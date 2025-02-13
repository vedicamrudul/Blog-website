import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from 'react-router-dom'

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

if(!loading){
  return(
    <>
    <div><div>
      <Header/>
      <main>
        <Outlet />
        
      </main>
      <Footer/>
      </div></div>
    </>
  )
}
else{
  return (
    <div>loading</div>
  )
}
}

export default App;
