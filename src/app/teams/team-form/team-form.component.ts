// team-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../core/services/team.service';
import { PokemonService } from '../../core/services/pokemon.service'; 
import { Pokemon } from '../../core/models/pokemon.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-form.component.html'
})
export class TeamFormComponent implements OnInit {
  teamName = '';
  allPokemon: Pokemon[] = [];
  selectedPokemon: Pokemon[] = [];

  constructor(
    private teamService: TeamService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonService.getAllPokemon().subscribe(data => {
      this.allPokemon = data;
    });
  }

  togglePokemonSelection(pokemon: Pokemon) {
    const index = this.selectedPokemon.findIndex(p => p.id === pokemon.id);
    if (index >= 0) {
      this.selectedPokemon.splice(index, 1);
    } else {
      if (this.selectedPokemon.length < 6) {
        this.selectedPokemon.push(pokemon);
      } else {
        alert('Máximo 6 Pokémon por equipo');
      }
    }
  }

  createTeam() {
    const teamData = {
      teamName: this.teamName,
      pokemonIds: this.selectedPokemon.map(p => p.id)
    };

    this.teamService.createTeam(teamData).subscribe(() => {
      this.router.navigate(['/teams']);
    });
  }
}
