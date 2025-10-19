document.addEventListener("DOMContentLoaded", () => {
  setupValidador({
    buttonId: "btnValidarCpf",
    inputId: "dadosCpf",
    resultadoId: "resultadoCpf",
    erroId: "erroCpf",
    normalizaDado: normalizaNumero,
    validador: validaCPF,
  });

  setupValidador({
    buttonId: "btnValidarCnpj",
    inputId: "dadosCnpj",
    resultadoId: "resultadoCnpj",
    erroId: "erroCnpj",
    normalizaDado: normalizaNumero,
    validador: validaCNPJ,
  });

  setupValidador({
    buttonId: "btnValidarNovoCnpj",
    inputId: "dadosNovoCnpj",
    resultadoId: "resultadoNovoCnpj",
    erroId: "erroNovoCnpj",
    normalizaDado: normalizaAlfaNumerico,
    validador: validaNovoCNPJ,
  });
});

function setupValidador({
  buttonId,
  inputId,
  resultadoId,
  erroId,
  normalizaDado,
  validador,
}) {
  const btn = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  const resultado = document.getElementById(resultadoId);
  const erro = document.getElementById(erroId);

  btn.addEventListener("click", () => {
    const dado = input.value;

    if (campoVazio(dado)) {
      erro.txtContent = "O campo não pode estar vazio.";
      resultado.txtContent = "Inválido";
      return;
    }

    const validacao = normalizaDado(dado);

    const { valido, erros } = validador(validacao);
    resultadoId.txtContent = valido ? "Válido" : "Inválido";
    erroId.txtContent = erros.join(" | "); //transforma array em string
  });
}

function normalizaNumero(dado) {
  return String(dado || "").replace(/\D+/g, "");
}
function normalizaAlfaNumerico(dado) {
  return String(dado || "").replace(/[^a-zA-Z0-9]+/g, "");
}

function campoVazio(dado) {
  return !String(dado || "").trim();
}

function validaCPF(dado) {
  const erros = [];
  const cpfNumerico = normalizaNumero(dado);
  if (cpfNumerico.length !== 11) {
    erros.push("CPF deve conter 11 dígitos numéricos");
  }
  return { valido: erros.length === 0, erros };
}

function validaCNPJ(dado) {
  const erros = [];
  const cnpjNormalizado = normalizaNumero(dado);
  if (cnpjNormalizado.length !== 14) {
    erros.push("CNPJ deve conter 14 dígitos numéricos");
  }
}

function validaNovoCNPJ(dado) {
  const erros = [];
  const cnpjNormalizado = normalizaAlfaNumerico(dado);
  if (cnpjNormalizado.length !== 14) {
    erros.push("Novo CNPJ deve conter 14 caracteres alfanuméricos");
  }
}
