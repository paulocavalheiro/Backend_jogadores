import { Document } from 'mongoose'

export interface Jogador extends Document {
   readonly telefone: string
   readonly email: string
   nome: string
   raking: string
   posicao: number
   avatar: string
}
