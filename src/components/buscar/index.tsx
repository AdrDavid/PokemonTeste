'use client'

import React, { useState, useEffect } from 'react'
import { useFiltroStore } from '@/store/filtro'
//aqui importando o arquivo do store de filtro
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { usePesquisaStore } from '@/store/abrirPesquisaMobile'
import api from '@/axios'
import { motion } from "motion/react"

interface BuscarProps {
    ordenarPorNome?: () => void
    ordenarPorTipo?: () => void
}
export function Buscar({ ordenarPorNome, ordenarPorTipo }: BuscarProps) {
    //aqui montando a variavel que usei
    const { setBuscaNome, setBuscaTipo } = useFiltroStore()
    const [tipos, setTipos] = useState<{ name: string }[]>([])
    const { abrirPesquisa } = usePesquisaStore()

    //apenas uma req nos tipos para eu colocar no select 
    async function buscaTipos() {
        try {
            const response = await api('https://pokeapi.co/api/v2/type')
            console.log("tipos aqui")
            console.log(response.data.results)
            setTipos(response.data.results)
        }
        catch (error) {
            console.log(error)
        }
    }

  

    useEffect(() => {
        buscaTipos()
    }, [])
    return (
        <>

        {/* aqui apenas os inputs dos filtros  */}
            <div className='hidden sm:flex flex-wrap justify-center gap-4'>
                <input
                    className='focus:outline-none  focus:ring-0 sm:w-[200px] sm:h-[30px] w-full h-[40px] rounded-[5px] sm:border-4 border-gray-300 px-2'
                    type="text"
                    placeholder='Buscar por nome'
                    onChange={(e) => setBuscaNome(e.target.value)}
                />
                <select className='sm:w-[200px] sm:h-[30px] rounded-[5px] bg-[#212126] h-[40px] w-full border-4 sm:border-gray-300 px-2'
                    name="" id=""
                    onChange={(e) => setBuscaTipo(e.target.value)}
                >
                    <option value="">Todos os Tipos</option>
                    {tipos.map((t, index) => (

                        <option className=' bg-[#212126]' key={index} value={t.name}>{t.name}</option>
                    ))}
                </select>
                <button className='cursor-pointer flex items-center justify-center gap-3 sm:w-[200px] sm:h-[30px] w-full rounded-[5px] bg-[#212126] h-[40px] sm:border-4 border-gray-300' onClick={ordenarPorNome}>Nome <FaArrowUp /> <FaArrowDown /></button>
                <button className='cursor-pointer flex items-center justify-center gap-3 sm:w-[200px] sm:h-[30px] w-full rounded-[5px] bg-[#212126] h-[40px] sm:border-4 border-gray-300' onClick={ordenarPorTipo}>Agrupar Tipo</button>
            </div>

            
            {/* dois desse pq decidi nesse em especifico fazer um com uma configuração levemente diferente para o celular  */} 
            <div className={` ${abrirPesquisa ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} transition-all duration-500 overflow-hidden  flex flex-wrap justify-center gap-2 px-2`}>
                <input
                    className='focus:outline-none  focus:ring-0 sm:w-[200px] sm:h-[30px] w-full h-[40px] rounded-[5px] border-2 border-gray-300 px-2'
                    type="text"
                    placeholder='Buscar por nome'
                    onChange={(e) => setBuscaNome(e.target.value)}
                />
                <select className='sm:w-[200px] sm:h-[30px] rounded-[5px] bg-[#212126] h-[40px] w-full border-2 sm:border-gray-300 px-2'
                    name="" id=""
                    onChange={(e) => setBuscaTipo(e.target.value)}
                >
                    <option value="">Todos os Tipos</option>
                    {tipos.map((t, index) => (

                        <option className=' bg-[#212126]' key={index} value={t.name}>{t.name}</option>
                    ))}
                </select>
                <button className='cursor-pointer flex items-center justify-center gap-3 sm:w-[200px] sm:h-[30px] w-full rounded-[5px] bg-[#212126] h-[40px] border-2 border-gray-300' onClick={ordenarPorNome}>Nome <FaArrowUp /> <FaArrowDown /></button>
                <button className='cursor-pointer flex items-center justify-center gap-3 sm:w-[200px] sm:h-[30px] w-full rounded-[5px] bg-[#212126] h-[40px] border-2 border-gray-300' onClick={ordenarPorTipo}>Agrupar Tipo</button>
            </div>
            
        </>
    )
}


//daqui seguimos para  page dentro da pasta name de dashboard