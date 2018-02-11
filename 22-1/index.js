console.log('Hello, baby. It\'s v2.0.1');
module.exports = (polishNotationString, message) => {
    let tokens = polishNotationString.split(' ');

    console.log(message);
    return Calculator.calculate(tokens);
};


const Calculator = {
    calculate: (tokens) => {
        let end = tokens.length,
            stack = [];

        for (let i = 0; i < end; i++) {
            let token = tokens[i];

            if (Calculator.isOperand(token))
                stack.push(Number(token));
            if (Calculator.isOperator(token))
                stack.push(Calculator.doOperate(token, stack.pop(), stack.pop()))
        }

        return stack.pop();
    },

    isOperator: token => {
        return /[-\+\*\/]/.test(token)
    },
    isOperand: token => {
        return /\d+/.test(token)
    },
    doOperate: (operator, a, b) => {
        return Calculator.operations[operator](a, b);
    },
    operations: {
        '+': (a, b) => b + a,
        '-': (a, b) => b - a,
        '*': (a, b) => b * a,
        '/': (a, b) => b / a,
    }
}

