import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../core/services/pokemon.service'; 
import { Pokemon } from '../../core/models/pokemon.model';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { StatsBarComponent } from '../../components/stats-bar/stats-bar.component'; 

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    PokemonCardComponent,
    StatsBarComponent
  ],
  styleUrls: ['./pokemon-detail.component.css'],
  templateUrl: './pokemon-detail.component.html'
})
export class PokemonDetailComponent implements OnInit {
  pokemonId!: number;
  pokemonData!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  goToPokemonDetail(id: number) {
    this.router.navigate(['/pokemon', id]);
  }

  evolvesToData!: Pokemon;
}
