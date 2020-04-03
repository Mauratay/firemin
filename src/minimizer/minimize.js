import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import generateFile from '../generator/generateFile'
import generateString from '../generator/generateString'
import generateTokenList from '../generator/generateTokenList'
import minimizeAST from './minimizeAST'
import minimizeTokenList from './minimizeTokenList'
import parseFile from '../parser/parseFile'

const minimize = async (context, { filePath, outputFilePath }) => {
  filePath = resolve(filePath)
  if (!(await pathExists(filePath))) {
    throw new Error(`rules file '${filePath}' does not exist`)
  }

  const ast = await parseFile(context, { filePath })
  const minimizedAST = await minimizeAST(context, { ast })
  const minimizedTokenList = minimizeTokenList(context, {
    tokenList: generateTokenList(context, { ast: minimizedAST })
  })

  // let log = '['
  // minimizedTokenList.forEach((listToken) => {
  //   log += `  ${listToken.type},\n`
  // })
  // log += ']'
  // console.log(log)
  if (outputFilePath) {
    outputFilePath = resolve(outputFilePath)
    return await generateFile(context, {
      outputFilePath,
      tokenList: minimizedTokenList
    })
  }
  return generateString(context, { tokenList: minimizedTokenList })
}

export default minimize
