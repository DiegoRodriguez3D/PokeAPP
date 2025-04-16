export interface Team {
    id: number;
    teamName: string;
    userId: string;
    teamPokemons: Array<{
      id: number;
      teamId: number;
      pokemonId: number;
    }>;
  }
  