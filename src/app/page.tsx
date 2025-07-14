'use client'
import Link from 'next/link'
import React, {useState} from 'react'



export default function page() {
    const [loaging , setLoading] = useState(false)
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
