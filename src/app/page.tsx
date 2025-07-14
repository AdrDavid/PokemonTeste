'use client'
import Link from 'next/link'
import React, {useState} from 'react'

// aqui tem o inicio com o banner inicial e o botao para iniciare abrir a pokedex

export default function page() {
    const [loaging , setLoading] = useState(false) // so a variavel de loading pra colocar um carregamento no botao caso demore para buscar os dados da api
    function carregar(){
        setLoading(true)
    }
    return (
        <div className='fixed w-full top-0 flex justify-center items-end h-[500px] bg-[url("/images/fundoInicio.jpg")] bg-cover bg-right md:bg-center py-10'>
            
            <Link href="/dashboard"><button onClick={carregar} className='w-[250px] h-[40px]  shadow-xl/30 rounded-md cursor-pointer bg-[#238cfc] hover:bg-[#007bff]'>
                {loaging ? 'Carregando...' : 'Abrir a Pokedex'}
            </button></Link>
        </div>
    )
}

//daqui para o arquivo  page na pasta dashboard
