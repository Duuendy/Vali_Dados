import { soDigitos, mascaraCPF } from "./utils.js";

export function validaCPF(dado) {
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

export function gerarCpf() {
  // Lógica para gerar um CPF válido pode ser implementada aqui
  const cpf = gerarNumerosCpf();

  const DV1 = calcularDigito(cpf, 10);
  cpf.push(DV1);
  const DV2 = calcularDigito(cpf, 11);
  cpf.push(DV2);

  const saida = cpf.join("");
  return mascaraCPF(saida);
}

const randInt = () => Math.floor(Math.random() * 10);

function gerarNumerosCpf() {
  let arr;
  do {
    arr = [];
    for (let i = 0; i < 9; i++) arr.push(randInt());
  } while (arr.every((d) => d === arr[0]));
  return arr;
}

function calcularDigito(cfp, peso) {
  let soma = 0;
  for (let i = 0; i < peso - 1; i++) {
    soma += cfp[i] * (peso - i);
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}
