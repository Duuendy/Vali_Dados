export const soDigitos = (s) => String(s || "").replace(/\D/g, "");
export const soAlfaNum = (s) =>
  String(s || "")
    .replace(/[^0-9a-z]/gi, "")
    .toUpperCase();

export function aplicarMascara(valor, padrao, extrato) {
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

export function mascaraCPF(valor) {
  return aplicarMascara(valor, "###.###.###-##", soDigitos);
}

export function mascaraCNPJ(valor) {
  return aplicarMascara(valor, "##.###.###/####-##", soDigitos);
}

export function mascaraNovoCNPJ(valor) {
  return aplicarMascara(valor, "AA.AAA.AAA/AAAA-AA", soAlfaNum);
}

export function campoVazio(dado) {
  return !dado || dado.trim() === "";
}

export function setupValidador({
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
