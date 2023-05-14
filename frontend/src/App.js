import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Headers/Headers";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard/Dashboard';
import Update from './pages/Update/Update';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />
      </Routes>


    </>
  );
}

export default App;
