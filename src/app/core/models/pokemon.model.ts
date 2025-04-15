// pokemon.model.ts
export interface Pokemon {
    id: number;
    name: string;
    type1: string;
    type2?: string;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    hp: number;
    description: string;
    height: number;
    weight: number;
    imageUrl: string;
    evolvesFromId?: number;
    evolvesToId?: number;
  }
  