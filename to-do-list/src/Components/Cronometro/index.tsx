import Botao from "../Botao/index";
import Relogio from "./Relogio/index";
import style from './Cronometro.module.scss';
import { tempoParaSegundos } from "../../Common/Utils/time";
import { ITarefa } from "../../Types/tarefa";
import { useEffect, useState } from "react";

interface Props{
    selecionado: ITarefa | undefined,
    finalizarTarefa: () => void
}

export function Cronometro({ selecionado, finalizarTarefa }: Props){
    
    const [tempo, setTempo] = useState<number>();
    useEffect(() => {
        if(selecionado?.tempo){
            setTempo(tempoParaSegundos(selecionado.tempo))
        }
    },[selecionado])

    function regressiva(contador: number = 0){
        setTimeout(() => {
            if(contador > 0){
                setTempo(contador - 1)
                return regressiva(contador - 1)
            }
            finalizarTarefa()
        }, 1000);
    }
    
    return(
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo}/>
            </div>
            <Botao onClick={() => regressiva(tempo)}>Começar</Botao>
        </div>
    )
}