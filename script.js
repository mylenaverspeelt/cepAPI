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
    bairro.value = consultaCEPConvertida.bairro;

    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = "<p>Cep Inválido </p>";
    console.log(erro);
  }
}

var cep = document.getElementById("cep");

cep.addEventListener("focusout", () => buscaEndereco(cep.value));   //callback

