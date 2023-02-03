import React, { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante";

const Formulario = () => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const adicionarNaLista = useAdicionarParticipante();

    const adicionarParticipante = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        adicionarNaLista(name);
        setName('');
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={adicionarParticipante}>
            <input 
                ref={inputRef}
                placeholder="insira os nomes dos participantes"
                value={name} 
                onChange={event => setName(event.target.value)}
            />
            <button disabled={!name}>Adicionar</button>
        </form>
    );
}

export default Formulario;