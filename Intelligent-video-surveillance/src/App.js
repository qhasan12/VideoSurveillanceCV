import './App.css';
import OverView from './screens/DashBoard/OverView/overView';
import Profile from './screens/DashBoard/Profile/profile';
import LoginScreen from './screens/auth/loginScreen'; 
import Registration from './screens/auth/Registration';
import LiveFootage from'./screens/DashBoard/Detection/liveFootage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from 'react';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false); // Stop loading once the user is checked
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='profile' element={<Profile />} />
        <Route index path='/' element={<>{authUser ? <OverView /> : <LoginScreen />}</>} />
        <Route path='registration' element={<Registration />} />
        <Route path='livefootage' element={<LiveFootage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
