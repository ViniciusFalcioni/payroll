// utils/calculos.js

// Função para calcular o desconto do INSS
export const calcularDescontoINSS = (salario_bruto) => {
    let descontoINSS = 0;
    if (salario_bruto <= 1751.81) {
        descontoINSS = salario_bruto * 0.08;
    } else if (salario_bruto <= 2919.72) {
        descontoINSS = salario_bruto * 0.09;
    } else if (salario_bruto <= 5839.45) {
        descontoINSS = salario_bruto * 0.11;
    } else {
        descontoINSS = 642.34; // Valor fixo para salários acima de 5839.45
    }
    return descontoINSS;
};

// Função para calcular o desconto do IRRF
export const calcularDescontoIRRF = (salario_bruto) => {
    let descontoIRRF = 0;
    if (salario_bruto <= 1903.98) {
        descontoIRRF = 0;
    } else if (salario_bruto <= 2826.65) {
        descontoIRRF = (salario_bruto * 0.075) - 142.8;
    } else if (salario_bruto <= 3751.05) {
        descontoIRRF = (salario_bruto * 0.15) - 354.8;
    } else if (salario_bruto <= 4664.68) {
        descontoIRRF = (salario_bruto * 0.225) - 636.13;
    } else {
        descontoIRRF = (salario_bruto * 0.275) - 869.36;
    }
    return descontoIRRF;
};

// Função para calcular o desconto do FGTS
export const calcularDescontoFGTS = (salario_bruto) => {
    return salario_bruto * 0.08;
};


// Função para calcular o salário líquido de um funcionário
export const calcularSalarioLiquido = (funcionario) => {
    const descontos = calcularDescontos(funcionario);
    const salarioLiquido = funcionario.salario_bruto - descontos;
    return salarioLiquido;
};

export const calcularHorasExtras = (horasExtras, salarioHora) => {
    // Horas extras até 8 horas: 50% de acréscimo
    // Horas extras após 8 horas: 100% de acréscimo

    const horasNormais = 8; // Número de horas normais por dia
    const salarioHoraExtra50 = salarioHora * 1.5; // Salário por hora com 50% de acréscimo
    const salarioHoraExtra100 = salarioHora * 2; // Salário por hora com 100% de acréscimo

    let valorHorasExtras = 0;

    if (horasExtras <= horasNormais) {
        // Até 8 horas extras: 50% de acréscimo
        valorHorasExtras = horasExtras * salarioHoraExtra50;
    } else {
        // Mais de 8 horas extras: 50% para as primeiras 8 horas e 100% para as horas adicionais
        valorHorasExtras = (horasNormais * salarioHoraExtra50) + ((horasExtras - horasNormais) * salarioHoraExtra100);
    }

    return valorHorasExtras;
};

export const calcularAdicionalInsalubridade = (salarioBruto, grauInsalubridade) => {
    let percentualAdicional = 0;

    switch (grauInsalubridade) {
        case 1:
            percentualAdicional = 0.1; // 10% para grau mínimo
            break;
        case 2:
            percentualAdicional = 0.2; // 20% para grau médio
            break;
        case 3:
            percentualAdicional = 0.4; // 40% para grau máximo
            break;
        default:
            percentualAdicional = 0; // Nenhum adicional para grau indefinido
            break;
    }

    const adicionalInsalubridade = salarioBruto * percentualAdicional;
    return adicionalInsalubridade;
};


export const calcularDescontoVA = (diasTrabalhados, valorBeneficioDiario = 25, descontoMaximoPercentual = 0.2) => {
    // Calcula o valor total do benefício sem desconto
    const valorTotalSemDesconto = valorBeneficioDiario * diasTrabalhados;

    // Calcula o valor do desconto máximo permitido
    const descontoMaximo = valorBeneficioDiario * descontoMaximoPercentual;

    // Calcula o valor do vale-refeição
    const valorValeRefeicao = Math.max(valorTotalSemDesconto - descontoMaximo, 0);

    // Calcula o valor descontado
    const valorDescontado = valorTotalSemDesconto - valorValeRefeicao;

    // Retorna um objeto com o valor recebido de vale e o valor descontado
    return {
        valorGanho: valorValeRefeicao,
        valorDescontado: valorDescontado
    };
};


export const calcularDescontoVT = (diasTrabalhados, valorBeneficioDiario = 10, descontoMaximoPercentual = 0.2) => {
    // Calcula o valor total do benefício sem desconto
    const valorTotalSemDesconto = valorBeneficioDiario * diasTrabalhados;

    // Calcula o valor do desconto máximo permitido
    const descontoMaximo = valorBeneficioDiario * descontoMaximoPercentual;

    // Calcula o valor do vale-transporte descontado
    const valorDescontado = Math.min(valorTotalSemDesconto, descontoMaximo);

    // Calcula o valor ganho
    const valorGanho = valorTotalSemDesconto - valorDescontado;

    // Retorna um objeto com o valor recebido de vale e o valor descontado
    return {
        valorGanho,
        valorDescontado
    };
};



// Função para calcular os descontos de um funcionário
export const calcularDescontos = (funcionario) => {
    const descontoINSS = calcularDescontoINSS(funcionario.salario_bruto);
    const descontoIRRF = calcularDescontoIRRF(funcionario.salario_bruto);
    const descontoFGTS = calcularDescontoFGTS(funcionario.salario_bruto);
    const descontoAuxilioCreche = funcionario.auxiliocreche ? 200 : 0;
    const descontoVA = calcularDescontoVA(funcionario.dias_horas_trabalhadas).valorDescontado;
    const descontoVT = calcularDescontoVT(funcionario.dias_horas_trabalhadas).valorDescontado;

    const descontoTotal = descontoINSS + descontoIRRF + descontoFGTS + descontoAuxilioCreche + descontoVA + descontoVT;

    return descontoTotal;
};
