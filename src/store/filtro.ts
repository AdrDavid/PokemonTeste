import {create} from 'zustand'

interface FiltroState {
    buscaNome: string
    buscaTipo: string
    setBuscaNome: (nome: string) => void
    setBuscaTipo: (tipo:string) => void
}

export const useFiltroStore = create<FiltroState>((set) => ({
    buscaNome: '',
    buscaTipo: '',
    setBuscaNome: (nome) => set({buscaNome: nome}),
    setBuscaTipo: (tipo) => set({buscaTipo: tipo})

}))