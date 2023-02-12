import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import Rodape from './Rodape';

jest.mock('../state/hooks/useListaParticipantes', () => ({
    useListaParticipantes: jest.fn()
}));

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockUseNavigate
}));

describe('quando não existe participantes suficientes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });
    test('A brincadeira não pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const botao = screen.getByRole('button');
        expect(botao).toBeDisabled();
    });
});

describe('Quando existe participantes suficiente', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Joaquina']);
    });
    it('A brincadeira pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const botao = screen.getByRole('button');
        expect(botao).not.toBeDisabled();
    });

    it('A brincadeira foi iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const botao = screen.getByRole('button');
        
        fireEvent.click(botao);
        expect(mockUseNavigate).toBeCalled();
        expect(mockUseNavigate).toBeCalledWith('/sorteio');
    });
});