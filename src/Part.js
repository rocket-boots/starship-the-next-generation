
class Part {
	constructor(params = {}, partTypeList) {
		if (params.typeName) {
			this.type = partTypeList.find(params.typeName);
		}
		this.x = null;
		this.y = null;
	}

	getCharacter() {
		return this.type.character || '?';
	}
}

export default Part;
