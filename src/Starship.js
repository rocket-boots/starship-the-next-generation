import Part from './Part.js';

class Starship {
	constructor(partTypeList) {
		this.parts = new Set();
		this.coordinateLookup = {};
		this.logMessages = [];
	}

	addPart(part, x, y) {
		if (!(part instanceof Part)) {
			return false;
		}
		part.x = x;
		part.y = y;

		if (this.findPartAtCoordinate(x, y)) {
			// TODO: do something if there's a potential overlap with existing part?
		} else {
			this.coordinateLookup[this.getCoordinateLookupKey(x, y)] = part;
			this.parts.add(part);
		}
	}

	getCoordinateLookupKey(x, y) {
		return `${x},${y}`;
	}

	findPartAtCoordinate(x, y) {
		return this.coordinateLookup[this.getCoordinateLookupKey(x, y)];
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

	getArray() {
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
