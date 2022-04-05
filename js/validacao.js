 export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
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