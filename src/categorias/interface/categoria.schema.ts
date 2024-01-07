import mongoose from 'mongoose'
const { Schema } = mongoose

export const CategoriaSchema = new Schema(
   {
      categoria: { type: String, unique: true },
      descricao: { type: String },
      eventos: [
         {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number },
         },
      ],
      jogadores: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jogador',
         },
      ],
   },
   { timestamps: true, collection: 'categorias' }
)
