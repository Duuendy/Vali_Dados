import { validaCPF, gerarCpf } from "./cpf.js";
import { validaCNPJ, gerarCnpj } from "./cnpj.js";
import { validaNovoCNPJ } from "./novo_cnpj.js";
import {
  mascaraCPF,
  mascaraCNPJ,
  mascaraNovoCNPJ,
  setupValidador,
} from "./utils.js";

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
});

//CPF
setupValidador({
  buttonId: "btnValidarCpf",
  inputId: "dadosCpf",
  resultadoId: "resultadoCpf",
  erroId: "erroCpf",
  normalizaDado: (x) => x,
  validador: validaCPF,
  cpfId: "cpfGerado",
});

//CNPJ
setupValidador({
  buttonId: "btnValidarCnpj",
  inputId: "dadosCnpj",
  resultadoId: "resultadoCnpj",
  erroId: "erroCnpj",
  normalizaDado: (x) => x,
  validador: validaCNPJ,
  cnpjId: "cnpjGerado",
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

document.getElementById("btnGerarCpf")?.addEventListener("click", () => {
  // console.log("Gerar CPF - funcionalidade não implementada");
  const novoCpf = gerarCpf();
  document.getElementById("cpfGerado").textContent = novoCpf;
  console.log(novoCpf);
});

document.getElementById("btnGerarCnpj")?.addEventListener("click", () => {
  // console.log("Gerar CNPJ - funcionalidade não implementada");
  const novoCnpj = gerarCnpj();
  document.getElementById("cnpjGerado").textContent = novoCnpj;
  console.log(novoCnpj);
});
