import { CadastroFuncionario } from "./components/CadastroFuncionario"
import Navbar from "./components/Nabar"
import { Table } from "./components/Table"
import './index.css'

function App() {

  return (
    <>
      <Navbar />

      <div className="container">
        <CadastroFuncionario />
        <Table />
      </div>
    </>
  )
}

export default App
