export async function getPokemonList(generation) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }

    let startIndex = null;
    let endIndex = null;
    const data = await response.json();

    switch (generation) {
      case 1:
        startIndex = 0;
        endIndex = 150;
        break;
      case 2:
        startIndex = 151;
        endIndex = 250;
        break;
      case 3:
        startIndex = 251;
        endIndex = 386;
        break;
      default:
        startIndex = 0;
        endIndex = 150;
    }

    const pokemonList = await Promise.all(
      data.results.slice(startIndex, endIndex).map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          id: data.id,
          name: pokemon.name,
        };
      })
    );

    return pokemonList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPokemonDescription(id) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon description');
    }

    const data = await response.json();
    let englishText = '';

    for (let i = 0; i < data.flavor_text_entries.length; i++) {
      if (data.flavor_text_entries[i].language.name === 'en') {
        englishText = data.flavor_text_entries[i].flavor_text.replace(
          /[\n\f]/g,
          ' '
        );
        break;
      }
    }

    return englishText;
  } catch (error) {
    console.error(error);
    return '';
  }
}

export function getPokemonSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}