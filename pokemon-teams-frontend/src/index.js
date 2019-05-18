const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let addPokemon = []
let deletePokemon = []

fetch(TRAINERS_URL)
  .then((response) => {return response.json()})
  .then((data) => {
    let main = document.querySelector('main')
    data.forEach((trainer)=>{
      let li = document.createElement('li')
      li.innerHTML = renderPokemonCard(trainer)
      main.append(li)
    })
    addPokemon = document.querySelectorAll('#add-pokemon')
    deletePokemon = document.querySelectorAll('#release')
  })

document.addEventListener("click",(e)=>{
  // add pokemon
  if(e.target.textContent == "Add Pokemon"){
    let trainerID = parseInt(e.target.dataset.trainerId)
    if (document.querySelector(`#card-${trainerID}`).childElementCount < 6){
      //First Get a Pokemon
      fetch(POKEMONS_URL,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({'trainer_id' : `${trainerID}`})
        })
        .then((response) => {return response.json()})
        .then((data) => {
          let card = document.querySelector(`#card-${trainerID}`)
          let li = document.createElement('li')
          li.innerHTML = renderLi(data,`${trainerID}`)
          card.append(li.firstElementChild)
        })
      }
    }
    // remove pokemon
    if(e.target.textContent == "Release"){
      let trainerID = parseInt(e.target.dataset.trainerId)
      let pokemonID = parseInt(e.target.dataset.pokemonId)
      fetch(`${POKEMONS_URL}/${pokemonID}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json'
          },
        })
        .then((response) => {return response.json()})
        .then((data) => {
          let ul = document.querySelector(`#card-${data.trainer_id}`)
          let li = document.querySelector(`#pokemon-${data.id}`)
          ul.removeChild(li)
        })
      }
  })
