import Starship from './Starship.js';
import Part from './Part.js';
import partTypeList from './part-type-list.js';

function makeNewPart(params) {
	return new Part(params, partTypeList);
}

class StarshipGenerator {
	constructor() {

	}

	addRectangle(ship, w, h, x, y) {
		const wallPartParams = { typeName: 'basicHull' };
		const floorPartParams = { typeName: 'basicFloor' };
		const maxY = y + h;
		const maxX = x + w;
		for(let xi = x; xi < maxX; xi++) {
			for(let yi = y; yi < maxY; yi++) {
				const onWall = (yi === y || yi === maxY || xi === x || xi === maxX);
				const part = makeNewPart(onWall ? wallPartParams : floorPartParams, partTypeList);
				ship.addPart(part, xi, yi);
			}
		}
	}


	generate() {
		const ship = new Starship(partTypeList);
		// TODO: add parts
		this.addRectangle(ship, 10, 10, 0, 0);
		// const testPart = new Part({ typeName: 'basicHull' });
		// ship.addPart(testPart);

		return ship;
	}
}

export default StarshipGenerator;
