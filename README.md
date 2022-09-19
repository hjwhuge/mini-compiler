# mini-compiler

The smallest compiler

Step

- Parsing

- [Lexical analysis](./tokenizer.ts)

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

- [Syntactic analysis](./parser.ts)

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

- Transformation

  - [Traversal AST](./traverse.ts)
    > depth-first

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

  - [transformer AST](./transformer.ts)

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

- [Code Generator](./codeGenerator.ts)

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

Summarize

[compiler](./compiler.ts)

1.  input => tokenizer => tokens
2.  tokens => parser => ast
3.  ast => transformer => newAst
4.  newAst => generator => output

Unlike the-super-tiny-compiler

- use Typescript
- use Vitest

## 🌸 grateful

This project is deeply inspired by the following great projects.

- [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
