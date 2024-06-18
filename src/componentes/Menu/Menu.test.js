import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./index";
import AppRoutes from "../../routes";
import userEvent from "@testing-library/user-event";

describe("Deve renderizar", () => {
  test("o link para a página inicial", () => {
    render(<Menu />, { wrapper: BrowserRouter });
    const linkPaginaInicial = screen.getByText("Início");
    expect(linkPaginaInicial).toBeInTheDocument();
  });

  test("uma lista com quatro links", () => {
    render(<Menu />, { wrapper: BrowserRouter });
    const linksPaginaInicial = screen.getAllByRole("link");
    expect(linksPaginaInicial).toHaveLength(4);
  });

  test("os links com a classe link", () => {
    render(<Menu />, { wrapper: BrowserRouter });
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass("link");
    });
    expect(links).toMatchSnapshot();
  });
});

describe("Não deve renderizar", () => {
  test("o link de Extrato", () => {
    render(<Menu />, { wrapper: BrowserRouter });
    const linkExtrato = screen.queryByText("Extrato");
    expect(linkExtrato).not.toBeInTheDocument();
  });
});

test("Deve navegar até a página correspondente ao link clicado", async () => {
  render(<AppRoutes />, { wrapper: BrowserRouter });

  const linkPaginaInvestimentos = screen.getByText("Investimentos");
  expect(linkPaginaInvestimentos).toBeInTheDocument();

  userEvent.click(linkPaginaInvestimentos);

  const tituloPaginaInvestimentos = await screen.findByText("Renda Fixa");
  expect(tituloPaginaInvestimentos).toBeInTheDocument();
});
