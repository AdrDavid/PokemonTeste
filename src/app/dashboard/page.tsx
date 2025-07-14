import DashboardClient from './dashboardClient'
import React from 'react'
import api from '@/axios'

export default async function DashboardPage() {
    
    const response = await api('?limit=50')
    const lista = response.data.results
    const detalhes = await Promise.all(
        lista.map((p: any) => api(p.url).then((res) => res.data))
    )

    return (
        <>
            

                <DashboardClient pokemons={detalhes} />
            
        </>

    )
}