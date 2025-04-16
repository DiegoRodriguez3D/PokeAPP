import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../core/services/pokemon.service'; 
import { Pokemon } from '../../core/models/pokemon.model';
import { Router} from '@angular/router';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatDialogModule, DragDropModule],
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.css']
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
