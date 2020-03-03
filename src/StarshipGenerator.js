import Starship from './Starship.js';
import Part from './Part.js';
import partTypeList from './part-type-list.js';
import PseudoRandomNumberGenerator from './PseudoRandomNumberGenerator.js';

const MAX_ISLAND_RESOLVE = 50;
const MAX_PART_CONNECTION = 100;

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

	getRandomRectangleCoords() {
		const w = this.prng.randomInt(8) + 2;
		const h = this.prng.randomInt(8) + 2;
		const x = this.prng.randomInt(6) + 2;
		const y = (this.prng.randomInt(6) + 2) * this.prng.randomDirection();
		return {w, h, x, y};
	}

	addRandomRectangle(ship) {
		const {w, h, x, y} = this.getRandomRectangleCoords();
		this.addRectangle(ship, w, h, x, y);		
	}

	addMirroredRectangles(ship, w, h, x, y) {
		this.addRectangle(ship, w, h, x, y);
		this.addRectangle(ship, w, h, (-x - w + 1), y);
	}

	addRandomMirroredRectangles(ship) {
		const {w, h, x, y} = this.getRandomRectangleCoords();
		this.addMirroredRectangles(ship, w, h, x, y);
	}

	addRandomCore(ship) {
		let w = this.prng.randomInt(10) + 4; // + 4 because we need space around the core
		if (w % 2 === 0) { w++; }
		const h = this.prng.randomInt(10) + 4;
		const x = Math.floor(w / 2) * -1;
		const y = Math.floor(h / 2) * -1;
		this.addRectangle(ship, w, h, x, y);
		// ship.log(`Adding core shape: ${w} x ${h} at ${x},${y}`);
		const core = makeNewPart({ typeName: 'basicCore' }, partTypeList);
		ship.addPart(core, 0, 0, { overwrite: true });
	}

	// An island is a passable (floor) space that is not connected to the core (0, 0)

	resolveIslands(ship, i = 0) {
		const connectivity = ship.checkConnectivity(0, 0, {passable: true});
		// console.log(i, "Connectivity:", connectivity);
		const { isAllConnected, connectedParts, disconnectedParts } = connectivity;
		if (isAllConnected) { return true; }
		if (disconnectedParts.size === 0 || connectedParts.size === 0) {
			console.warn('Something is wrong here', isAllConnected, connectedParts, disconnectedParts);
			return false;
		}
		if (i >= MAX_ISLAND_RESOLVE) { console.warn('Cannot resolve all islands', connectivity); return false; }

		const connectionPartTypeParams = { typeName: 'basicFloor' }; // { typeName: 'newFloor' };
		const part = this.pickRandomPartFromSet(disconnectedParts);
		const destinationPart = this.pickConnectionPart(ship, connectedParts);
		// console.log('Connect', part, destinationPart);
		this.connectParts(ship, part, destinationPart, connectionPartTypeParams);
		// Mirror
		const mirrorPart = ship.findPartAtCoordinate(part.x * -1, part.y);
		if (mirrorPart) {
			this.connectParts(ship, mirrorPart, destinationPart, connectionPartTypeParams);
		}
		return this.resolveIslands(ship, ++i);
	}

	pickRandomPartFromSet(parts) {
		const p = this.prng.randomInt(parts.size) - 1;
		return Array.from(parts)[p];
	}

	pickConnectionPart(ship, connectedParts) {
		// Connect to either the core or another connected part
		const connectToCore = this.prng.randomBoolean();
		if (connectToCore) {
			return ship.findPartAtCoordinate(0, 0);
		}
		return this.pickRandomPartFromSet(connectedParts);
	}

	connectParts(ship, part, destinationPart, partParams = {}, i = 0) {
		if (i >= MAX_PART_CONNECTION) { console.warn('Cannot connect parts'); return false; }
		let { x, y } = part;
		const diff = {x: destinationPart.x - x, y: destinationPart.y - y};
		// console.log('   diff', diff);
		if (Math.abs(diff.x) <= 1 && Math.abs(diff.y) <= 1) { return true; }
		let step = {x: 0, y: 0};
		const newPart = makeNewPart(partParams, partTypeList);
		if (y === destinationPart.y) {
			step.x = ((diff.x > 0) ? 1 : -1);
		} else {
			step.y = ((diff.y > 0) ? 1 : -1);
		}
		ship.addPart(newPart, x + step.x, y + step.y, { overwrite: true });
		// console.log('  new part', newPart);
		return this.connectParts(ship, newPart, destinationPart, partParams, ++i);
	}

	fixWalls(ship) {
		const partParams = { typeName: 'basicHull' };
		const leaks = ship.findLeaks();
		leaks.forEach((loc) => {
			const newWall = makeNewPart(partParams, partTypeList);
			ship.addPart(newWall, loc.x, loc.y);
		});
	}

	generate(params = {}) {
		if (params.seed) {
			this.prng.setSeed(params.seed);
		}
		console.log('Generating with seed', this.prng.seed);
		const ship = new Starship(partTypeList);
		// 20% chance the ship itself allows asymmetry
		const asymmetric = (this.prng.randomInt(5) === 1); // TODO: save value to ship?
		this.addRandomCore(ship);
		const mirroredRectangles = this.prng.randomInt(5) + 1;
		for(let r = 0; r < mirroredRectangles; r++) {
			// 50% chance each part is asymmetric if allowed
			if (asymmetric && this.prng.randomInt(2) === 1) {
				this.addRandomRectangle(ship);
			} else {
				this.addRandomMirroredRectangles(ship);
			}
		}
		this.resolveIslands(ship);
		this.fixWalls(ship);

		// TODO: add parts

		ship.printLog();

		return ship;
	}
}

export default StarshipGenerator;
