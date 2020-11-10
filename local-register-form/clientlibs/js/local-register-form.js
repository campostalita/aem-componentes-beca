const cep = document.querySelector("#cep")

const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            (document.querySelector("#" + campo).value = result[campo])
        }
    }
}

const getCep = () => {
    let search = cep.value.replace(/[^\d]+/g, '')
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then(response => {
            response.json()
                .then(data => showData(data))
        })
        .catch(e => console.log('Deu erro:' + e))
}

//VALIDA CPF

let strCPF = document.getElementById('cpf')

function validaCPF(strCPF) {
    strCPF = strCPF.replace(/[^\d]+/g, '');

    var Soma;
    var Resto;
    Soma = 0;

    if (strCPF.length !== 11 || !Array.from(strCPF).filter(e => e !== strCPF[0]).length) {
        return alert('CPF INVÁLIDO')
    }

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return alert('CPF INVÁLIDO');

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    console.log(strCPF)
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return alert('CPF INVÁLIDO');
    return alert('CPF VÁLIDO');

}


//VALIDA CNPJ
let cnpj = document.getElementById('cnpj')

function validaCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return alert('CNPJ INVÁLIDO');

    if (cnpj.length !== 14 || !Array.from(cnpj).filter(e => e !== cnpj[0]).length) {
        return alert('CNPJ INVÁLIDO')
    }

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return alert('CNPJ INVÁLIDO');

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return alert('CNPJ INVÁLIDO');
    return alert('CNPJ OK');
}




const adicionar = document.getElementById('adicionar-dados-form')
const formData = document.getElementById('form-data')

adicionar.addEventListener('click', event => {
    event.preventDefault()
    const element1 = document.getElementById('form-preenchido')
    const ulCreate = document.createElement('ul')
    element1.appendChild(ulCreate)
    ulCreate.className += "col-sm list-unstyled"

    for (var i = 0; i < formData.elements.length; i++) {
        ulCreate.innerHTML += `<li>${formData.elements[i].value}</li>`;
    }

})