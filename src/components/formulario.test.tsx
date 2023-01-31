import React  from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "./Formulatio";

test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(<Formulario />);

    const input = screen.getByPlaceholderText('insira os nomes dos participantes');
    const botao = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
});