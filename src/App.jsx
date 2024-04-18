
import './index.css'
import { Home } from "./pages/Home";
import FuncionarioDetails from "./pages/FuncionarioDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Nabar'
import data from './data/funcionarios.json'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionario/:id" element={<FuncionarioDetails data={data} />} />
      </Routes>
    </Router>
  )
}

export default App;
