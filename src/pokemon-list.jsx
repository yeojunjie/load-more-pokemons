// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useState, useEffect } from "react";

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([]);
    const [totalNumOfPokemons, setTotalNumOfPokemons] = useState();

    async function loadMorePokemons() {
        var offset = pokemons.length;

        await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemons([...pokemons, ...data.results]);
                setTotalNumOfPokemons(data.count);
            })
            .catch((error) => {
                console.error('Error:', error)
            });
    }

    // Call the loadMorePokemons function when the component is first mounted.
    useEffect(() => {
        loadMorePokemons();
    }, []);

    return (
        <div>
            <ol>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ol>

            <p>
                Displaying {pokemons.length} of {totalNumOfPokemons} results.
            </p>
            
            { pokemons.length != totalNumOfPokemons && <button onClick={loadMorePokemons}>Load more</button> }
        </div>
    )
};

export default PokemonList;
