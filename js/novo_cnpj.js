import { soAlfaNum } from "./utils.js";

export function validaNovoCNPJ(dado) {
  const erros = [];
  const cnpjNormalizado = soAlfaNum(dado);
  if (cnpjNormalizado.length !== 14) {
    erros.push("Novo CNPJ deve conter 14 caracteres alfanuméricos");
  }
  return { valido: erros.length === 0, erros };
}
