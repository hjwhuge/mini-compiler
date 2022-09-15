export enum TokenTypes {
  paren,
  name,
  number,
}

export interface token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string) {
  let tokens: token[] = [];
  let current = 0;

  while (current < code.length) {
    let char = code[current];
    if (char === "(") {
      tokens.push({
        type: TokenTypes.paren,
        value: char,
      });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: TokenTypes.paren,
        value: char,
      });
      current++;
      continue;
    }

    const spaceReg = /\s/;
    if (spaceReg.test(char)) {
      current++;
      continue;
    }

    const strReg = /[a-z]/i;
    if (strReg.test(char)) {
      let values = "";
      while (strReg.test(char) && current < code.length) {
        values += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.name,
        value: values,
      });
    }

    const numReg = /[0-9]/;
    if (numReg.test(char)) {
      let values = "";
      while (numReg.test(char) && current < code.length) {
        values += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.number,
        value: values,
      });
    }
  }

  return tokens;
}
