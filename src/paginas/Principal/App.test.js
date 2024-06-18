import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";

describe("Component <App />", () => {
  test("Deve permitir adicionar uma transacao em Extrato", () => {
    render(<App />, { wrapper: BrowserRouter });

    const select = screen.getByRole("combobox");
    const campoValor = screen.getByPlaceholderText("Digite um valor");
    const botao = screen.getByRole("button");

    userEvent.selectOptions(select, ["Depósito"]);
    userEvent.type(campoValor, "100");
    userEvent.click(botao);

    const novaTrasacao = screen.getByTestId("lista-transacoes");
    const itemExtrato = screen.getByRole("listitem");

    expect(novaTrasacao).toContainElement(itemExtrato);
  });

  test("Deve navegar até a página correpondente ao link clicado", async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText("Cartões");
    expect(linkPaginaCartoes).toBeInTheDocument();

    userEvent.click(linkPaginaCartoes);

    const tituloPaginaCartoes = await screen.findByText("Meus cartões");
    expect(tituloPaginaCartoes).toBeInTheDocument();
  });
});
