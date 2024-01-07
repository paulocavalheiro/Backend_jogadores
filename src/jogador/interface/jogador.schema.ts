import mongoose from 'mongoose'
const { Schema } = mongoose

export const JogadorSchema = new Schema(
   {
      email: { type: String, unique: true },
      telefone: { type: String },
      nome: { type: String },
      raking: { type: String },
      posicao: { type: Number },
      avatar: { type: String },
   },
   { timestamps: true, collection: 'jogadores' }
)
