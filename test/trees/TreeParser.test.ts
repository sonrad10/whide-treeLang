import { expect } from "chai";
import { describe, it } from "mocha";
import lexTree, { TOKEN } from "../../src/trees/TreeLexer";
import parseTree from "../../src/trees/TreeParser";
import { BinaryTree } from "../../src";
import { t, tn } from "../utils";

describe('TreeParser (valid)', function () {
	describe(`#parseTree('')`, function () {
		it('should produce an empty tree', function () {
			let tokens: TOKEN[] = lexTree('');
			expect(parseTree(tokens)).to.eql(null);
		});
	});

	describe(`#parseTree('nil')`, function () {
		it('should produce an empty tree', function () {
			let tokens: TOKEN[] = lexTree('nil');
			expect(parseTree(tokens)).to.eql(null);
		});
	});

	describe(`#parseTree('<nil.nil>')`, function () {
		it('should produce a tree with 2 empty leaves', function () {
			let tokens: TOKEN[] = lexTree('<nil.nil>');
			expect(parseTree(tokens)).to.eql(
				t(null, null)
			);
		});
	});

	describe(`#parseTree('<<nil.nil>.<nil.nil>>')`, function () {
		it('should produce a tree of trees', function () {
			let tokens: TOKEN[] = lexTree('<<nil.nil>.<nil.nil>>');
			expect(parseTree(tokens)).to.eql(
				t(t(null, null), t(null, null))
			);
		});
	});

	describe(`#parseTree('<<<nil.<nil.nil>>.nil>.<nil.<<nil.nil>.nil>>>')`, function () {
		it('should produce a complex binary tree', function () {
			const expected: BinaryTree = t(
				t(t(null, t(null, null)), null),
				t(null, t(t(null, null), null))
			);
			let tokens: TOKEN[] = lexTree('<<<nil.<nil.nil>>.nil>.<nil.<<nil.nil>.nil>>>');
			const actual: BinaryTree | null = parseTree(tokens);
			expect(actual).to.eql(expected);
		});
	});

	describe(`Numbers`, function() {
		for (let num of [0, 1, 2, 10, 100, 1009]) {
			describe(`#parseTree('${num}')`, function () {
				it(`should convert the number ${num}`, function () {
					let tokens: TOKEN[] = lexTree(`${num}`);
					let expected = tn(num);
					expect(parseTree(tokens)).to.deep.equal(expected);
				});
			});
		}
		describe(`#parseTree('<10.10>')`, function () {
			it('should accept numbers in a tree', function () {
				let tokens: TOKEN[] = lexTree(`<10.10>`);
				let expected = t(tn(10), tn(10));
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('<nil.<1.2>>')`, function () {
			it('should accept numbers in a nested tree', function () {
				let tokens: TOKEN[] = lexTree(`<nil.<1.2>>`);
				let expected = t(null, t(tn(1), tn(2)));
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('<<<1.2>.<3.4>>.<<5.6>.<7.8>>>')`, function () {
			it('should accept numbers in a nested tree', function () {
				let tokens: TOKEN[] = lexTree(`<<<1.2>.<3.4>>.<<5.6>.<7.8>>>`);
				let expected = t(
					t(t(tn(1), tn(2)), t(tn(3), tn(4))),
					t(t(tn(5), tn(6)), t(tn(7), tn(8)))
				);
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
	});

	describe(`Lists`, function() {
		describe(`#parseTree('[]')`, function () {
			it('should parse the empty list', function () {
				let tokens: TOKEN[] = lexTree(`[]`);
				let expected = null;
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('[1]')`, function () {
			it('should parse a list with 1 element', function () {
				let tokens: TOKEN[] = lexTree(`[1]`);
				let expected = t(tn(1), null);
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('[1, 2]')`, function () {
			it('should parse a list of numbers', function () {
				let tokens: TOKEN[] = lexTree(`[1, 2]`);
				let expected = t(tn(1), t(tn(2), null));
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('[1, 2, <nil.nil>, 4]')`, function () {
			it('should parse a list of multiple types', function () {
				let tokens: TOKEN[] = lexTree(`[1, 2, <nil.nil>, 4]`);
				let expected = t(tn(1), t(tn(2), t(t(null, null), t(tn(4), null))));
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('[[[[1,2]]]]')`, function () {
			it('should parse nested lists', function () {
				let tokens: TOKEN[] = lexTree(`[[[[1,2]]]]`);
				let expected = t(t(t(t(tn(1), t(tn(2), null)), null), null), null);
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
		describe(`#parseTree('[[1,2], [<nil.nil>], 5]')`, function () {
			it('should parse a complex list', function () {
				let tokens: TOKEN[] = lexTree(`[[1,2], [<nil.nil>], 5]`);
				let expected =
					t(
						t(tn(1), t(tn(2), null)),
						t(
							t(t(null, null), null),
							t(tn(5), null)
						)
					);
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
	});

	describe(`Booleans`, function() {
		const FALSE = null;
		const TRUE = t(null, null);

		describe(`#parseTree('false')`, function () {
			it('should accept false', function () {
				let tokens: TOKEN[] = lexTree(`false`);
				expect(parseTree(tokens)).to.deep.equal(FALSE);
			});
		});
		describe(`#parseTree('true')`, function () {
			it('should accept true', function () {
				let tokens: TOKEN[] = lexTree(`true`);
				expect(parseTree(tokens)).to.deep.equal(TRUE);
			});
		});
		describe(`#parseTree('<false.<true.true>>')`, function () {
			it('should accept true and false as subtrees', function () {
				let tokens: TOKEN[] = lexTree(`<false.<true.true>>`);
				let expected = t(FALSE, t(TRUE, TRUE));
				expect(parseTree(tokens)).to.deep.equal(expected);
			});
		});
	});

	describe(`Programs as data`, function() {
		//Map of the programs-as-data tokens to their HWhile values
		let tokens = {
			'@asgn': 2,
			'@:=': 2,
			'@doAsgn': 3,
			'@while': 5,
			'@doWhile': 7,
			'@if': 11,
			'@doIf': 13,
			'@var': 17,
			'@quote': 19,
			'@hd': 23,
			'@doHd': 29,
			'@tl': 31,
			'@doTl': 37,
			'@cons': 41,
			'@doCons': 43,
		};
		//Test each individual token
		for (let [token, val] of Object.entries(tokens)) {
			describe(`#parseTree('${token}')`, function () {
				it(`should produce ${val}`, function () {
					expect(parseTree(lexTree(token))).to.eql(tn(val));
				});
			});
		}

		//Test the `add.while` program (https://github.com/alexj136/HWhile/blob/master/examples/add.while)
		//Using its programs-as-data representation as produced by HWhile
		describe(`'add.while'`, function () {
			it(`should produce the same tree as HWhile's output`, function () {
				//The program-as-data representation
				let add = `
				[0, [
					[@:=, 1, [@hd, [@var, 0]]],
					[@:=, 2, [@tl, [@var, 0]]],
					[@while, [@var, 1], [
							[@:=, 2, [
									@cons, [@quote, nil],
									[@var, 2]
								]
							],
							[@:=, 1, [@tl, [@var, 1]]]
						]
					]
				], 2]`;
				//The raw tree value
				const expected_tree = '<nil.<<<<nil.<nil.nil>>.<<nil.nil>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.' +
					'<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>>>>>>>.<<<' +
					'nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>' +
					'>>>>.<nil.nil>>.nil>>.nil>>>.<<<nil.<nil.nil>>.<<nil.<nil.nil>>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil' +
					'.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil' +
					'.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<' +
					'nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>.<nil.nil>>.nil>>.nil>>>.<<<nil.<nil' +
					'.<nil.<nil.<nil.nil>>>>>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<' +
					'nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>.<<nil.nil>.nil>>.<<<<nil.<nil.nil>>.<<nil.<nil.nil>>.<<<nil.<nil.' +
					'<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.' +
					'<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.nil>>' +
					'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<' +
					'nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>>>.<nil.nil>>.<<<nil.<nil.<nil.<nil.<nil.' +
					'<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>.<<nil.<nil.nil>>.' +
					'nil>>.nil>>>.nil>>>.<<<nil.<nil.nil>>.<<nil.nil>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil' +
					'.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil' +
					'.<nil.nil>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.<<<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<nil.<' +
					'nil.<nil.<nil.<nil.<nil.<nil.nil>>>>>>>>>>>>>>>>>.<<nil.nil>.nil>>.nil>>.nil>>>.nil>>.nil>>>.nil>>>.' +
					'<<nil.<nil.nil>>.nil>>>';
				expect(parseTree(lexTree(add))).to.eql(parseTree(lexTree(expected_tree)));
			});
		});
	});
});

describe('TreeParser (invalid syntax)', function () {
	//Unmatched brackets
	describe(`#parseTree('<')`, function () {
		it('should detect an unmatched opening bracket', function () {
			let tokens: TOKEN[] = lexTree('<');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected end of input`);
		});
	});
	describe(`#parseTree('<nil.<nil.nil>')`, function () {
		it('should detect an unmatched opening bracket', function () {
			let tokens: TOKEN[] = lexTree('<nil.<nil.nil>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected end of input: Expected '>'`);
		});
	});
	describe(`#parseTree('>')`, function () {
		it('should detect an unmatched closing bracket', function () {
			let tokens: TOKEN[] = lexTree('>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: '>'`);
		});
	});
	describe(`#parseTree('nil.nil')`, function () {
		it('should detect tree without brackets', function () {
			let tokens: TOKEN[] = lexTree('nil.nil');
			expect(() => parseTree(tokens)).to.throw(Error, `Expected end of statement but got '.'`);
		});
	});


	//Missing tree element
	describe(`#parseTree('<nil>')`, function () {
		it('should detect a tree with only one child', function () {
			let tokens: TOKEN[] = lexTree('<nil>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: expected '.' got '>'`);
		});
	});
	describe(`#parseTree('<<nil.nil>>')`, function () {
		it('should detect a tree with only one child', function () {
			let tokens: TOKEN[] = lexTree('<<nil.nil>>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: expected '.' got '>'`);
		});
	});
	describe(`#parseTree('<<nil>.nil>')`, function () {
		it('should detect a nested tree with only one child', function () {
			let tokens: TOKEN[] = lexTree('<<nil>.nil>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: expected '.' got '>'`);
		});
	});
	describe(`#parseTree('<.nil>')`, function () {
		it('should detect a tree with an empty child', function () {
			let tokens: TOKEN[] = lexTree('<.nil>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: '.'`);
		});
	});
	describe(`#parseTree('<nil.>')`, function () {
		it('should detect a tree with an empty child', function () {
			let tokens: TOKEN[] = lexTree('<nil.>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: '>'`);
		});
	});
	describe(`#parseTree('<.<nil.nil>>')`, function () {
		it('should detect a tree with an empty child', function () {
			let tokens: TOKEN[] = lexTree('<.<nil.nil>>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: '.'`);
		});
	});

	//Too many tree elements
	describe(`#parseTree('<nil.nil.nil>')`, function () {
		it('should detect a tree with too many elements', function () {
			let tokens: TOKEN[] = lexTree('<nil.nil.nil>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: expected '>' got '.'`);
		});
	});
	describe(`#parseTree('<nil.<nil.nil.nil>>')`, function () {
		it('should detect a nested tree with too many elements', function () {
			let tokens: TOKEN[] = lexTree('<nil.<nil.nil.nil>>');
			expect(() => parseTree(tokens)).to.throw(Error, `Unexpected token: expected '>' got '.'`);
		});
	});
});
