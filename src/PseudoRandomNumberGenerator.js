
class PseudoRandomNumberGenerator {
	constructor(seed = 1) {
		this.seed = null;
		this.initialSeed = null;
		this.setSeed(seed);
		// Mulberry32
		// source: bryc's comment on https://gist.github.com/blixt/f17b47c62508be59987b 
		// which is assumed to be Tommy Ettinger's algorithm, which is public domain
		this.mb32 = a=>(t)=>(a=a+1831565813|0,t=Math.imul(a^a>>>15,1|a),t=t+Math.imul(t^t>>>7,61|t)^t,(t^t>>>14)>>>0)/2**32;
	}

	setSeed(seed = 1) {
		this.seed = (typeof seed === 'number') ? seed : Number(seed);
		this.initialSeed = this.seed;
	}

	incrementSeed() {
		this.seed = this.seed + 1831565813|0;
		return this.seed;
	}

	random() {
		let a = this.incrementSeed();
		let t = Math.imul(a^a>>>15, 1|a);
		t = t + Math.imul(t^t>>>7,61|t)^t;
		return ((t^t>>>14)>>>0)/2**32;
	}

	randomInt(x) {
		return Math.floor(this.random() * Math.floor(x)) + 1;
	}

	randomBoolean() {
		return (Math.round(this.random()) === 0);
	}

	randomDirection() {
		return (Math.round(this.random()) === 0) ? 1 : -1;
	}
}

export default PseudoRandomNumberGenerator;
