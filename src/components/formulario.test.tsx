import React  from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulatio";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('O comportamento do formulario.tsx', () => {
    test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
    
        const input = screen.getByPlaceholderText('insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        expect(input).toBeInTheDocument();
        expect(botao).toBeDisabled();
    });
    
    test('Adicionar um participante caso exista um nome preenchidos', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
    
        const input = screen.getByPlaceholderText('insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        fireEvent.change(input, { target: { value: 'Rogerio Almeida' } });
    
        fireEvent.click(botao);
    
        expect(input).toHaveFocus();
    
        expect(input).toHaveValue('');
    });
    
    test('Nome duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
    
        const input = screen.getByPlaceholderText('insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        fireEvent.change(input, { target: { value: 'Rogerio Almeida' } });
    
        fireEvent.click(botao);
    
        fireEvent.change(input, { target: { value: 'Rogerio Almeida' } });
    
        fireEvent.click(botao);
    
        const mensagemDeErro = screen.getByRole('alert');
    
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos');
    });
    
    test('A mensagem de erro deve sumir após os timers', () => {
        // useFakeTimers diz que todas as func que rodam timers no component são fakes
        jest.useFakeTimers();
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
    
        const input = screen.getByPlaceholderText('insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        fireEvent.change(input, { target: { value: 'Rogerio Almeida' } });
    
        fireEvent.click(botao);
    
        fireEvent.change(input, { target: { value: 'Rogerio Almeida' } });
    
        fireEvent.click(botao);
    
        let mensagemDeErro = screen.queryByRole('alert');
        expect(mensagemDeErro).toBeInTheDocument();
    
        act(() => {
            // runAllTimers executa todos os timers que existirem no component
            jest.runAllTimers();
        });
    
        mensagemDeErro = screen.queryByRole('alert');
        expect(mensagemDeErro).toBeNull();
    });
});

