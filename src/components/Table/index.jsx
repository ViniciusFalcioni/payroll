import React from 'react'
import './Table.module.scss'

export const Table = () => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Empregador</th>
                        <th>Funcionário</th>
                        <th>Cargo/Função</th>
                        <th>Descontos</th>
                        <th>Número de Dias/ Horas Trabalhadas</th>
                        <th>Horas Extras</th>
                        <th>Adiantamentos</th>
                        <th>Comissão</th>
                        <th>Salário Bruto</th>
                        <th>Descontos Judiciais</th>
                        <th>Salário Líquido</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nome do Empregador</td>
                        <td>Nome do Funcionário</td>
                        <td>Cargo/Função do Funcionário</td>
                        <td>INSS, Contribuição Sindical, FGTS, Vales, etc.</td>
                        <td>Número de dias/ horas trabalhadas</td>
                        <td>Valores de horas extras</td>
                        <td>Valor dos adiantamentos</td>
                        <td>Valor da comissão (se aplicável)</td>
                        <td>Valor bruto do salário</td>
                        <td>Descontos judiciais (pensão alimentícia, etc.)</td>
                        <td>Valor líquido do salário</td>
                    </tr>
                    {/* Adicione mais linhas conforme necessário para mais funcionários */}
                </tbody>
            </table>
        </div>
    )
}
