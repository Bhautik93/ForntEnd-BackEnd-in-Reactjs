import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register';
import Dashboard from './components/Dashboard';
import Success from './components/Success';
import NotFound from './components/NotFound';
import Profile from './pages/profile/Profile';
import Home from './pages/Home';
import FeedBack from './pages/feedback/FeedBack';
import { Toaster } from 'react-hot-toast';
import Users from './pages/Users';

const App = () => {
  return (
    <div>
     <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route exact path='/feedback' element={<FeedBack />} />
          <Route exact path='/users' element={<Users />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Toaster />
     </Router>
    </div>
  );
}

export default App;
