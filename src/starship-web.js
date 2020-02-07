import StarshipGenerator from './StarshipGenerator.js';

(function(){

	const generator = new StarshipGenerator();

	function submitForm(e) {
		e.preventDefault();
		const seed = getSeed();
		const ship = generator.generate({ seed });
		console.log(ship);
		window.ship = ship;
		displayTextShip(ship);

		const seedInput = document.getElementById('starship-seed');
		seedInput.value = seed;
	}

	function getSeed() {
		const seedInputLock = document.getElementById('starship-seed-lock');
		if (seedInputLock.checked) {
			const seedInput = document.getElementById('starship-seed');
			return seedInput.value; 
		}
		return (Math.floor(Math.random() * 99999) + 1);
	}

	function setupDom() {
		const form = document.getElementById('starship-generation-form');
		form.addEventListener('submit', submitForm);
	}

	function displayTextShip(ship) {
		const textbox = document.getElementById('starship-textbox');
		textbox.value = ship.getText();
	}


	document.addEventListener('DOMContentLoaded', setupDom);

	if (window) {
		window.gen = generator;
	}

})();
