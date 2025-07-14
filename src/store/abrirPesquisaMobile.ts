import {create} from 'zustand'

interface PesquisaState{
    abrirPesquisa: boolean
    abrirMenu: boolean
    setAbrirMenu: (valor: boolean) => void
    setAbrirPesquisa: (valor: boolean) => void
}
// e nesse tennho o gerenciamento de estado de uma modal que usei em dois arquivos
export const usePesquisaStore = create<PesquisaState>((set) => ({
    abrirPesquisa: false,
    abrirMenu: false,
    setAbrirMenu: (valor) => set({abrirMenu: valor}),
    setAbrirPesquisa: (valor) => set({abrirPesquisa: valor})
}))