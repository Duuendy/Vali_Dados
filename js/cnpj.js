import { soDigitos, mascaraCNPJ } from "./utils.js";

export function validaCNPJ(dado) {
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

export function gerarCnpj() {
  // Lógica para gerar um CNPJ válido pode ser implementada aqui
  const cnpj = gerarNumerosCnpj();

  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const DV1 = calcularDigito(cnpj, peso1);
  cnpj.push(DV1);
  const peso2 = [6].concat(peso1);
  const DV2 = calcularDigito(cnpj, peso2);
  cnpj.push(DV2);

  const saida = cnpj.join("");
  return mascaraCNPJ(saida);
}
const randInt = () => Math.floor(Math.random() * 10);

function gerarNumerosCnpj() {
  let arr;
  do {
    arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(randInt());
    }
  } while (arr.every((d) => d === arr[0]));
  return arr;
}

function calcularDigito(cnpj, peso) {
  let soma = 0;
  for (let i = 0; i < peso.length; i++) {
    soma += cnpj[i] * peso[i];
  }
  const digito = soma % 11;
  return digito < 2 ? 0 : 11 - digito;
}
