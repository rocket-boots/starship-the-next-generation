import PartType from './PartType.js';

class PartTypeList {
	constructor(data = {}) {
		this.types = [];
		this.build(data);
	}

	build(partTypeData = {}) {
		Object.keys(partTypeData).forEach((key) => {
			const partTypeParams = partTypeData[key];
			const params = { ...partTypeParams, key };
			this.add(params);
		});
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

export default PartTypeList;
