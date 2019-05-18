function renderPokemonCard(trainer) {
  let pkmn = trainer.pokemons

  let pkmnsrting = ""
  for(let i=0; i<pkmn.length; i++){
    pkmnsrting += renderLi(trainer.pokemons[i],trainer)
  }

  return `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button id="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul id="card-${trainer.id}">`
      +
      pkmnsrting
      +
      `</ul>
    </div>
  `
}

function renderLi(pokemon,trainer) {
  return `<li id="pokemon-${pokemon.id}">${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}" data-trainer-id="${trainer.id}">Release</button></li>`
}
