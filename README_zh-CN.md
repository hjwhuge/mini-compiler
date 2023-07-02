# 迷你编译器

> 最小的编译器

[English](README.md) | 简体中文

## 步骤

### 1、解析

- [词法分析](./src/tokenizer.ts)

```javascript
input
  "(add 2 (subtract 4 2))"
ouput(Tokens)
  [
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'add'      },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'subtract' },
    { type: 'number', value: '4'        },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: ')'        },
    { type: 'paren',  value: ')'        },
  ]
```

- [语法分析](./src/parser.ts)

```javascript
input(Tokens)
  [
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'add'      },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'subtract' },
    { type: 'number', value: '4'        },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: ')'        },
    { type: 'paren',  value: ')'        },
  ]
ouput(AST)
  {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: '2',
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
    }]
  }
```

### 2、转换

- [遍历 AST](./src/traverse.ts)
    > 深度优先

  ```javascript
  input(AST)
  {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: '2',
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
    }]
  }
  ouput(Traversal order)
  [
    "program-enter",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-exit",
    "callExpression-exit",
    "program-exit",
  ]
  ```

- [转换 AST](./src/transformer.ts)

  ```javascript
          Original AST            |      Transformed AST
  {                               | {
    type: 'Program',              |   type: 'Program',
    body: [{                      |   body: [{
      type: 'CallExpression',     |     type: 'ExpressionStatement',
      name: 'add',                |     expression: {
      params: [{                  |       type: 'CallExpression',
        type: 'NumberLiteral',    |       callee: {
        value: '2'                |         type: 'Identifier',
      }, {                        |         name: 'add'
        type: 'CallExpression',   |       },
        name: 'subtract',         |       arguments: [{
        params: [{                |         type: 'NumberLiteral',
          type: 'NumberLiteral',  |         value: '2'
          value: '4'              |       }, {
        }, {                      |         type: 'CallExpression',
          type: 'NumberLiteral',  |         callee: {
          value: '2'              |           type: 'Identifier',
        }]                        |           name: 'subtract'
      }]                          |         },
    }]                            |         arguments: [{
  }                               |           type: 'NumberLiteral',
                                  |           value: '4'
                                  |         }, {
                                  |           type: 'NumberLiteral',
                                  |           value: '2'
                                  |         }]
                                  |        }]
                                  |       }
                                  |    }]
                                  | }
  ```

### 3、[代码生成](./src/codeGenerator.ts)

  ```javascript
  input(AST)
  {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "add",
          },
          arguments: [
            {
              type: "NumberLiteral",
              value: "2",
            },
            {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "subtract",
              },
              arguments: [
                {
                  type: "NumberLiteral",
                  value: "4",
                },
                {
                  type: "NumberLiteral",
                  value: "2",
                },
              ],
            },
          ],
        },
      },
    ],
  }
  output(code)
  "add(2, subtract(4, 2));"
  ```

## 总结

[编译器](./src/index.ts)

1.  input => tokenizer => tokens
2.  tokens => parser => ast
3.  ast => transformer => newAst
4.  newAst => generator => output

与 the-super-tiny-compiler 的不同之处

- use Typescript
- use Vitest

## 🌸 致谢

该项目深受以下优秀项目的启发。

- [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
