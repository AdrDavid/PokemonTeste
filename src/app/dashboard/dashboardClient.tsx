'use client'

import React, { useState, useEffect } from 'react'
import api from '@/axios'
import { Card } from '@/components/card'
import { Buscar } from '@/components/buscar'
import Link from 'next/link'
import { useFiltroStore } from '@/store/filtro'


interface PokemonApi {
    name: string,
    url: string,
    types: {
        type: {
            name: string
        }
    }[],
    abilities: {
        ability: {
            name: string
        }
    }[],
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        },
        front_default: string
    },
}

export default function DashboardClient({ pokemons }: any) {
    const { buscaNome, buscaTipo } = useFiltroStore()
    const [loading, setLoading] = useState(false)
    const [listaOrdenada, setListaOrdenada] = useState<PokemonApi[]>(pokemons)
    const [pulo, setPulo] = useState<number>(10)
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(pulo)
    const [atual, setAtual] = useState<number>(1)

    const [ordenar, setOrdenar] = useState('asc')
    const filtroPokemon = listaOrdenada.filter((p: any) =>
        (p.name.toLowerCase().includes(buscaNome?.toLowerCase()) || '') &&
        (p.types.some((t: any) => t.type.name.includes(buscaTipo.toLowerCase())) || '')

        

    )
    .slice(offset, limit)

    const totalPages = Math.ceil(pokemons.length / pulo)
    function prev(){
        setOffset(offset-pulo)
        setLimit(limit-pulo)
        setAtual(atual -1)
    }
    function next(){
        setOffset(offset +pulo)
        setLimit(limit +pulo)
        setAtual(atual + 1)
    }

    
    function ordenarPorNome(){

        const ordenado = [...listaOrdenada].sort((a, b) => ordenar === 'asc'?  a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
        setListaOrdenada(ordenado)
        setOrdenar(ordenar === 'asc' ? 'desc' : 'asc');

    }
    function ordenarPorTipo(){

        const ordenado = [...listaOrdenada].sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name))
        setListaOrdenada(ordenado)

    }



    useEffect(() => {
        setListaOrdenada(pokemons)
    }, [pokemons])

    return (
        <>
            <div className='mx-auto'>
                <Buscar ordenarPorNome={ordenarPorNome} ordenarPorTipo={ordenarPorTipo} />

            </div>
            <br />

            {loading &&
                <div className={` bg-white mx-auto mt-[50px]  bg-cover w-full h-[350px] sm:w-[200px] lg:w-[300px] rounded-[5px]  shadow-xl/30 `}>
                    <div className='relative w-full h-full flex flex-col justify-center items-center rounded-[5px]  '>
                        <img src="/images/cardLoading.gif" alt="/images/cardLoading.gif" />
                        <h1 className='text-xl font-semibold text-[#555]'>Buscando...</h1>
                    </div>
                </div>}
            {!loading &&
            
            <div className='w-full flex flex-wrap justify-center px-0 md:px-5 w-full space-x-2 sm:space-x-4 space-y-4'>


                {filtroPokemon.map((p: any) => (
                    <Link key={p.name} href={`/dashboard/${p.name}`}>

                        <Card
                            name={p.name}
                            url={p.url}
                            tipo={p.types.map((t: any) => t.type.name).join(', ')}
                            hab={p.abilities.map((a: any) => a.ability.name).join(', ')}
                            imagem={p.sprites.front_default}
                        />
                    </Link>
                ))}

                <div className='flex flex-wrap justify-center items-center md:px-5 w-full pb-[50px] space-x-4'>
                    <button disabled={atual < 2} className='cursor-pointer px-2 py-1 w-[100px] rounded-[5px] hover:bg-white hover:text-black border-2 border-gray-400'  onClick={prev}>Voltar</button>
                    <p>{atual} / {totalPages}</p>
                    <button  disabled={atual >= totalPages} className='cursor-pointer px-2 py-1 w-[100px] rounded-[5px] hover:bg-white hover:text-black border-2 border-gray-400'  onClick={next}>Avançar</button>
                </div>
            </div>
            }
        </>
    )
}
