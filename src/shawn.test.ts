import { rephrase } from './shawn'

interface TestConfig {
  phrase : string,
  expected: any,
}


const TEST_NONPEDANTIC_INPUT_OUTPUT : Array<TestConfig> = [
	{ phrase: 'sapp', expected: 'shapp'},
	{ phrase: 'swpp', expected: 'swpp'},
	{ phrase: 'sh', expected: 'sh'},
	{ phrase: 'sw', expected: 'sw'},
	{ phrase: 'sp', expected: 'sp'},
	{ phrase: 'ca', expected: 'ca'},
	{ phrase: 'ci', expected: 'shi'},
	{ phrase: 'cy', expected: 'shy'},
	{ phrase: 'ss', expected: 'sh'},
	{ phrase: 'sss', expected: 'sh'},
	{ phrase: 'ssss', expected: 'sh'},
	{ phrase: '    ', expected: '    '},
	{ phrase: 'Ke$ha is $$$', expected: 'Ke$ha ish $$$'},
	{ phrase: 'hAl', expected: 'hAl'},
	{ phrase: 'HAL', expected: 'HAL'},
	{ phrase: 'Hal', expected: 'Hal'},
	{ phrase: 'Multiple words', expected: 'Multiple wordsh'},
	{ phrase: 'shshshsh', expected: 'sh'},
	{ phrase: ' Wham-O owns the Frisbee name.', expected: ' Wham-O ownsh the Frishbee name.'},
	{ phrase: 'I see Sean steals sheep by the seashore.', expected: 'I shee Shawn shtealsh sheep by the sheashore.'}
]

const TEST_PEDANTIC_INPUT_OUTPUT : Array<TestConfig> = [
	{ phrase: 'Word', expected: 'Shaw'},
	{ phrase: 'WORD', expected: 'Shaw'},
	{ phrase: 'word', expected: 'shaw'},
	{ phrase: 'eBay', expected: 'Shaw'},
	{ phrase: 'eBay.com', expected: 'Shaw'},	
	{ phrase: '', expected: 'shaw'},
	{ phrase: ' ', expected: 'shaw shaw'},
	{ phrase: '  ', expected: 'shaw shaw shaw'},
	{ phrase: 'Go to eBay.com for good deals.', expected: 'Shaw shaw Shaw shaw shaw shaw'},
	{ phrase: 'multi-word phrase', expected: 'shaw shaw'},
	{ phrase: 'multi word phrase', expected: 'shaw shaw shaw'},
]

describe('rephrase', () => {
	const NEVER_AGAIN = 'Never send me that atrocious sentence again.'
	describe('never again', () => {
		test('pedantic', () => {
			expect(rephrase('foo', true)).toBe('shaw')
			expect(rephrase('foo', true)).toBe(NEVER_AGAIN)
			expect(rephrase('Foo', true)).toBe('Shaw')
			expect(rephrase('Foo', true)).toBe(NEVER_AGAIN)
		})
		test('nonpedantic', () => {
			expect(rephrase('bar', false)).toBe('bar')
			expect(rephrase('bar', false)).toBe(NEVER_AGAIN)
			expect(rephrase('Bar', false)).toBe('Bar')
			expect(rephrase('Bar', false)).toBe(NEVER_AGAIN)
		})
		test('crossover', () => {
			expect(rephrase('baz', true)).toBe('shaw')
			expect(rephrase('baz', false)).toBe(NEVER_AGAIN)
			expect(rephrase('quux', false)).toBe('quux')
			expect(rephrase('quux', true)).toBe(NEVER_AGAIN)
		})
		test('multi word phrase', () => {
			expect(rephrase('I went to the bar', false)).toBe('I went to the bar')
			expect(rephrase('He went to the bar', true)).toBe('Shaw shaw shaw shaw shaw')
		})
	})
	describe('nonpedantic nonrepeating input', () => {
		TEST_NONPEDANTIC_INPUT_OUTPUT.forEach((wordConfig : TestConfig) => {
			const { phrase: phrase, expected } = wordConfig
			test(phrase, () => {
				expect(rephrase(phrase, false)).toBe(expected)
			})
		})
	})
	describe('pedantic nonrepeating input', () => {
		TEST_PEDANTIC_INPUT_OUTPUT.forEach((wordConfig : TestConfig) => {
			const { phrase: phrase, expected } = wordConfig
			test(phrase, () => {
				expect(rephrase(phrase, true)).toBe(expected)
			})
		})
	})
})
