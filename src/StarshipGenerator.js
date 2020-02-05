import Starship from './Starship.js';
import Part from './Part.js';

class StarshipGenerator {
	constructor() {

	}

	generate() {
		const ship = new Starship();
		// TODO: add parts
		const testPart = new Part({ typeName: 'basic-hull' });
		ship.addPart(testPart);

		return ship;
	}
}

export default StarshipGenerator;
