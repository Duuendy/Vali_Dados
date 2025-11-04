import { soAlfaNum, mascaraNovoCNPJ } from "./utils.js";

export function validaNovoCNPJ(dado) {
  const erros = [];
  const cnpjNormalizado = soAlfaNum(dado);
  if (cnpjNormalizado.length !== 14) {
    erros.push("Novo CNPJ deve conter 14 caracteres alfanuméricos");
  }
  return { valido: erros.length === 0, erros };
}

export function gerarNovoCnpj() {
  // Lógica para gerar um Novo CNPJ válido pode ser implementada aqui
  const novoCnpj = gerarNumerosNovoCnpj();

  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const DV1 = calcularDigito(novoCnpj, peso1);
  novoCnpj.push(DV1);
  const peso2 = [6].concat(peso1);
  const DV2 = calcularDigito(novoCnpj, peso2);
  novoCnpj.push(DV2);

  const saida = novoCnpj.join("");
  return mascaraNovoCNPJ(saida);
}

const randAlfaNum = () =>
  Math.floor(Math.random() * 36)
    .toString(36)
    .toUpperCase();

function gerarNumerosNovoCnpj() {
  let arr;
  do {
    arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(randAlfaNum());
    }
  } while (arr.every((d) => d === arr[0]));
  return arr;
}

function valorBase36(ch) {
  if (/[0-9]/.test(ch)) return ch.charCodeAt(0) - 48;
  const u = ch.toUpperCase();
  return 10 + (u.charCodeAt(0) - 65);
}

function calcularDigito(chars, peso) {
  let soma = 0;
  for (let i = 0; i < peso.length; i++) {
    const c = chars[i];
    const v = /[0-9]/.test(c) ? Number(c) : valorBase36(c);
    soma += v * peso[i];
  }
  const digito = soma % 11;
  return digito < 2 ? 0 : 11 - digito;
}
