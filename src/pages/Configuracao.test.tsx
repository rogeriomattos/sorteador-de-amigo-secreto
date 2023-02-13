import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Configuracao from "./Configuracao";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockUseNavigate
}));

describe('A pagina de configuração', () => {
    it('Deve renderizar da forma correta', () => {
        const { container } = render(
            <RecoilRoot>
                <Configuracao />
            </RecoilRoot>
        );

        expect(container).toMatchSnapshot();
    });
});