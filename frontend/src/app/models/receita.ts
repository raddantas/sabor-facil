export type Categoria = 'doce' | 'salgado' | 'bebida';
export type StatusReceita = 'pendente' | 'aprovada';

export class Receita {
  id?: number;
  nome = '';
  categoria: Categoria = 'doce';
  ingredientes: string[] = [];
  modoPreparo = '';
  tempoPreparo = 0;
  porcoes = 1;
  autor = '';
  status: StatusReceita = 'pendente';
  criadoEm?: string;
}

export const CATEGORIAS: { valor: Categoria; nome: string }[] = [
  { valor: 'doce', nome: 'Doces' },
  { valor: 'salgado', nome: 'Salgados' },
  { valor: 'bebida', nome: 'Bebidas' }
];

export function nomeCategoria(valor: string): string {
  const categoria = CATEGORIAS.find((c) => c.valor === valor);
  return categoria ? categoria.nome : valor;
}
