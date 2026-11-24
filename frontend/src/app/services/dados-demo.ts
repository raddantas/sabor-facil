import { Receita } from '../models/receita';

// mesmas receitas de exemplo do back-end (backend/dados-iniciais.js)
export const RECEITAS_DEMO: Receita[] = [
  {
    id: 1,
    nome: 'Brigadeiro',
    categoria: 'doce',
    ingredientes: [
      '1 lata de leite condensado',
      '1 colher (sopa) de manteiga',
      '3 colheres (sopa) de chocolate em pó',
      'Chocolate granulado para enrolar'
    ],
    modoPreparo: 'Coloque o leite condensado, a manteiga e o chocolate em pó em uma panela.\nCozinhe em fogo baixo, mexendo sempre, até a massa desgrudar do fundo da panela.\nDeixe esfriar, faça bolinhas com as mãos untadas e passe no granulado.',
    tempoPreparo: 30,
    porcoes: 20,
    autor: 'Radmila',
    status: 'aprovada',
    criadoEm: '2026-11-24 10:00:00'
  },
  {
    id: 2,
    nome: 'Bolo de cenoura',
    categoria: 'doce',
    ingredientes: [
      '3 cenouras médias',
      '3 ovos',
      '1 xícara de óleo',
      '2 xícaras de açúcar',
      '2 xícaras de farinha de trigo',
      '1 colher (sopa) de fermento em pó'
    ],
    modoPreparo: 'Bata no liquidificador as cenouras, os ovos e o óleo.\nEm uma tigela, misture o creme com o açúcar e a farinha.\nPor último, acrescente o fermento e misture devagar.\nAsse em forma untada no forno a 180 °C por cerca de 40 minutos.',
    tempoPreparo: 60,
    porcoes: 12,
    autor: 'Isadora',
    status: 'aprovada',
    criadoEm: '2026-11-24 10:00:00'
  },
  {
    id: 3,
    nome: 'Pão de queijo',
    categoria: 'salgado',
    ingredientes: [
      '500 g de polvilho azedo',
      '1 xícara de leite',
      '1/2 xícara de óleo',
      '2 ovos',
      '200 g de queijo meia cura ralado',
      '1 colher (chá) de sal'
    ],
    modoPreparo: 'Ferva o leite com o óleo e o sal e despeje sobre o polvilho, misturando bem.\nEspere amornar e junte os ovos e o queijo, sovando até ficar uma massa lisa.\nFaça bolinhas e asse a 200 °C por cerca de 25 minutos.',
    tempoPreparo: 50,
    porcoes: 30,
    autor: 'Matheus',
    status: 'aprovada',
    criadoEm: '2026-11-24 10:00:00'
  },
  {
    id: 4,
    nome: 'Omelete simples',
    categoria: 'salgado',
    ingredientes: [
      '2 ovos',
      '1 fatia de queijo picada',
      '1 fatia de presunto picada',
      'Sal e orégano a gosto',
      '1 colher (chá) de manteiga'
    ],
    modoPreparo: 'Bata os ovos com o sal.\nDerreta a manteiga em uma frigideira e despeje os ovos.\nColoque o queijo e o presunto, dobre a omelete ao meio e deixe dourar dos dois lados.',
    tempoPreparo: 10,
    porcoes: 1,
    autor: 'Mikelly',
    status: 'aprovada',
    criadoEm: '2026-11-24 10:00:00'
  },
  {
    id: 5,
    nome: 'Limonada suíça',
    categoria: 'bebida',
    ingredientes: [
      '2 limões',
      '1 litro de água gelada',
      '4 colheres (sopa) de açúcar',
      'Gelo a gosto'
    ],
    modoPreparo: 'Lave bem os limões e corte em quatro, tirando o miolo branco.\nBata no liquidificador com a água e o açúcar por poucos segundos.\nCoe e sirva com gelo.',
    tempoPreparo: 10,
    porcoes: 4,
    autor: 'Júlia',
    status: 'aprovada',
    criadoEm: '2026-11-24 10:00:00'
  },
  {
    id: 6,
    nome: 'Suco de laranja com cenoura',
    categoria: 'bebida',
    ingredientes: [
      '4 laranjas',
      '1 cenoura pequena',
      '300 ml de água gelada',
      'Açúcar a gosto'
    ],
    modoPreparo: 'Esprema as laranjas.\nBata o suco no liquidificador com a cenoura picada e a água.\nAdoce se quiser e sirva gelado.',
    tempoPreparo: 10,
    porcoes: 3,
    autor: 'Júlia',
    status: 'aprovada',
    criadoEm: '2026-11-24 10:00:00'
  },
  {
    id: 7,
    nome: 'Mousse de maracujá',
    categoria: 'doce',
    ingredientes: [
      '1 lata de leite condensado',
      '1 caixa de creme de leite',
      '1 xícara de suco concentrado de maracujá'
    ],
    modoPreparo: 'Bata tudo no liquidificador por 3 minutos.\nColoque em uma travessa e leve à geladeira por pelo menos 3 horas.',
    tempoPreparo: 15,
    porcoes: 6,
    autor: 'Mikelly',
    status: 'pendente',
    criadoEm: '2026-11-24 10:00:00'
  }
];
