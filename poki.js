
let buttonElement = document.querySelector('.button')

buttonElement.addEventListener('click',runSearch)

function runSearch() {
  let inputTotal = document.querySelector('.input-number').value;
  let innerValue = document.querySelector('.inputElement').value;

  fetch('https://pokeapi.co/api/v2/type?limit=21')
  .then(response => response.json())
  .then(data => {
    const pokemonList = data.results;
    document.querySelector('.card-holder').innerHTML =
      ``;

   let count = 0;

    for (let i = 0; i < pokemonList.length; i++) {

    if (innerValue === pokemonList[i].name) {

        fetch(pokemonList[i].url)
       .then(response => response.json())
       .then(data => {
          const List = data.pokemon;
          console.log(List);

          for(let j = 0; j<List.length; j++){
        
            if(count < inputTotal){
            fetch(List[j].pokemon.url)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.species.name;
                const id = data.id;
                const types = data.types;
                let category = types[0].type.name;
                
                for(let h=1; h<types.length; h++){
                    category += " "+types[h].type.name;
                }
      
                document.querySelector('.card-holder').innerHTML += 
                         `<div class="card">
                         <div class="img"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"></div>
                         <div>id: ${id} </div>
                          <div>name: ${pokemonName}</div>
                          <div>type: ${category}</div>`
                })
                .catch(error => console.error('Error fetching Pokémon data:', error));
                count++;
              }
}
}
  )
  .catch(error => console.error('Error fetching Pokémon data:', error));

    innerValue = '';
    document.querySelector('.input-number').value = '';
    document.querySelector('.inputElement').value = '';
  }}
})
  .catch(error => console.error('Error fetching Pokémon data:', error));
}