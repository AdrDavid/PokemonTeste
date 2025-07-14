'use client'
import React, { useState, useEffect, Suspense } from 'react'
import api from '@/axios'
import { useFiltroStore } from '@/store/filtro'
import { motion } from "motion/react"
import { div } from 'motion/react-client'
interface CardProp {
    name: string,
    url: string
    tipo: string
    hab: string
    imagem: string
}

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
    }
}


export function Card({ name, url, tipo, hab, imagem }: CardProp) {
    

    const cores = {
        grass: { card: 'from-[#a8e063] to-[#56ab2f]', info: 'bg-[#a8e063]' },
        water: { card: 'from-[#2193b0] to-[#6dd5ed]', info: 'bg-[#6dd5ed]' },
        fire: { card: 'from-[#f12711] to-[#f5af19]', info: 'bg-[#f5af19]' },
        electric: { card: 'from-[#fcee09] to-[#fca311]', info: 'bg-[#fcee09]' },
        bug: { card: 'from-[#a8c0ff] to-[#3f2b96]', info: 'bg-[#a8c0ff]' },
        poison: { card: 'from-[#9d50bb] to-[#6e48aa]', info: 'bg-[#9d50bb]' },
        flying: { card: 'from-[#89f7fe] to-[#66a6ff]', info: 'bg-[#89f7fe]' },
        normal: { card: 'from-[#e0eafc] to-[#cfdef3]', info: 'bg-[#e0eafc]' },
        ice: { card: 'from-[#b3f0ff] to-[#80dfff]', info: 'bg-[#b3f0ff]' },
        fighting: { card: 'from-[#c94b4b] to-[#4b134f]', info: 'bg-[#c94b4b]' },
        ground: { card: 'from-[#e0c3fc] to-[#8ec5fc]', info: 'bg-[#e0c3fc]' },
        psychic: { card: 'from-[#ff6a00] to-[#ee0979]', info: 'bg-[#ff6a00]' },
        rock: { card: 'from-[#d7d2cc] to-[#304352]', info: 'bg-[#d7d2cc]' },
        ghost: { card: 'from-[#606c88] to-[#3f4c6b]', info: 'bg-[#606c88]' },
        dragon: { card: 'from-[#6a11cb] to-[#2575fc]', info: 'bg-[#6a11cb]' },
        dark: { card: 'from-[#232526] to-[#414345]', info: 'bg-[#232526]' },
        steel: { card: 'from-[#e6e9f0] to-[#eef1f5]', info: 'bg-[#e6e9f0]' },
        fairy: { card: 'from-[#ff9a9e] to-[#fad0c4]', info: 'bg-[#ff9a9e]' },
    };


    const tipoPrincipal = tipo.split(',')[0]

    const cor = cores[tipoPrincipal as keyof typeof cores]

    let cardCor = cor ? `bg-gradient-to-r ${cor.card}` : 'bg-gray-400'
    let infoCor = cor ? `${cor.info} text-black` : 'bg-gray-600 text-white'



    return (

        <>
            
            
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('over start')}
                    className={`${cardCor} " w-[120px]  sm:w-[300px] rounded-[5px]  shadow-xl/30 py-2 sm:py-10 px-1 sm:px-5`}>

                    <div className="w-full h-[120px]  sm:h-[200px]  bg-red-400  bg-[url('/images/cena.jpg')] bg-center bg-cover relative border-3 border-[#3b3b3b]">
                        <div className='w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center'>

                            <img src={imagem} alt=""
                                className='h-[100%] object-cover'
                            />

                            <div className='absolute bottom-[-5px] sm:bottom-[-17px] font-bold left-[-5] sm:left-[-10px] text-white sm:text-2xl'>
                                <h1 className='drop-shadow-[1px_2px_4px_black] '>{name}</h1>
                            </div>
                        </div>
                    </div>
                    <div className={`${infoCor} w-full  p-4  h-[100px] rounded-[5px] mt-5`}>

                        <ul>
                            <li className='text-[10px] sm:text-[12px]'>Tipo: <span className='font-semibold'>{tipo}</span> </li>
                            <li className='text-[10px] sm:text-[12px]'>Hab: <span className='font-semibold'>{hab}</span> </li>
                            {/* {pokeCard?.abilities.map((hab, index) => (

                                <li className='text-[12px]' key={index}>Hab {index + 1}: <span className='font-semibold' >{hab.ability.name}</span> </li>
                            ))} */}
                        </ul>
                    </div>
                </motion.div>
            
        </>

    )
}
