import Starship from './Starship.js';
import Part from './Part.js';
import partTypeList from './part-type-list.js';
import PseudoRandomNumberGenerator from './PseudoRandomNumberGenerator.js';

function makeNewPart(params) {
	return new Part(params, partTypeList);
}

class StarshipGenerator {
	constructor(seed = 1) {
		this.prng = new PseudoRandomNumberGenerator(seed);
	}

	addRectangle(ship, w, h, x, y) {
		const wallPartParams = { typeName: 'basicHull' };
		const floorPartParams = { typeName: 'basicFloor' };
		const maxY = y + h;
		const maxX = x + w;
		for(let xi = x; xi < maxX; xi++) {
			for(let yi = y; yi < maxY; yi++) {
				const onWall = (yi === y || yi === (maxY - 1) || xi === x || xi === (maxX - 1));
				const part = makeNewPart(onWall ? wallPartParams : floorPartParams, partTypeList);
				ship.addPart(part, xi, yi);
			}
		}
	}

	addMirroredRectangles(ship, w, h, x, y) {
		this.addRectangle(ship, w, h, x, y);
		this.addRectangle(ship, w, h, (-x - w - 1), y);
	}

	addRandomCore(ship) {
		let w = this.prng.randomInt(10) + 2;
		if (w % 2 === 0) { w++; }
		const h = this.prng.randomInt(10) + 2;
		const x = Math.floor(w / -2);
		const y = Math.round(h / -2);
		this.addRectangle(ship, w, h, x, y);
		ship.log(`Adding core: ${w} x ${h} at ${x},${y}`);
	}

	addRandomMirroredRectangles(ship) {
		const w = this.prng.randomInt(8) + 2;
		const h = this.prng.randomInt(8) + 2;
		const x = this.prng.randomInt(6) + 2;
		const y = (this.prng.randomInt(6) + 2) * this.prng.randomDirection();
		this.addMirroredRectangles(ship, w, h, x, y);
	}

	generate(params = {}) {
		if (params.seed) {
			this.prng.setSeed(params.seed);
		}
		console.log('Generating with seed', this.prng.seed);
		const ship = new Starship(partTypeList);
		// TODO: add parts
		this.addRandomCore(ship);
		const mirroredRectangles = this.prng.randomInt(4) + 1;
		for(let r = 0; r < mirroredRectangles; r++) {
			this.addRandomMirroredRectangles(ship);
		}

		// this.addRectangle(ship, 10, 10, 0, 0);
		// const testPart = new Part({ typeName: 'basicHull' });
		// ship.addPart(testPart);
		ship.printLog();

		return ship;
	}
}

export default StarshipGenerator;
