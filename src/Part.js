import partTypeList from './partTypeList.js';

class Part {
	constructor(params = {}) {
		if (params.typeName) {
			this.type = partTypeList.find(params.typeName);
		}
	}
}

export default Part;
