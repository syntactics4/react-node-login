import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  return (
    <main className="main">
        <nav className="main-nav">
          <Navigation />
        </nav>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Login} />        
    </main>    
  );
}

export default App;
