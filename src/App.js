import React from 'react';
import { Route, Routes, useLocation} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';

const App = () => {
  return (
      <div className="w-screen h-screen bg-blue-300">
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/login" element={<Auth/>}/>
        </Routes>
      </div>
  );
}

export default App;
