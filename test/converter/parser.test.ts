import { expect } from "chai";
import { describe, it } from "mocha";
import parse, { ChoiceType, ConversionTree } from "../../src/converter/parser";
import lexer, {
	TKN_BAR,
	TKN_COMMA,
	TKN_DOT,
	TKN_DOTS,
	TKN_LIST_CLS,
	TKN_LIST_OPN,
	TKN_PREN_CLS,
	TKN_PREN_OPN,
	TKN_TREE_CLS,
	TKN_TREE_OPN,
} from "../../src/converter/lexer";

describe(`#parser (valid)`, function () {
	describe('any', function () {
		it('should produce a choice of a single token', function () {
			let str = 'any';
			let tokens = lexer(str);
			expect(parse(
				tokens
			)).to.eql({
				category: 'choice',
				type: ['any']
			});
		});
	});

	describe(`int`, function () {
		it('should produce a choice of a single token', function () {
			let str = 'int';
			let tokens = lexer(str);
			expect(parse(
				tokens
			)).to.eql({
				category: 'choice',
				type: ['int']
			});
		});
	});

	describe('int|any', function () {
		it('should produce a choice in the same order', function () {
			let str = 'int|any';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: ['int', 'any'],
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('((int|any))', function () {
		it('should produce the same result as having no brackets', function () {
			let str = '((int|any))';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: ['int', 'any'],
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('(int|any)|any', function () {
		it('should produce the same result as having no brackets', function () {
			let str = '(int|any)|any';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: ['int', 'any', 'any'],
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('int|(any|any)', function () {
		it('should produce the same result as having no brackets', function () {
			let str = 'int|(any|any)';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: ['int', 'any', 'any'],
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('any|any', function () {
		it(`shouldn't remove duplicate types`, function () {
			let str = 'any|any';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: ['any', 'any'],
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('int[]', function () {
		it('should produce a list of a single type', function () {
			let str = 'int[]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'list',
				type: {
					category: 'choice',
					type: ['int'],
				}
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('(int|any)[]', function () {
		it('should produce a list of these types, preserving order', function () {
			let str = '(int|any)[]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'list',
				type: {
					category: 'choice',
					type: ['int', 'any'],
				}
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('int|any[]', function () {
		it(`should bind 'T[]' more tightly than 'R|S'`, function () {
			let str = 'int|any[]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: [
					'int',
					{
						category: 'list',
						type: {
							category: 'choice',
							type: ['any']
						}
					}
				]
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('0|1|10|999', function () {
		it(`should produce a choice tree of 4 numbers`, function () {
			let str = '0|1|10|999';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: [0, 1, 10, 999]
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('12[]', function () {
		it(`should produce a list tree matching only 12s`, function () {
			let str = '12[]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'list',
				type: {
					category: 'choice',
					type: [12]
				}
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('<any.any>', function () {
		it('should match a tree with any two children', function () {
			let str = '<any.any>';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'tree',
				left: {
					category: 'choice',
					type: ['any']
				},
				right: {
					category: 'choice',
					type: ['any']
				}
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('<any.any[]>', function () {
		it('should match a tree with any left child, and a list-type right child', function () {
			let str = '<any.any[]>';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'tree',
				left: {
					category: 'choice',
					type: ['any']
				},
				right: {
					category: 'list',
					type: {
						category: 'choice',
						type: ['any']
					}
				}
			}
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('<any.(int|any)[]>', function () {
		it('should match a tree with any left child, and a list-type right child of int or any', function () {
			let str = '<any.(int|any)[]>';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'tree',
				left: {
					category: 'choice',
					type: ['any']
				},
				right: {
					category: 'list',
					type: {
						category: 'choice',
						type: ['int', 'any']
					}
				}
			}
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('<nil.nil>[]', function () {
		it('should match a list of a fixed tree type', function () {
			let str = '<nil.nil>[]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'list',
				type: {
					category: 'tree',
					left: {
						category: 'choice',
						type: ['nil']
					},
					right: {
						category: 'choice',
						type: ['nil']
					},
				}
			}
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('any[][][]', function () {
		it('should match any 3-layer nested list', function () {
			let str = 'any[][][]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'list',
				type: {
					category: 'list',
					type: {
						category: 'list',
						type: {
							category: 'choice',
							type: ['any']
						}
					}
				}
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('((int|any)[])[][]', function () {
		it('should match any 3 layer nested list, first as int then as any', function () {
			let str = '((int|any)[])[][]';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'list',
				type: {
					category: 'list',
					type: {
						category: 'list',
						type: {
							category: 'choice',
							type: ['int', 'any'],
						}
					}
				}
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe('(int|any)|any', function () {
		it('should ignore brackets around OR-ed types', function () {
			let str = '(int|any)|any';
			let tokens = lexer(str);
			const expected: ConversionTree = {
				category: 'choice',
				type: ['int', 'any', 'any'],
			};
			expect(
				parse(tokens)
			).to.eql(expected);
		});
	});

	describe(`''`, function () {
		it('should treat an empty list as an `any` input', function () {
			const expected: ConversionTree = {
				category: 'choice',
				type: ['any'],
			};
			expect(
				parse([])
			).to.eql(expected);
		});
	});

	describe(`Fixed list tests`, function () {
		const nil: ChoiceType = {
			category: 'choice',
			type: ['nil'],
		};

		describe(`'[]'`, function () {
			it('should match an empty list only', function () {
				let tokens = lexer('[]');
				const expected: ConversionTree = nil;
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
		describe(`'[nil]'`, function () {
			it('should match ', function () {
				let tokens = lexer('[nil]');
				const expected: ConversionTree = {
					category: 'tree',
					left: nil,
					right: nil,
				};
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
		describe(`'[nil,nil]'`, function () {
			it('should match ', function () {
				let tokens = lexer('[nil,nil]');
				const expected: ConversionTree = {
					category: 'tree',
					left: nil,
					right: {
						category: 'tree',
						left: nil,
						right: nil,
					},
				};
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
		describe(`'[nil,...]'`, function () {
			it('should match ', function () {
				let tokens = lexer('[nil,...]');
				const expected: ConversionTree = {
					category: 'tree',
					left: nil,
					right: {
						category: "choice",
						type: ['any']
					},
				};
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
		describe(`'[nil,any]'`, function () {
			it('should match ', function () {
				let tokens = lexer('[nil,any]');
				const expected: ConversionTree = {
					category: 'tree',
					left: nil,
					right: {
						category: 'tree',
						left: {
							category: 'choice',
							type: ['any'],
						},
						right: nil,
					},
				};
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
		describe(`'[int|any,int|any]'`, function () {
			it('should match ', function () {
				let tokens = lexer('[int|any,int|any]');
				const expected: ConversionTree = {
					category: 'tree',
					left: {
						category: 'choice',
						type: ['int', 'any'],
					},
					right: {
						category: 'tree',
						left: {
							category: 'choice',
							type: ['int', 'any'],
						},
						right: nil,
					},
				};
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
		describe(`'[nil,nil][]'`, function () {
			it('should match ', function () {
				let tokens = lexer('[nil,nil][]');
				const expected: ConversionTree = {
					category: 'list',
					type: {
						category: 'tree',
						left: nil,
						right: {
							category: 'tree',
							left: nil,
							right: nil,
						},
					},
				};
				expect(
					parse(tokens)
				).to.eql(expected);
			});
		});
	});
});

//TODO: Counters
//TODO: Stacked Counters `nil:ctr1::ctr2:`

describe(`#parser (invalid)`, function () {
	describe(`Unmatched tokens`, function () {
		for (let token of [TKN_LIST_OPN, TKN_PREN_OPN, TKN_TREE_OPN]) {
			describe(`'${token}'`, function () {
				it(`should throw an unexpected EOI error`, function () {
					expect(
						() => parse([token])
					).to.throw(
						`Unexpected end of input`
					);
				});
			});
		}
	});
	describe(`Unexpected tokens`, function () {
		for (let token of [TKN_BAR, TKN_COMMA, TKN_DOT, TKN_DOTS, TKN_LIST_CLS, TKN_PREN_CLS, TKN_TREE_CLS]) {
			describe(`'${token}'`, function () {
				it(`should throw an unexpected token error`, function () {
					expect(
						() => parse([token])
					).to.throw(
						`Unexpected token: '${token}'`
					);
				});
			});
		}
	});

	describe(`Unmatched brackets`, function () {
		describe(`'<nil.nil'`, function () {
			it(`should throw an unexpected EOI error`, function () {
				expect(
					() => parse([TKN_TREE_OPN, 'nil', TKN_DOT, 'nil'])
				).to.throw(
						`Unexpected end of input`
				);
			});
		});
		describe(`'[nil,nil'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_LIST_OPN, 'nil', TKN_COMMA, 'nil'])
				).to.throw(
						`Unexpected end of input`
				);
			});
		});
		describe(`'<nil.nil>>'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_TREE_OPN, 'nil', TKN_DOT, 'nil', TKN_TREE_CLS, TKN_TREE_CLS])
				).to.throw(
					`Unexpected token: '>'`
				);
			});
		});
		describe(`'[nil,nil]]'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_LIST_OPN, 'nil', TKN_COMMA, 'nil', TKN_LIST_CLS, TKN_LIST_CLS])
				).to.throw(
					`Unexpected token: ']'`
				);
			});
		});

		describe(`'<nil.nil]'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_TREE_OPN, 'nil', TKN_DOT, TKN_LIST_CLS])
				).to.throw(
					`Unexpected token: ']'`
				);
			});
		});

		describe(`'[nil,nil>'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_LIST_OPN, 'nil', TKN_COMMA, 'nil', TKN_TREE_CLS])
				).to.throw(
					`Unexpected token: expected one of ',', ']' got '>'`
				);
			});
		});
	});

	describe(`Invalid syntax`, function() {
		describe(`'<nil>'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_TREE_OPN, 'nil', TKN_TREE_CLS])
				).to.throw(
					`Unexpected token: expected '.' got '>'`
				);
			});
		});
		describe(`'<nil.>'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_TREE_OPN, 'nil', TKN_DOT, TKN_TREE_CLS])
				).to.throw(
					`Unexpected token: '>'`
				);
			});
		});
		describe(`'[nil.nil]'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_LIST_OPN, 'nil', TKN_DOT, 'nil', TKN_LIST_CLS])
				).to.throw(
					`Unexpected token: expected one of ',', ']' got '.'`
				);
			});
		});
		describe(`'[nil...'`, function () {
			it(`should throw an unexpected token error`, function () {
				expect(
					() => parse([TKN_LIST_OPN, 'nil', TKN_DOT, 'nil', TKN_DOTS])
				).to.throw(
					`Unexpected token: expected one of ',', ']' got '.'`
				);
			});
		});
	});
});