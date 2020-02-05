import StarshipGenerator from './StarshipGenerator.js';

(function(){

	const generator = new StarshipGenerator();

	function submitForm(e) {
		e.preventDefault();
		const ship = generator.generate();
		console.log(ship);
		window.ship = ship;
	}

	function setupDom() {
		const form = document.getElementById('starship-generation-form');
		form.addEventListener('submit', submitForm);
	}


	document.addEventListener('DOMContentLoaded', setupDom);

	if (window) {
		window.gen = generator;
	}

})();
