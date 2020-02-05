import Part from './Part.js';

class Starship {
	constructor(partTypeList) {
		this.parts = [];
	}

	addPart(part, x, y) {
		if (!(part instanceof Part)) {
			return false;
		}
		// TODO: make sure it's not a part already on the ship ... otherwise remove?
		// TODO: make sure it doesn't overlap an existing part
		part.x = x;
		part.y = y;
		this.parts.push(part);
	}
}

export default Starship;
