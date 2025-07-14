'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { usePesquisaStore } from '@/store/abrirPesquisaMobile'
export default function Header() {
    const {abrirPesquisa, abrirMenu, setAbrirMenu, setAbrirPesquisa } = usePesquisaStore()

    return (
        <div className={`${abrirMenu ? 'h-[200px] sm:hidden  opacity-100' : 'h-[80px] opacity-100'} relative transition-all duration-500 overflow-hidden w-full flex sm:justify-center justify-between  items-center px-4 bg-[#18181c]  shadow-xl/30 r sm:h-[80px]`}>
            <ul className='hidden sm:flex gap-4'>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
            <button onClick={() => setAbrirMenu(!abrirMenu)} className='sm:hidden text-[40px] cursor-pointer absolute top-6'>
                <GiHamburgerMenu />
            </button>
            <ul className={`${abrirMenu ? 'mt-[10px] flex flex-col  justify-center opacity-100' : 'hidden opacity-0'} transition-all duration-500 overflow-hidden w-full  gap-4`}>
                <li className='w-full text-center h-[30px]'><Link href="/">Inicio</Link></li>
                <li className='w-full text-center h-[30px]'><Link href="/dashboard">Dashboard</Link></li>
            </ul>
            <button onClick={() => setAbrirPesquisa(!abrirPesquisa)} className='sm:hidden text-[40px] cursor-pointer absolute top-6 right-5'>
                {!abrirPesquisa ? <FaSearch /> : <IoClose />}
            </button>

        </div>
    )
}
