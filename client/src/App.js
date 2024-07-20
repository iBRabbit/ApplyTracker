import './App.css';
import AppNavbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Applications from './pages/applications/index';

import ApplicationsAdd from './pages/applications/create';

import { AuthProvider } from './helpers/AuthContext';

import ProtectedRoute from './components/routes/ProtectedRoute';

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

            <Route path="/applications" element={<ProtectedRoute element={<Applications />} />} />
            <Route path="/applications/add" element={<ProtectedRoute element={<ApplicationsAdd />} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
