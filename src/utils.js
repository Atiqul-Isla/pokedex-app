export async function getPokemonList() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon list');
      }
  
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
      // Handle the error as needed (e.g., show an error message)
      return [];
    }
  }

  export async function getPokemonDescription(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const data = await response.json();
    return data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ");
  }
  
  export function getPokemonSpriteUrl(name) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`;
  }