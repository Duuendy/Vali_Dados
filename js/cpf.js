import { soDigitos } from "./utils.js";

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
