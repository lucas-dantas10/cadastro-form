//******VALIDA MAIOR DE IDADE*******

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = mostroMensagemDeErro(tipoDeInput, input);
    }
}

const tiposDeErros = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensagemDeErro = {
    nome: {
        valueMissing: "O campo nome não pode estar vazio."
    },
    email: {
        valueMissing: "O campo email não pode estar vazio.",
        typeMismatch: "O email digitado não é válido."
    },
    senha: {
        valueMissing: "O campo senha não pode estar vazio.",
        patternMismatch: "A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos."
    },
    dataNascimento: {
        valueMissing: "O campo de data de nascimento não pode estar vazio.",
        customError: "Você deve ser maior de 18 anos para se cadastrar."
    },
    cpf: {
        valueMissing: "O campo de CPF não pode estar vazio.",
        customError: "O cpf digitado não é válido."

    }
    
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input)
}

function mostroMensagemDeErro(tipoDeInput, input) {
    let mensagem = "";
    tiposDeErros.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemDeErro[tipoDeInput][erro];
        }
    })

    return mensagem;
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    let mensagem = "";

    if(!maiorDeIdade(dataRecebida)) {
        mensagem = "Você deve ser maior de 18 anos para se cadastrar.";
    }

    input.setCustomValidity(mensagem);
}

function maiorDeIdade(data) {
    const dataAtual = new Date();
    const idadeMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return idadeMais18 <= dataAtual;
}

//******VALIDA CPF*******

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, "");
    let mensagem = "";

    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = "O cpf digitado não é válido.";
    }

    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        "00000000000",
        "11111111111",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"
    ];

    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if (valor === cpf) {
            cpfValido = false;
        }
    })


    return cpfValido;
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;
    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {
    if(multiplicador >= 12) {
        return true;
    }
    let multiplicadorInical = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split("");
    const digitoVerificador = cpf.charAt(multiplicador - 1);
    for (let contador = 0; multiplicadorInical > 1; multiplicadorInical--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInical;
        contador++;
    }

    if((digitoVerificador == confirmaDigito(soma)) || (digitoVerificador == 0 && confirmaDigito(soma) == 10)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }

    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}
