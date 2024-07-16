import './App.css';
import AppNavbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './helpers/AuthContext';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Helmet><title>Home</title></Helmet>
        <Router>
          <AppNavbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
