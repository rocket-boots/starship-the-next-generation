import Part from './Part.js';

class Starship {
	constructor() {
		this.parts = [];
	}

	addPart(part, position) {
		if (!(part instanceof Part)) {
			return false;
		}
		// TODO: make sure it's not a part already on the ship ... otherwise remove?
		// TODO: make sure it doesn't overlap an existing part
		this.parts.push(part);
	}
}

export default Starship;
