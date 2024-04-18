import data from '../data/funcionarios.json'
import TableFuncionarios from '../components/TableFuncionarios'

export const Home = () => {
  return (
    <>
    <>
      <div className="container">
        <TableFuncionarios data={data} />
      </div>
    </>
    </>
  )
}
