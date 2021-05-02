import { TKN_TREE_OPN as OPEN, TKN_TREE_CLS as CLOSE, TKN_DOT as DOT } from "../../src/converter/lexer";
import { TOKEN, TKN_NIL as NIL } from "../../src/trees/TreeLexer";
import ParserException from "../exceptions/ParserException";

export type BinaryTree = {
	left: BinaryTree,
	right: BinaryTree,
} | null;

/**
 * Make sure the next token is an expected type.
 * Throw an error otherwise
 * @param token		The actual next token
 * @param expected	The expected next token(s)
 */
function _expectToken(token : TOKEN|undefined, ...expected: TOKEN[]) : TOKEN {
	//No tokens left
	if (token === undefined) throw new ParserException(`Unexpected end of statement: Expected '${DOT}'`);
	//Wrong token received
	if (expected.indexOf(token) === -1) {
		let expectedString: string;
		if (expected.length === 1) expectedString = `'${expected[0]}'`;
		else expectedString = `one of ['${expected.join("', '")}']`;
		throw new ParserException(`Unexpected token: Expected ${expectedString} but got '${token}'`);
	}
	//Return the token
	return token;
}

/**
 * Parse a token list into a tree node
 * @param tokenList	The list of tokens
 */
function _tokensToTree(tokenList: TOKEN[]) : BinaryTree {
	//Get the first token in the list
	const token : TOKEN|undefined = tokenList.shift();
	//Treat empty string as `nil`
	if (token === undefined) return null;
	//Require the first token to be '<' or 'nil'
	_expectToken(token, OPEN, NIL);

	//Of format "OPEN [TREE] DOT [TREE] CLOSE" ("<nil.nil>")
	if (token === OPEN) {
		//Parse the left tree
		const left : BinaryTree = _tokensToTree(tokenList);

		//Check for the dot separating the subtrees
		_expectToken(tokenList.shift(), DOT);

		//Parse the right tree
		const right : BinaryTree = _tokensToTree(tokenList);

		//Check the opening symbol has a matching closing symbol
		_expectToken(tokenList.shift(), CLOSE);

		//Return the created tree
		return {
			left: left,
			right: right,
		};
	}
	//Otherwise `nil` - represented by `null`
	return null;
}

/**
 * Parse a token list into a binary tree
 * @param tokenList		The token list to parse
 */
export default function parse(tokenList: TOKEN[]) : BinaryTree {
	//Parse into a binary tree
	const tree : BinaryTree = _tokensToTree(tokenList);
	//Shouldn't be any unparsed tokens
	if (tokenList.length > 0) {
		throw new ParserException(`Unexpected token: Expected end of statement but got '${tokenList.shift()}'`);
	}
	//Return the tree
	return tree;
}