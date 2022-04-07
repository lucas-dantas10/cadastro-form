 export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalido");
    } else {
        input.parentElement.classList.add("input-container--invalido");
    }
}

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
    }
    
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
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