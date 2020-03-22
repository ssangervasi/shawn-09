const rephrase = (phrase: string, pedantic: boolean = false): string => {
	const shawnifier = Shawnifier.getInstance();
	return shawnifier.execute(phrase, pedantic);
}

export class Shawnifier {
	private static instance: Shawnifier;
	private phraseLibrary: string[] = [];

	private constructor() {};

	public static getInstance(): Shawnifier {
		if (!Shawnifier.instance) {
			Shawnifier.instance = new Shawnifier();
		}

		return Shawnifier.instance;
	}

	execute (phrase: string, pedantic: boolean) {
		if (this.phraseLibrary.includes(phrase)) return "Never send me that atrocious sentence again.";
		this.phraseLibrary.push(phrase);

		const words = phrase.split(' ');
		const shawnificationFunc = pedantic ? this.pedanticallyShawnifyWord : this.shawnifyWord;

		return words.map(shawnificationFunc).join(' ');
	}

	pedanticallyShawnifyWord(word: string): string {
		if (word.match(/[A-Z]/)) {
			return 'Shaw';
		} else {
			return 'shaw';
		}
	}

	shawnifyWord(word: string): string {
		if (word === 'Sean') return 'Shawn';

		let shawned = word;
		shawned = shawned.replace(/SH/, 'Sh');
		shawned = shawned.replace(/s(?![whp])/gi, '$&h');
		shawned = shawned.replace(/c(?=[iy])/, 'sh');
		shawned = shawned.replace(/(sh)(?:sh)+/gi, '$1');
		shawned = shawned.replace(/(ss)(?:ss)+/gi, '$1');
		return shawned;
	}
}

export { rephrase }
