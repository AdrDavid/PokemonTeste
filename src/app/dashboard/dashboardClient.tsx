'use client'

import React, { useState, useEffect } from 'react'
import api from '@/axios'
import { Card } from '@/components/card'
import { Buscar } from '@/components/buscar'
import Link from 'next/link'
import { useFiltroStore } from '@/store/filtro'


// aqui começa as renderizações

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
    //até aqui apenas as tipagens
}


export default function DashboardClient({ pokemons }: any) {
    const { buscaNome, buscaTipo } = useFiltroStore()// busca nome se refere ao filtro
    const [listaOrdenada, setListaOrdenada] = useState<PokemonApi[]>(pokemons)

    //essas variaveis diz respeito a paginação onde o pulo 
    //significa quantos ira avançar ou voltar quando os botoes fores clicados
    //offset é onde inicia
    // limit é quanto mostra por cada pagina
    //atual é apenas a contagem
    const [pulo, setPulo] = useState<number>(10)
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(pulo)
    const [atual, setAtual] = useState<number>(1)
    
    //ordenar é a variavel usada pra fazer a ordenação por ordem alfabetica
    const [ordenar, setOrdenar] = useState('asc')


    // aqui é o filtro aplicado par pesquisa por nome ou tipo filtro tem documento em store/filtro e em components/buscar
    const filtroPokemon = listaOrdenada.filter((p: any) =>
        (p.name.toLowerCase().includes(buscaNome?.toLowerCase()) || '') &&
        (p.types.some((t: any) => t.type.name.includes(buscaTipo.toLowerCase())) || '')

    )
    .slice(offset, limit) // onde eu uso o limite e o ofsset
    const totalPages = Math.ceil(pokemons.length / pulo) // a contagem de paginas
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

    // e essas duas sao apenas as funcoes de avançar e voltar a paginacao

    
    // aqui estao as duas funcoes de ordenação nome e tipo
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
            {/* aqui é apenas a renderizacao do componente de busca */}
            <div className='mx-auto'> 
                <Buscar ordenarPorNome={ordenarPorNome} ordenarPorTipo={ordenarPorTipo} />

            </div>
            <br />

            
            
            <div className='w-full flex flex-wrap justify-center px-0 md:px-5 w-full space-x-2 sm:space-x-4 space-y-4'>

            {/* aqui é onde u tenho o map dos dados para renderizar no card iremos para o arquivo card após este esta localozado em "components/card" */}
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

                {/* e  aqui os botos de preve next*/}
                <div className='flex flex-wrap justify-center items-center md:px-5 w-full pb-[50px] space-x-4'>
                    <button disabled={atual < 2} className='cursor-pointer px-2 py-1 w-[100px] rounded-[5px] hover:bg-white hover:text-black border-2 border-gray-400'  onClick={prev}>Voltar</button>
                    <p>{atual} / {totalPages}</p>
                    <button  disabled={atual >= totalPages} className='cursor-pointer px-2 py-1 w-[100px] rounded-[5px] hover:bg-white hover:text-black border-2 border-gray-400'  onClick={next}>Avançar</button>
                </div>
            </div>
            
        </>
    )
}
