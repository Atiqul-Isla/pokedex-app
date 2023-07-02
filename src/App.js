import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './app.css'
import {getPokemonList, getPokemonDescription, getPokemonSpriteUrl} from './utils'
// counter

const App = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [pokemonSpriteUrl, setPokemonSpriteUrl] = useState('');
  
    useEffect(() => {
      async function fetchData() {
        try {
          const list = await getPokemonList();
          console.log(list); // Add this line to check the contents of the pokemonList array
          setPokemonList(list);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);

    useEffect(() => {
        async function fetchPokemonDetails() {
          try {
            const description = await getPokemonDescription(pokemonList[index]?.name);
            const spriteUrl = getPokemonSpriteUrl(index+1);
            setPokemonDescription(description);
            setPokemonSpriteUrl(spriteUrl);
          } catch (error) {
            console.error(error);
          }
        }
      
        fetchPokemonDetails();
      }, [index]);

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='w-[600px] h-[65vh] bg-white rounded-3xl shadow-lg shadow-black flex flex-col justify-center items-center gap-4'>
                <select className='bg-purple-200 px-24 py-1 rounded-md' value={index} onChange={(e) => setIndex(Number(e.target.value))}>
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
                <div className='flex justify-between gap-72 mt-12'>
                    {index === 0 ? <button className='bg-purple-100 px-12 py-2 rounded-md'>
                     Prev
                    </button>: <button className='bg-purple-200 px-12 py-2 rounded-md' onClick={() => setIndex(index-1)}>
                     Prev
                    </button>}
                    <button className='bg-purple-200 px-12 py-2 rounded-md' onClick={() => setIndex(index+1)}>
                        Next 
                    </button>
                </div>
        </div>
       
    </div>
  )
}

export default App