import { append, slice } from 'ramda'
import DivideOperator from '../nodes/DivideOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseDivideOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = DivideOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseDivideOperator
