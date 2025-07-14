import DashboardClient from './dashboardClient'
import React, { Suspense } from 'react'
import api from '@/axios'
import { div } from 'motion/react-client'

export default async function DashboardPage() {
    
    const response = await api('?limit=20')
    const lista = response.data.results
    const detalhes = await Promise.all(
        lista.map((p: any) => api(p.url).then((res) => res.data))
    )

    return (
        <>
            <Suspense fallback={
                <div className={` bg-white mx-auto mt-[50px]  bg-cover w-full h-[350px] sm:w-[200px] lg:w-[300px] rounded-[5px]  shadow-xl/30 `}>
                    <div className='relative w-full h-full flex flex-col justify-center items-center rounded-[5px]  '>
                        <img src="/images/cardLoading.gif" alt="/images/cardLoading.gif" />
                        <h1 className='text-xl font-semibold text-[#555]'>Buscando...</h1>
                    </div>
                </div>
            }>

                <DashboardClient pokemons={detalhes} />
            </Suspense>
        </>

    )
}