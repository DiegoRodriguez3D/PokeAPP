// pokemon-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service'; 
import { Pokemon } from '../../core/models/pokemon.model';


@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-detail.component.html'
})
export class PokemonDetailComponent implements OnInit {
  pokemonId!: number;
  pokemonData!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemonById(this.pokemonId).subscribe(p => {
      this.pokemonData = p;
    });
  }
}
