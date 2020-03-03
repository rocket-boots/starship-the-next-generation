import Part from './Part.js';

const CARDINAL_DIRECTIONS = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];
const DIAGNOL_DIRECTIONS = [{x: 1, y: 1}, {x: -1, y: 1}, {x: -1, y: 1}, {x: -1, y: -1}];
const ALL_DIRECTIONS = [...CARDINAL_DIRECTIONS, ...DIAGNOL_DIRECTIONS];

class Starship {
	constructor(partTypeList) {
		this.parts = new Set();
		this.coordinateLookup = {};
		this.logMessages = [];
	}

	addPart(part, x, y, options = {}) {
		if (!(part instanceof Part)) {
			return false;
		}
		part.x = x;
		part.y = y;

		if (this.findPartAtCoordinate(x, y)) {
			if (!options.overwrite) {
				// console.warn('cannot add shape at coordinate', x, y, this);
				// TODO: do something if there's a potential overlap with existing part?
				return false;
			}
			this.parts.delete(this.findPartAtCoordinate(x, y));
		}
		this.coordinateLookup[this.getCoordinateLookupKey(x, y)] = part;
		this.parts.add(part);
		return true;
	}

	getCoordinateLookupKey(x, y) {
		return `${x},${y}`;
	}

	findPartAtCoordinate(x, y) {
		return this.coordinateLookup[this.getCoordinateLookupKey(x, y)];
	}

	checkConnectivity(x = 0, y = 0, requirements = {}) {
		const consideredParts = Array.from(this.parts).filter((part) => {
			return (!requirements.passable || (requirements.passable && part.isPassable()));
		});
		const connectedParts = this.floodAround(requirements, x, y);
		const disconnectedParts = new Set(
			consideredParts.filter((part) => !connectedParts.has(part))	
		);
		const isAllConnected = (disconnectedParts.size === 0 && connectedParts.size === consideredParts.length);
		return { isAllConnected, consideredParts, connectedParts, disconnectedParts };
	}

	flood(requirements = {}, x, y, floodedParts) {
		const part = this.findPartAtCoordinate(x, y);
		if (!part || floodedParts.has(part)) { return; }
		// check requirements
		if (requirements.passable && !part.isPassable()) { return; }
		floodedParts.add(part);
		this.floodAround(requirements, x, y, floodedParts);
	}

	floodAround(requirements = {}, x, y, floodedPartsParam) {
		const floodedParts = floodedPartsParam || new Set();
		ALL_DIRECTIONS.forEach((dir) => {
			this.flood(requirements, x + dir.x, y + dir.y, floodedParts);
		});
		return floodedParts;
	}

	findLeaks() {
		const leaks = new Set();
		this.parts.forEach((part) => {
			if (!part.isPassable()) { return; }
			ALL_DIRECTIONS.forEach((dir) => {
				const x = part.x + dir.x;
				const y = part.y + dir.y;
				const neighbor = this.findPartAtCoordinate(x, y);
				if (!neighbor) {
					leaks.add({x, y});
				}
			});
		});
		return leaks;
	}

	log(m) {
		this.logMessages.push(m);
	}

	printLog() {
		this.logMessages.forEach(m => console.log(m));
	}

	getDimensions() {
		let minY = Infinity;
		let maxY = -Infinity;
		let minX = Infinity;
		let maxX = -Infinity;
		this.parts.forEach((part) => {
			if (part.x < minX) { minX = part.x; }
			if (part.x > maxX) { maxX = part.x;	}
			if (part.y < minY) { minY = part.y; }
			if (part.y > maxY) { maxY = part.y;	}
		});
		return { minX, maxX, minY, maxY };
	}

	getArray() { // 2-dimensional array
		const dims = this.getDimensions();
		const arr = [];
		for(let y = dims.minY; y <= dims.maxY; y++) {
			const arrX = [];
			let i = 0;
			for(let x = dims.minX; x <= dims.maxX; x++) {
				const part = this.findPartAtCoordinate(x, y);
				if (part) {
					arrX[i] = part;
				}
				i++;
			}
			arr.push(arrX);
		}
		return arr;
	}

	get1DArray() {
		return Array.from(this.parts);
	}

	getTotalPartCount() {
		return this.parts.size;
	}

	getTextArray() {
		const arr = this.getArray();
		const textArr = [];
		let t = '';
		arr.forEach((row) => {
			let textRow = '';
			for(let x = 0; x < row.length; x++) {
				const part = row[x];
				textRow += (part) ? part.getCharacter() : ' ';
			}
			t += textRow + '\n';
			textArr.push(textRow);
		});
		console.log(t);
		return textArr;
	}

	getText() {
		const textArr = this.getTextArray();
		return textArr.join('\n');
	}
}

export default Starship;
