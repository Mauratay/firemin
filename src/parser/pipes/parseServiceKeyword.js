import { append, slice } from 'ramda'
import ServiceKeyword from '../nodes/ServiceKeyword'
import generateTokenList from '../../generator/generateTokenList'

const parseServiceKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = ServiceKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    keyword,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseServiceKeyword
