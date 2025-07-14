'use client'
import React, { useState, useEffect } from 'react'
import api from '@/axios'
import { useParams } from 'next/navigation'

interface PokeInfo {
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        },
        front_default: string
    },
    abilities: {
        ability: {
            name: string
        }
    }[],

    types: {
        type: {
            name: string
        }
    }[]

    stats: {
        base_stat: number
        stat: {
            name: string
        }
    }[]
}

export default function PokeName() {
    const params = useParams()
    const name = params.name as string
    const [dados, setDados] = useState<PokeInfo>()

    async function buscarPokemon() {
        const response = await api.get(`/${name}`)
        console.log(response.data)
        setDados(response.data)
    }

    useEffect(() => {
        buscarPokemon()
    }, [])

    return (
        <div>


            <div className='bg-[#ededed] mx-auto max-w-[1200px] md:w-full flex flex-wrap rounded-md'>
                <div className="w-full md:w-[60%] lg:w-[60%]  rounded-md relative bg-[url('/images/fundoPk.jpg')] bg-cover">
                    <img className='w-full  z-2 top-0' src={dados?.sprites.other['official-artwork'].front_default} alt="" />
                </div>
                <div className=' px-4 w-full md:w-[40%] py-[50px] text-black'>
                    <h1 className='text-3xl text-[#4a4a4a]  font-semibold'>{name}</h1>
                    <hr />
                    <br />
                    <h1 className='text-2xl text-[#4a4a4a]  font-semibold'>Tipo</h1>
                    {dados?.types.map((t, index) => (
                        <div key={index} className='w-full text-[#4a4a4a] flex items-center justify-center px-2 h-[35px] rounded-md shadow-xl bg-[#fff] my-2'>
                            <p className='font-semibold flex-1'>{t.type.name} </p>
                        </div>
                    ))}

                    <br />
                    <h1 className='text-2xl text-[#4a4a4a]  font-semibold'>Status</h1>


                    {dados?.stats.map((s, index) => (
                        <div key={index} className='w-full text-[#4a4a4a] flex items-center justify-center px-2 h-[35px] rounded-md shadow-xl bg-[#fff] my-2'>
                            <p className=' flex-1'>{s.stat.name} </p>
                            <p className='font-bold flex-1'>{s.base_stat}</p>
                        </div>
                    ))}
                    <br />

                    <h1 className='text-2xl text-[#4a4a4a]  font-semibold'>Habilidades</h1>
                    {dados?.abilities.map((a, index) => (
                        <div key={index} className='w-full text-[#4a4a4a] flex items-center justify-center px-2 h-[35px] rounded-md shadow-xl bg-[#fff] my-2'>
                            <p className='font-semibold flex-1'>{a.ability.name} </p>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}
