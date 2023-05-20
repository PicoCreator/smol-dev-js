# A simple pokemon website

A simple HTML webpage showing the first 50 list of pokemon, with its name and ID

## Files

### pokemon.js   

A JS file that contains data for 50 pokemons, with name, id, type  
This is stored inside `pokemonData` variable, which is made avaliable globally in the browser context.  

Do not store the image URL here.  
Ensure all 50 pokemon are included.

### index.html  

Simple HTML file to load the page.  

### index.css   

Style sheet for index.html.  The .pokemon class is now tiled.

### main.js   

Loads the pokemon list, and renders it into the page, includes the loading of images.  
This MUST not include `pokemonData` as this would be loaded by `index.html` which includes `pokemon.js`  

This will also load the image using just the id via `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

This file has been updated to use the #pokemon-container ID instead of the .pokemon-container class, as per the feedback.