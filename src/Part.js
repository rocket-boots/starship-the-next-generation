
class Part {
	constructor(params = {}, partTypeList) {
		if (params.typeName) {
			this.type = partTypeList.find(params.typeName);
		}
		this.x = null;
		this.y = null;
		this.character = null;
	}

	isPassable() {
		return Boolean(this.type.passable);
	}

	getCharacter() {
		return this.character || this.type.character || '?';
	}
}

export default Part;
