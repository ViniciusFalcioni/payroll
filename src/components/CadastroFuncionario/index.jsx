import React, { useState } from 'react'
import styles from './CadastroFuncionario.module.scss'

export const CadastroFuncionario = () => {
    const [empregador, setEmpregador] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');
    const [diasTrabalhados, setDiasTrabalhados] = useState('');
    const [horasExtras, setHorasExtras] = useState('');
    const [adiantamentos, setAdiantamentos] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode enviar os dados do funcionário para o servidor ou fazer o que for necessário com eles
        console.log('Funcionário registrado:', { nome, cargo, salario, empregador, diasTrabalhados, horasExtras, adiantamentos });
        // Limpar os campos do formulário
        setEmpregador('');
        setNome('');
        setCargo('');
        setSalario('');
        setDiasTrabalhados('');
        setHorasExtras('');
        setAdiantamentos('');

    };
    return (
        <div>
            <h2>Registrar Funcionário</h2>
            <form className={styles.formStyle} onSubmit={handleSubmit}>
                <div className={styles.formCamp}>
                    <label htmlFor="nome">Empregador:</label>
                    <input
                        type="text"
                        id="empregador"
                        value={empregador}
                        onChange={(e) => setEmpregador(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formCamp}>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formCamp}>
                    <label htmlFor="cargo">Cargo:</label>
                    <input
                        type="text"
                        id="cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formCamp}>
                    <label htmlFor="salario">Salário:</label>
                    <input
                        type="number"
                        id="salario"
                        value={salario}
                        onChange={(e) => setSalario(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formCamp}>
                    <label htmlFor="salario">Dias/ Horas Trabalhadas:</label>
                    <input
                        type="number"
                        id="diastrabalhados"
                        value={diasTrabalhados}
                        onChange={(e) => setDiasTrabalhados(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formCamp}>
                    <label htmlFor="salario">Horas Extras:</label>
                    <input
                        type="number"
                        id="horasextras"
                        value={horasExtras}
                        onChange={(e) => setHorasExtras(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formCamp}>
                    <label htmlFor="salario">Adintamentos:</label>
                    <input
                        type="number"
                        id="adiantamentos"
                        value={adiantamentos}
                        onChange={(e) => setAdiantamentos(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}
