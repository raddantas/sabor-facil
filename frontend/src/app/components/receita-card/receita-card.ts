import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Receita, nomeCategoria } from '../../models/receita';

@Component({
  selector: 'app-receita-card',
  imports: [RouterLink],
  templateUrl: './receita-card.html'
})
export class ReceitaCard {
  receita = input.required<Receita>();
  nomeCategoria = nomeCategoria;
}
