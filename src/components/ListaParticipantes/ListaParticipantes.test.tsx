import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ListaParticipantes from './ListaParticipantes';
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes';

jest.mock('../../state/hooks/useListaParticipantes', ()=>({
  useListaParticipantes: jest.fn()
}));

describe('Uma lista vazia de participantes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([]);
  });
  test('Deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );
  
    const items = screen.queryAllByRole('listitem');
  
    expect(items).toHaveLength(0);
  });
});

describe('Uma lista preenchida de participantes', () => {
  const participantes = ['Catarina', 'Lucas'];
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('Deve ser renderizada com elementos', () => {

    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );
  
    const items = screen.queryAllByRole('listitem');
  
    expect(items).toHaveLength(participantes.length);
  });
});