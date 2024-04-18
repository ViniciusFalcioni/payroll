import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import './Table.module.scss'; // Importe os estilos do módulo SCSS
import { calcularDescontos, calcularSalarioLiquido } from '../../utils/calculos'; // Importe as funções de cálculo

const TableFuncionarios = ({ data }) => {
    TableFuncionarios.propTypes = {
        data: PropTypes.array.isRequired,
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nome da empresa</th>
                        <th>Funcionário</th>
                        <th>Cargo/Função</th>
                        <th>Salário Bruto</th>
                        <th>Descontos</th>
                        <th>Salário Líquido</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        item.funcionarios.map((funcionario, idx) => (
                            <tr key={`${index}-${idx}`}>
                                <td>{item.empregador.nome}</td>
                                <td><Link to={`/funcionario/${funcionario.id}`}>{funcionario.nome}</Link></td> {/* Usando Link para redirecionar */}
                                <td>{funcionario.cargo}</td>
                                <td>R$ {funcionario.salario_bruto}</td>
                                <td>R$ {calcularDescontos(funcionario).toFixed(2)}</td> {/* Chamando a função de cálculo de descontos */}
                                <td>R$ {calcularSalarioLiquido(funcionario).toFixed(2)}</td> {/* Chamando a função de cálculo de salário líquido */}
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableFuncionarios;
