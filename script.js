// var consultaCEP = fetch("https://viacep.com.br/ws/01001250/json/")
//   .then((response) => response.json())
//   .then(r => {
//     if (r.erro) {
//       throw Error("Cep Inexistente");
//     } else
//       console.log(r);
//   })
//   .catch((erro) => console.log(erro))
//   .finally(mensagem => console.log('Finalizado'));

//   console.log(consultaCEP)

// tem os dois then pq o primeiro é pra converter as infos que vem em bytes pra json, e o segundo é pra exibir pno console o retorno dessa response convertida em json.

//essa primeira forma é utilizando vários then e catch pra ver se pega um erro. na segunda forma abaixo é utilizando funções assíncronas

async function buscaEndereco(cep) {
  const mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error("Cep Inexistente");
    }

    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");
    var bairro = document.getElementById("bairro");

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro

    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = "<p>Cep Inválido </p>";
    console.log(erro);
  }
}

//nessa segunda função,  o await é obrigatório pq é uma função assícrona

var cep = document.getElementById("cep");

cep.addEventListener("focusout", () => buscaEndereco(cep.value));
