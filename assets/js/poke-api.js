

//objeto de manipulação da PokeAPI

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    //erro no "other"
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}
 

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())       
        .then(convertPokeApiDetailToPokemon)
}


//adicionado o metodo GET e Arrow Function
pokeApi.getPokemons = (offset = 5, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   
    //esperando que todas as promessas terminem e chame o .then
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) //erro
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


