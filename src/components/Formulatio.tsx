import React, { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hooks/useMensagemDeErro";

const Formulario = () => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const adicionarNaLista = useAdicionarParticipante();
    const mensagemDeErro = useMensagemDeErro();

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
            {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
        </form>
    );
}

export default Formulario;