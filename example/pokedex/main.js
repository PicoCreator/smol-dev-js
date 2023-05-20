let pokemonContainer = document.querySelector('#pokemon-container');

for (let i = 0; i < pokemonData.length; i++) {  
	let pokemon = document.createElement('div');  
	pokemon.classList.add('pokemon');  

	let name = document.createElement('h2');  
	name.textContent = pokemonData[i].name;  

	let id = document.createElement('p');  
	id.textContent = `#${pokemonData[i].id}`;  

	let image = document.createElement('img');  
	image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData[i].id}.png`;  

	let info = document.createElement('div');  
	info.classList.add('info');  
	info.textContent = pokemonData[i].info;  
	info.style.display = 'none';  

	pokemon.appendChild(name);  
	pokemon.appendChild(id);  
	pokemon.appendChild(image);  
	pokemon.appendChild(info);  

	pokemon.addEventListener('click', () => {  
		if (info.style.display === 'none') {  
			showInfo(pokemon);  
		} else {  
			hideInfo(pokemon);  
		}  
	});  

	pokemonContainer.appendChild(pokemon);  
}