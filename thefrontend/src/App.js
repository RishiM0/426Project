import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Navbar from './components/Navbar'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
          <div className="pages">
            <Routes>
              <Route
              path="/"
              element={<Home></Home>}
              ></Route>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
