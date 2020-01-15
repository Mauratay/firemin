import {
  COMMENT,
  OPERATOR_ASSIGNMENT,
  OPERATOR_CLOSE_BRACKET,
  OPERATOR_CLOSE_CURLY_BRACE,
  OPERATOR_CLOSE_PARENTHESIS,
  OPERATOR_COLON,
  OPERATOR_COMMA,
  OPERATOR_DOT,
  OPERATOR_FORWARD_SLASH,
  OPERATOR_LOGICAL_AND,
  OPERATOR_LOGICAL_NOT,
  OPERATOR_LOGICAL_OR,
  OPERATOR_OPEN_BRACKET,
  OPERATOR_OPEN_CURLY_BRACE,
  OPERATOR_OPEN_PARENTHESIS,
  STATEMENT_TERMINATOR,
  WHITESPACE
} from '../constants/TOKEN_TYPES'

const minimizeTokenList = (context, { tokenList }) =>
  tokenList
    // filter out comments
    .filter((token) => token.type !== COMMENT)
    // Replace all whitespace spans with a single space
    .map((token) => {
      if (token.type === WHITESPACE) {
        if (token.length > 1) {
          return {
            length: 1,
            type: WHITESPACE,
            value: ' '
          }
        }
      }
      return token
    })
    .filter((token, index, list) => {
      if (index > 0) {
        if (index === list.length - 1) {
          return token.type !== WHITESPACE
        }
        const prevToken = list.get(index - 1)
        const nextToken = list.get(index + 1)
        if (token.type === WHITESPACE) {
          return (
            prevToken.type !== WHITESPACE &&
            prevToken.type !== OPERATOR_ASSIGNMENT &&
            prevToken.type !== OPERATOR_CLOSE_BRACKET &&
            prevToken.type !== OPERATOR_CLOSE_CURLY_BRACE &&
            prevToken.type !== OPERATOR_CLOSE_PARENTHESIS &&
            prevToken.type !== OPERATOR_COLON &&
            prevToken.type !== OPERATOR_COMMA &&
            prevToken.type !== OPERATOR_DOT &&
            prevToken.type !== OPERATOR_FORWARD_SLASH &&
            prevToken.type !== OPERATOR_LOGICAL_AND &&
            prevToken.type !== OPERATOR_LOGICAL_NOT &&
            prevToken.type !== OPERATOR_LOGICAL_OR &&
            prevToken.type !== OPERATOR_OPEN_BRACKET &&
            prevToken.type !== OPERATOR_OPEN_CURLY_BRACE &&
            prevToken.type !== OPERATOR_OPEN_PARENTHESIS &&
            prevToken.type !== STATEMENT_TERMINATOR &&
            nextToken.type !== OPERATOR_ASSIGNMENT &&
            nextToken.type !== OPERATOR_CLOSE_BRACKET &&
            nextToken.type !== OPERATOR_CLOSE_CURLY_BRACE &&
            nextToken.type !== OPERATOR_CLOSE_PARENTHESIS &&
            nextToken.type !== OPERATOR_DOT &&
            nextToken.type !== OPERATOR_FORWARD_SLASH &&
            nextToken.type !== OPERATOR_LOGICAL_AND &&
            nextToken.type !== OPERATOR_LOGICAL_NOT &&
            nextToken.type !== OPERATOR_LOGICAL_OR &&
            nextToken.type !== OPERATOR_OPEN_BRACKET &&
            nextToken.type !== OPERATOR_OPEN_CURLY_BRACE &&
            nextToken.type !== OPERATOR_OPEN_PARENTHESIS
          )
        }
      }
      return true
    })

export default minimizeTokenList