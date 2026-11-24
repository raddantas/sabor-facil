import { Component, OnInit, inject, signal } from '@angular/core';
import { ReceitaService } from '../../services/receita.service';
import { CATEGORIAS, Receita } from '../../models/receita';
import { ReceitaCard } from '../receita-card/receita-card';

@Component({
  selector: 'app-home',
  imports: [ReceitaCard],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  private receitaService = inject(ReceitaService);

  categorias = CATEGORIAS;
  receitas = signal<Receita[]>([]);
  categoriaSelecionada = signal('');
  carregando = signal(true);
  erro = signal('');

  ngOnInit(): void {
    this.carregarReceitas();
  }

  filtrar(categoria: string): void {
    this.categoriaSelecionada.set(categoria);
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.carregando.set(true);
    this.erro.set('');

    this.receitaService.listarAprovadas(this.categoriaSelecionada()).subscribe({
      next: (dados) => {
        this.receitas.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar as receitas. Verifique se a API está rodando.');
        this.carregando.set(false);
      }
    });
  }
}
