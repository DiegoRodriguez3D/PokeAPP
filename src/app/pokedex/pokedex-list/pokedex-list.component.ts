// pokedex-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../core/services/pokemon.service'; 
import { Pokemon } from '../../core/models/pokemon.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pokedex-list.component.html'
})
export class PokedexListComponent implements OnInit {
  allPokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchName = '';
  typeFilter = '';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getAllPokemon().subscribe(data => {
      this.allPokemon = data;
      this.filteredPokemon = data;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onTypeChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPokemon = this.allPokemon.filter(p => {
      const matchesName = p.name.toLowerCase().includes(this.searchName.toLowerCase());

      let matchesType = true;
      if (this.typeFilter) {
        // Comparar type1 o type2 (en minúsculas)
        const t1 = p.type1?.toLowerCase();
        const t2 = p.type2?.toLowerCase();
        matchesType =
          t1 === this.typeFilter.toLowerCase() || t2 === this.typeFilter.toLowerCase();
      }

      return matchesName && matchesType;
    });
  }

  goToPokemonDetail(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
}
