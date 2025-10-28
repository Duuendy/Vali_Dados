import { soDigitos } from "./utils.js";

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
