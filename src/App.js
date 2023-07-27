import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">

      <Router>
        <Sidebar />

        <div className="container">
          {authIsReady && <>
            <Navbar />
            <Routes>
              <Route path="/login" element={!user ? <Login/> : <Dashboard />} />
              <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />
              
              <Route path="/" element={!user ? <Login /> : <Dashboard />} />
              <Route path="/create" element={!user ? <Login /> : <Create />} />
              <Route path="/projects/:id" element={!user ? <Login /> : <Project />} />
            </Routes>
          </>}


        </div>



      </Router>
    </div>
  );
}

export default App;
