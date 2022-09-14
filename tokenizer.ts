interface token {
  type: string;
  value: string;
}

export function tokenizer(code: string) {
  let tokens: token[] = [];
  let current = 0;

  while (current < code.length) {
    let chart = code[current];
    if (chart === "(") {
      tokens.push({
        type: "paren",
        value: chart,
      });
      current++;
      continue;
    }

    if (chart === ")") {
      tokens.push({
        type: "paren",
        value: chart,
      });
      current++;
      continue;
    }

    const spaceReg = /\s/;
    if (spaceReg.test(chart)) {
      current++;
      continue;
    }

    const strReg = /[a-z]/;
    if (strReg.test(chart)) {
      let values = "";
      while (strReg.test(chart) && current < code.length) {
        values += chart;
        chart = code[++current];
      }
      tokens.push({
        type: "name",
        value: values,
      });
    }

    const numReg = /[0-9]/;
    if (numReg.test(chart)) {
      let values = "";
      while (numReg.test(chart) && current < code.length) {
        values += chart;
        chart = code[++current];
      }
      tokens.push({
        type: "number",
        value: values,
      });
    }
  }

  return tokens;
}
