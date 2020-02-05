
class Part {
	constructor(params = {}, partTypeList) {
		if (params.typeName) {
			this.type = partTypeList.find(params.typeName);
		}
		this.x = null;
		this.y = null;
	}
}

export default Part;
