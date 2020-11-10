const cep = document.querySelector("#cep")
const cpf = document.querySelector("#cpf")
const btn = document.querySelector("#adicionar")
//alert(TestaCPF(strCPF));

const showData = function(result){
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

cep.addEventListener("blur", function(){
    let search = cep.value.replace("-","")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`http://viacep.com.br/ws/${search}/json/`, options)
    .then(function(response){
		response.json()
        .then(function(data){
            showData(data)
            console.log(data)
        })
    })
    .catch(function(e){
        console.log('Deu Erro: ' + e,message)
    })
})

btn.addEventListener("click", function(){
    var form = document.querySelector("#form-cep");

    var cpf = '';
    var cnpj = '';

    var nome = form.nome.value;
    var idade = form.idade.value;
    cpf = form.cpf.value;
    cnpj = form.cnpj.value;
    var cep = form.cep.value;
    var logradouro = form.logradouro.value;
    var bairro = form.bairro.value;
    var localidade = form.localidade.value;
    var uf = form.uf.value;

    var cepTr = document.createElement("tr");

    var nomeTd = document.createElement("td");
    var idadeTd = document.createElement("td");
    if(cnpj==''){
        var cpfTd = document.createElement("td");
    }else{
        var cnpjTd = document.createElement("td");
    }
    var cepTd = document.createElement("td");
    var logradouroTd = document.createElement("td");
    var bairroTd = document.createElement("td");
    var localidadeTd = document.createElement("td");
    var ufTd = document.createElement("td");

    nomeTd.textContent = nome;
    idadeTd.textContent = idade;
    if(cnpj==''){
        cpfTd.textContent = cpf;
    }else{
        cnpjTd.textContent = cnpj;
    }
    cepTd.textContent = cep;
    logradouroTd.textContent = logradouro;
    bairroTd.textContent = bairro;
    localidadeTd.textContent = localidade;
    ufTd.textContent = uf;

    cepTr.appendChild(nomeTd);
    cepTr.appendChild(idadeTd);
    if(cnpj == '') {
        cepTr.appendChild(cpfTd);
    }else{
        cepTr.appendChild(cnpjTd)
    }
    cepTr.appendChild(cepTd);
    cepTr.appendChild(logradouroTd);
    cepTr.appendChild(bairroTd);
    cepTr.appendChild(localidadeTd);
    cepTr.appendChild(ufTd);

    var tabela = document.querySelector("#tabela-cep");

    tabela.appendChild(cepTr)
})