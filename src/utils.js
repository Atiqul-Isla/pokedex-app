export async function getPokemonList(generation) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281`
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
        endIndex = 151;
        break;
      case 2:
        startIndex = 151;
        endIndex = 251;
        break;
      case 3:
        startIndex = 251;
        endIndex = 386;
        break;
      case 4:
        startIndex = 386;
        endIndex = 493;
        break;
      case 5:
        startIndex = 493;
        endIndex = 649;
        break;
      case 6:
        startIndex = 649;
        endIndex = 721;
        break;
      case 7:
        startIndex = 721;
        endIndex = 809;
        break;
      case 8:
        startIndex = 809;
        endIndex = 905;
        break;
      case 9:
        startIndex = 905;
        endIndex = 1008;
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