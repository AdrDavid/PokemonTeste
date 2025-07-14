import DashboardClient from './dashboardClient'
import React from 'react'
import api from '@/axios'

// aquie basicamente a busca, a requisição principal dos dados da api
//feito aqui para que aqui sendo a fonte como documento em ServerComponent para 
// os os que vao ter os dados tenham os pokemons ja carregados
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

//segue pro arquivo dashboardClient