import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { calcularDescontos, calcularSalarioLiquido, calcularDescontoFGTS, calcularDescontoIRRF, calcularHorasExtras, calcularAdicionalInsalubridade, calcularDescontoINSS, calcularDescontoVA, calcularDescontoVT } from '../utils/calculos'; // Importe as funções de cálculo do arquivo utils
import style from './FuncionarioDetails.module.scss';

const FuncionarioDetails = ({ data }) => {
    const { id } = useParams(); // Obtenha o ID do funcionário da URL

    // Encontre o funcionário com base no ID
    let funcionarioEncontrado = null;
    let empregadorEncontrado = null;

    // Procurar o funcionário com base no ID
    data.forEach(empregador => {
        const funcionario = empregador.funcionarios.find(func => func.id === parseInt(id));
        if (funcionario) {
            funcionarioEncontrado = funcionario;
            empregadorEncontrado = empregador.empregador;
        }
    });

    if (!funcionarioEncontrado || !empregadorEncontrado) {
        return <div>Funcionário não encontrado</div>;
    }

    // Calculando os valores
    const descontos = calcularDescontos(funcionarioEncontrado);
    const salarioLiquido = calcularSalarioLiquido(funcionarioEncontrado);
    const descontoFGTS = calcularDescontoFGTS(funcionarioEncontrado.salario_bruto);
    const descontoIRRF = calcularDescontoIRRF(funcionarioEncontrado.salario_bruto, funcionarioEncontrado.isentos);
    const horasExtras = calcularHorasExtras(funcionarioEncontrado.horas_extras, funcionarioEncontrado.salario_bruto / 220); // Considerando 220 horas por mês
    const adicionalInsalubridade = calcularAdicionalInsalubridade(funcionarioEncontrado.salario_bruto, funcionarioEncontrado.insalubridade);
    const descontoINSS = calcularDescontoINSS(funcionarioEncontrado.salario_bruto); // Calculando o desconto do INSS
    const descontoVAInfo = calcularDescontoVA(funcionarioEncontrado.dias_horas_trabalhadas); // Calculando o desconto do VA e o valor recebido
    const descontoVA = descontoVAInfo.valorDescontado; // Desconto do salário bruto pelo VA
    const descontoVTInfo = calcularDescontoVT(funcionarioEncontrado.dias_horas_trabalhadas);
    const descontoVT = descontoVTInfo.valorDescontado;
    const valorRecebidoVT = descontoVTInfo.valorGanho;

    const valorRecebidoVA = descontoVAInfo.valorGanho; // Valor recebido no VA

    return (
        <div className="container">
            <header>
                <h1>EMPREGADOR</h1>
                <div className={style.employerInfo}>
                    <p>Nome: {empregadorEncontrado.nome}</p>
                    <p>Endereço: {empregadorEncontrado.endereco}</p>
                    <p>CNPJ: {empregadorEncontrado.cnpj}</p>
                </div>
                <div className={style.payPeriod}>
                    <p>Recibo de Pagamento de Salário</p>
                    <p>Referente ao Mês/Ano: Maio - 23</p>
                </div>
            </header>
            <section className={style.employeeInfo}>
                <table>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>NOME DO FUNCIONÁRIO</th>
                        <th>CBO</th>
                        <th>FUNÇÃO</th>
                    </tr>
                    <tr>
                        <td>{funcionarioEncontrado.id}</td>
                        <td>{funcionarioEncontrado.nome}</td>
                        <td>[Código CBO]</td>
                        <td>{funcionarioEncontrado.cargo}</td>
                    </tr>
                </table>
            </section>
            <section className={style.paymentDetails}>
                <table>
                    <tr>
                        <th>CÓD.</th>
                        <th>Descrição</th>
                        <th>Referência</th>
                        <th>Proventos</th>
                        <th>Descontos</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Sálario Bruto</td>
                        <td></td>
                        <td>R$ {funcionarioEncontrado.salario_bruto}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Horas Extras</td>
                        <td>{horasExtras > 0 ? `${funcionarioEncontrado.horas_extras} horas` : ''}</td>
                        <td>R$ {horasExtras > 0 ? horasExtras.toFixed(2) : ''}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Insalubridade</td>
                        <td>{adicionalInsalubridade > 0 ? `Grau ${funcionarioEncontrado.insalubridade}` : ''}</td>
                        <td>{adicionalInsalubridade > 0 ? adicionalInsalubridade.toFixed(2) : ''}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>INSS</td>
                        <td></td>
                        <td></td>
                        <td>R$ {descontoINSS > 0 ? descontoINSS.toFixed(2) : ''}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>IRRF</td>
                        <td></td>
                        <td></td>
                        <td>R$ {descontoIRRF > 0 ? descontoIRRF.toFixed(2) : ''}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>FGTS</td>
                        <td></td>
                        <td></td>
                        <td>R$ {descontoFGTS > 0 ? descontoFGTS.toFixed(2) : ''}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Vale Alimentação</td>
                        <td></td>
                        <td>R$ {valorRecebidoVA.toFixed(2)}</td>
                        <td>R$ {descontoVA.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Vale Transporte</td>
                        <td></td>
                        <td>R$ {valorRecebidoVT.toFixed(2)}</td>
                        <td>R$ {descontoVT.toFixed(2)}</td>
                    </tr>

                    {funcionarioEncontrado.auxiliocreche && (
                        <tr>
                            <td></td>
                            <td>Auxílio Creche</td>
                            <td></td>
                            <td></td>
                            <td>Sim</td>
                        </tr>
                    )}
                </table>
            </section>
            <section className={style.employeeInfo}>
                <table>
                    <tr>
                        <th>Total Bruto</th>
                        <th>Total Líquido</th>
                        <th>Descontos</th>
                    </tr>
                    <tr>
                        <td>R$ {(funcionarioEncontrado.salario_bruto + horasExtras + adicionalInsalubridade).toFixed(2)}</td>
                        <td>R$ {salarioLiquido.toFixed(2)}</td>
                        <td>R$ {descontos.toFixed(2)}</td>
                    </tr>
                </table>
            </section>
        </div>
    );
};

FuncionarioDetails.propTypes = {
    data: PropTypes.array.isRequired,
};

export default FuncionarioDetails;
