document.addEventListener("DOMContentLoaded", () => {
  const $cpf = document.getElementById("dadosCpf");
  const $cnpj = document.getElementById("dadosCnpj");
  const $novoCnpj = document.getElementById("dadosNovoCnpj");
  if ($cpf) {
    $cpf.addEventListener("input", (e) => {
      e.target.value = mascaraCPF(e.target.value);
    });
  }

  if ($cnpj) {
    $cnpj.addEventListener("input", (e) => {
      e.target.value = mascaraCNPJ(e.target.value);
    });
  }

  if ($novoCnpj) {
    $novoCnpj.addEventListener("input", (e) => {
      e.target.value = mascaraNovoCNPJ(e.target.value);
    });
  }
  //CPF
  setupValidador({
    buttonId: "btnValidarCpf",
    inputId: "dadosCpf",
    resultadoId: "resultadoCpf",
    erroId: "erroCpf",
    normalizaDado: (x) => x,
    validador: validaCPF,
  });
  //CNPJ
  setupValidador({
    buttonId: "btnValidarCnpj",
    inputId: "dadosCnpj",
    resultadoId: "resultadoCnpj",
    erroId: "erroCnpj",
    normalizaDado: (x) => x,
    validador: validaCNPJ,
  });
  //Novo CNPJ
  setupValidador({
    buttonId: "btnValidarNovoCnpj",
    inputId: "dadosNovoCnpj",
    resultadoId: "resultadoNovoCnpj",
    erroId: "erroNovoCnpj",
    normalizaDado: (x) => x,
    validador: validaNovoCNPJ,
  });
});

const soDigitos = (s) => String(s || "").replace(/\D/g, "");
const soAlfaNum = (s) =>
  String(s || "")
    .replace(/[^0-9a-z]/gi, "")
    .toUpperCase();

function aplicarMascara(valor, padrao, extrato) {
  const char = extrato(valor);
  let i = 0;
  let saida = "";

  for (const p of padrao) {
    if (p === "#") {
      if (i < char.length && /\d/.test(char[i])) {
        saida += char[i++];
      } else {
        break;
      }
    } else if (p === "A") {
      if (i < char.length && /[0-9a-z]/i.test(char[i])) {
        saida += char[i++];
      } else {
        break;
      }
    } else {
      // literal da máscara (., -, /, etc.)
      if (i < char.length) saida += p;
    }
  }
  return saida;
}

function mascaraCPF(valor) {
  return aplicarMascara(valor, "###.###.###-##", soDigitos);
}

function mascaraCNPJ(valor) {
  return aplicarMascara(valor, "##.###.###/####-##", soDigitos);
}

function mascaraNovoCNPJ(valor) {
  return aplicarMascara(valor, "AA.AAA.AAA/AAAA-AA", soAlfaNum);
}

function campoVazio(dado) {
  return !String(dado || "").trim();
}

function validaCPF(dado) {
  const erros = [];

  if (/[a-zA-Z]/i.test(dado)) {
    erros.push("CPF não pode conter letras");
  }

  const n = soDigitos(dado);
  if (n.length !== 11) {
    erros.push("CPF deve conter 11 dígitos numéricos");
  }
  return { valido: erros.length === 0, erros };
}

function validaCNPJ(dado) {
  const erros = [];

  if (/[a-zA-Z]/i.test(dado)) {
    erros.push("CNPJ não pode conter letras");
  }

  const n = soDigitos(dado);
  if (n.length !== 14) {
    erros.push("CNPJ deve conter 14 dígitos numéricos");
  }
  return { valido: erros.length === 0, erros };
}

function validaNovoCNPJ(dado) {
  const erros = [];
  const cnpjNormalizado = soAlfaNum(dado);
  if (cnpjNormalizado.length !== 14) {
    erros.push("Novo CNPJ deve conter 14 caracteres alfanuméricos");
  }
  return { valido: erros.length === 0, erros };
}

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

  if (!btn || !input || !resultado || !erro) {
    console.error(
      `Elementos não encontrados para o validador com buttonId: ${buttonId}, inputId: ${inputId}, resultadoId: ${resultadoId}, erroId: ${erroId}`
    );
    return;
  }

  btn.addEventListener("click", () => {
    const dado = input.value;

    if (campoVazio(dado)) {
      erro.textContent = "O campo não pode estar vazio.";
      resultado.textContent = "Inválido";
      return;
    }

    const validacao = normalizaDado(dado);

    const { valido, erros } = validador(validacao);
    resultado.textContent = valido ? "Válido" : "Inválido";
    erro.textContent = erros.join(" | "); //transforma array em string
  });
}
