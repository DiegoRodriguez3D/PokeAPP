import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Pokemon } from '../../core/models/pokemon.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';



@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  template: `
    <div
  class="pokemon-card"
  [@hoverScale]="hoverState"
  (mouseenter)="hoverState = 'hovered'"
  (mouseleave)="hoverState = 'default'"
  (click)="cardClick.emit(pokemon.id)"
  [ngStyle]="{ 'background-color': typeBackground(pokemon.type1) }"
  
>
  <div class="pokemon-card-bg-id">
    #{{ pokemon.id }}
  </div>

  <img
    [src]="pokemon.imageUrl"
    [alt]="pokemon.name"
    class="pokemon-img"
  />

  <div class="pokemon-info">
    <div class="type-chips">
      <mat-chip
        *ngIf="pokemon.type1"
        [ngStyle]="{ 'background-color': typeColor(pokemon.type1) }"
        class="type-chip"
      >
        {{ pokemon.type1 }}
      </mat-chip>

      <mat-chip
        *ngIf="pokemon.type2"
        [ngStyle]="{ 'background-color': typeColor(pokemon.type2) }"
        class="type-chip"
      >
        {{ pokemon.type2 }}
      </mat-chip>
    </div>

    <h3 class="pokemon-name">{{ pokemon.name }}</h3>
  </div>
</div>
  `,
  styleUrls: ['./pokemon-card.component.css'],
  animations: [
    trigger('hoverScale', [
      state('default', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.03)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' })),
      transition('default <=> hovered', animate('200ms ease-in-out')),
    ])
  ]
})

export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() cardClick = new EventEmitter<number>();
  hoverState: 'default' | 'hovered' = 'default';


  typeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'water': return '#3399ff';
      case 'fire': return '#ff6d00';
      case 'grass': return '#4caf50';
      case 'electric': return '#fdd835';
      case 'bug': return '#a8b820';
      case 'poison': return '#9b30ff';
      case 'psychic': return '#f06292';
      case 'rock': return '#b8a038';
      case 'ground': return '#e0c068';
      case 'ice': return '#66ccff';
      case 'fighting': return '#d32f2f';
      case 'flying': return '#90caf9';
      case 'ghost': return '#7e57c2';
      case 'dragon': return '#6a1b9a';
      case 'normal': return '#bdbdbd';
      default: return '#a8a878';
    }
  }
  
  typeBackground(type: string): string {
    switch (type.toLowerCase()) {
      case 'water': return '#d0ebff';
      case 'fire': return '#ffe0b2';
      case 'grass': return '#e1f5e1';
      case 'electric': return '#fff9c4';
      case 'bug': return '#f5f5dc';
      case 'poison': return '#f3e5f5';
      case 'psychic': return '#f8bbd0';
      case 'rock': return '#e0e0e0';
      case 'ground': return '#f3e5ab';
      case 'ice': return '#e0f7fa';
      case 'fighting': return '#ffcdd2';
      case 'flying': return '#e3f2fd';
      case 'ghost': return '#ede7f6';
      case 'dragon': return '#d1c4e9';
      case 'normal': return '#eeeeee';
      default: return '#f5f5f5';
    }
  }
  
}
