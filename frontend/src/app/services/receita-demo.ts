import { Receita } from '../models/receita';
import { RECEITAS_DEMO } from './dados-demo';

// usado só na versão do GitHub Pages (environment.pages.ts)
// faz o mesmo que a API, mas salvando no localStorage do navegador

const CHAVE = 'sabor-facil-receitas';

function ler(): Receita[] {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
      return JSON.parse(salvo) as Receita[];
    }
  } catch {
    // se der erro no localStorage, volta para os dados de exemplo
  }
  return RECEITAS_DEMO.map((r) => ({ ...r, ingredientes: [...r.ingredientes] }));
}

function salvar(receitas: Receita[]): void {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(receitas));
  } catch {
    // sem localStorage os dados só duram até recarregar a página
  }
}

export function listarDemo(status: string, categoria = '', nome = ''): Receita[] {
  const termo = nome.trim().toLowerCase();
  return ler()
    .filter((r) => r.status === status)
    .filter((r) => !categoria || r.categoria === categoria)
    .filter((r) => !termo || r.nome.toLowerCase().includes(termo))
    .sort((a, b) => a.nome.localeCompare(b.nome));
}

export function buscarDemo(id: number): Receita | undefined {
  return ler().find((r) => r.id === id);
}

export function cadastrarDemo(receita: Receita): Receita {
  const receitas = ler();
  const maiorId = receitas.reduce((maior, r) => Math.max(maior, r.id ?? 0), 0);
  const nova: Receita = {
    ...receita,
    id: maiorId + 1,
    status: 'pendente',
    criadoEm: new Date().toISOString()
  };
  receitas.push(nova);
  salvar(receitas);
  return nova;
}

export function aprovarDemo(id: number): Receita | undefined {
  const receitas = ler();
  const receita = receitas.find((r) => r.id === id && r.status === 'pendente');
  if (receita) {
    receita.status = 'aprovada';
    salvar(receitas);
  }
  return receita;
}

export function recusarDemo(id: number): boolean {
  const receitas = ler();
  const restantes = receitas.filter((r) => r.id !== id);
  if (restantes.length === receitas.length) {
    return false;
  }
  salvar(restantes);
  return true;
}
