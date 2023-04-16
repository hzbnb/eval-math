function evalMath(expression) {
    // 将表达式转换为标记数组
    const tokens = expression.match(/[+\-*/()]|[-+]?(\d+(\.\d*)?|\.\d+)/g);

    // 定义操作数和操作符的堆栈
    const operands = [];
    const operators = [];

    // 定义优先级映射
    const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    };

    // 处理每个标记
    for (const token of tokens) {
        if (/^[\d\.]+$/.test(token)) {
            // 如果标记是一个数字，将其作为操作数压入堆栈
            operands.push(Number(token));
        } else if (/^[+\-*/]$/.test(token)) {
            // 如果标记是一个操作符，将其与堆栈中的操作符进行比较，
            // 并根据优先级将操作符弹出并应用于操作数
            while (
                operators.length > 0 &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                operands.push(applyOperator(operand1, operand2, operator));
            }
            operators.push(token);
        } else if (token === "(") {
            // 如果标记是左括号，将其压入操作符堆栈
            operators.push(token);
        } else if (token === ")") {
            // 如果标记是右括号，将堆栈中的操作符弹出并应用于操作数，直到找到左括号为止
            while (operators[operators.length - 1] !== "(") {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                operands.push(applyOperator(operand1, operand2, operator));
            }
            operators.pop(); // 弹出左括号
        }
    }

    // 处理堆栈中剩余的操作符
    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        operands.push(applyOperator(operand1, operand2, operator));
    }

    // 返回最终结果
    return operands[0];
}

function applyOperator(operand1, operand2, operator) {
    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            return operand1 / operand2;
    }
}

// 使用示例
// console.log(evalMath("(1.5+1)*2*4"));
