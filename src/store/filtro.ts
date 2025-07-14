import {create} from 'zustand'

interface FiltroState {
    buscaNome: string
    buscaTipo: string
    setBuscaNome: (nome: string) => void
    setBuscaTipo: (tipo:string) => void
}

// aqui temo apenas o controle do estado global com zustend  para o nome e tipo
// agora para busca

export const useFiltroStore = create<FiltroState>((set) => ({
    buscaNome: '',
    buscaTipo: '',
    setBuscaNome: (nome) => set({buscaNome: nome}),
    setBuscaTipo: (tipo) => set({buscaTipo: tipo})

}))