import { BrowserRouter } from "react-router-dom";
import App from "../paginas/Principal/App";
import { buscaTransacoes, salvaTransacao } from "./transacoes";
import { render, screen } from "@testing-library/react";
import api from "./api";

jest.mock("./api");

const mockTransacao = [
  {
    id: 1,
    transacao: "Depósito",
    valor: "100",
    data: "22/11/2022",
    mes: "Novembro",
  },
];

const mockRequisição = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisiçãoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequisicaoPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockRequisicaoPostErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe("Requisições para API", () => {
  test("Deve retornar uma lista de transações", async () => {
    api.get.mockImplementation(() => mockRequisição(mockTransacao));

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toBeCalledWith("/transacoes");
  });

  test("Deve retornar uma lista vazia a requisição falhar", async () => {
    api.get.mockImplementation(() => mockRequisiçãoErro());

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual([]);
    expect(api.get).toBeCalledWith("/transacoes");
  });

  test("Deve retornar um status 201 - (Created) após uma requisição POST", async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith("/transacoes", mockTransacao[0]);
  });

  test("Deve retornar um saldo de 1000 quando a requisição POST falhar", async () => {
    api.post.mockImplementation(() => mockRequisicaoPostErro());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe("Erro na requisição");
    expect(api.post).toHaveBeenCalledWith("/transacoes", mockTransacao[0]);
  });
});
