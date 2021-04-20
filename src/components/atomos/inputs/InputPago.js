import { useState } from "react";
import CardPuntaRevert from "../../medianos/Cards/CardPuntaRevert";
import IconCard from "../icons/IconCard";
import IconOpciones from "../icons/IconOpciones";

const InputPago = () => {

    const [texto, setTexto] = useState('')
    const [activar, setActivar] = useState(false)



    const reemplazarTexto = (e) => {
        setTexto(e.target.value)
    }
    const openCard = () => {
        setActivar(!activar)
    }

    return (
        <div className='rounded-sm bg-white shadow-md border border-blue-500 w-full  text-black text-xl flex items-center px-4 py-2 '>
            <IconCard />
            <input
                className='w-full outline-none p-2'
                type='text'
                placeholder='ejemplo: 4557 - 8805 - 6515 - 9999'
                onChange={reemplazarTexto}
                value={texto}
            />
            <div className='cursor-pointer relative' onClick={openCard}>
                <IconOpciones />
                {
                    activar &&
                    <div className='absolute -top-36 -right-12'>
                        <CardPuntaRevert />
                    </div>
                }
            </div>


        </div>
    );
}

export default InputPago;