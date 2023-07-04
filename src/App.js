import React, {useState, useEffect} from 'react'
import './App.css'
import {getPokemonList, getPokemonDescription, getPokemonSpriteUrl} from './utils'
// counter

const App = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [index, setIndex] = useState(0);
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [pokemonSpriteUrl, setPokemonSpriteUrl] = useState('');
    const [generation, setGeneration] = useState(1) 
    const [currentPokemon, setCurrentPokemon] = useState(null);

  
    useEffect(() => {
      async function fetchData() {
        try {
          const list = await getPokemonList(generation);
          setPokemonList(list);
          setCurrentPokemon(list[0]);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchData();
    }, [generation]);

    useEffect(() => {
      async function fetchPokemonDetails() {
        try {
          const selectedPokemon = pokemonList[index];
          const description = await getPokemonDescription(selectedPokemon?.name);
          const spriteUrl = getPokemonSpriteUrl(selectedPokemon?.id);
          setPokemonDescription(description);
          setPokemonSpriteUrl(spriteUrl);
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchPokemonDetails();
    }, [index, pokemonList]);

  return (
    <div className='flex justify-center items-center h-screen'>
       <div className='w-[200px] h-[65vh] bg-white rounded-3xl mx-3 flex flex-col justify-center items-center  shadow-black shadow-lg'>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={1} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 1</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={2} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 2</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={3} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 3</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={4} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 4</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={5} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 5</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={6} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 6</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={7} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 7</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={8} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 8</button>
       <button className='bg-steel p-2 px-6 rounded-xl my-2' value={9} onClick={(e) => setGeneration(Number(e.target.value))}>Generation 9</button>

       </div>
        <div className='w-[600px] h-[65vh] bg-white rounded-3xl shadow-lg shadow-black flex flex-col justify-center items-center gap-4'>
                <p>viewing generation: {generation}</p>
                <select
                  className='bg-purple-200 px-24 py-1 rounded-md'
                  value={index}
                  onChange={(e) =>
                    setIndex(Number(e.target.value))
                  }
                >
                  {pokemonList.map((pokemon, idx) => (
                    <option key={idx} value={idx}>
                      {pokemon.name}
                    </option>
                  ))}
                </select>
                <div className='flex flex-col justify-between items-center mb-7 w-[30vh] h-[30vh] rounded-full'>
                    <div className='mx-4 border-2 border-grey-100 rounded-xl'>
                        <img src={pokemonSpriteUrl} alt='' className='h-32'></img>
                    </div>
                    <h1 className='text-3xl mt-2'>#{index+1} {pokemonList[index]?.name}</h1>
                    <p className='text-center mt-2'>
                    {pokemonDescription}
                    </p>                
                </div>
                <div className='flex justify-between gap-72 mt-12 '>
                    {index === 0 ? <button className='bg-purple-100 px-12 py-2 rounded-md'>
                     Prev
                    </button>: <button className='bg-purple-200 px-12 py-2 rounded-md' onClick={() => setIndex(index-1)}>
                     Prev
                    </button>}
                    {index == pokemonList.length - 1 ? <button className='bg-purple-100 px-12 py-2 rounded-md'>Next</button> : <button className='bg-purple-200 px-12 py-2 rounded-md' onClick={() => setIndex(index+1)}>
                        Next 
                    </button>}
                </div>
        </div>
       
    </div>
  )
}

export default App