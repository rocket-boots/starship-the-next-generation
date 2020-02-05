import PartType from './PartType.js';

class PartTypeList {
	constructor() {
		this.types = [];
	}

	add(partTypeParams) {
		const type = new PartType(partTypeParams);
		this.types.push(type);
	}

	find(typeKey) {
		return this.types.find((type) => {
			return type.key === typeKey;
		});
	}
}

const partTypeList = new PartTypeList();

const partTypeData = {
	"basic-hull": { test: 123 }
};

Object.keys(partTypeData).forEach((key) => {
	const partTypeParams = partTypeData[key];
	const params = { ...partTypeParams, key };
	partTypeList.add(params);
});

export default partTypeList;
