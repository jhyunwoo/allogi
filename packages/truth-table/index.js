const letters = new Set([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
])

const operators = new Set(["+", "*", "!", "(", ")"])

function findOpertor(list, operator) {
    let index = -1
    for (let i = 0; i < list.length; i += 1) {
        if (list[i] === operator) {
            index = i
            break
        }
    }

    return index
}

function AND(input1, input2) {
    const result = []
    for (let i = 0; i < input1.length; i += 1) {
        result.push(input1[i] && input2[i])
    }
    return result
}

function OR(input1, input2) {
    const result = []
    for (let i = 0; i < input1.length; i += 1) {
        result.push(input1[i] || input2[i])
    }
    return result
}
function NOT(input) {
    const result = []
    for (let i = 0; i < input.length; i += 1) {
        if (input[i] === 0) {
            result.push(1)
        } else {
            result.push(0)
        }
    }
    return result
}

function inputGenerator(numInputs) {
    if (numInputs <= 0) {
        throw new Error("입력 값의 개수는 1 이상이어야 합니다.")
    }

    const truthTable = []
    const numRows = Math.pow(2, numInputs)

    for (let i = 0; i < numRows; i++) {
        const inputRow = []
        for (let j = 0; j < numInputs; j++) {
            inputRow.push(i & (1 << j) ? 1 : 0)
        }
        truthTable.push(inputRow)
    }

    return truthTable
}

function getPropertyOrder(obj, propertyName) {
    const propertyNames = Object.keys(obj)
    return propertyNames.indexOf(propertyName)
}

function variableOutput(index, input) {
    let output = []
    for (let i = 0; i < input.length; i += 1) {
        output.push(input[i][index])
    }
    return output
}

function expCalcualter(exp, operator) {
    const operators = { AND: AND, OR: OR }
    while (exp.includes(operator)) {
        const index = findOpertor(exp, operator)
        const result = operators[operator](
            exp[index - 1].output,
            exp[index + 1].output
        )
        exp.splice(index - 1, 3, {
            id: exp[index - 1].id + " " + operator + " " + exp[index + 1].id,
            input: exp[index - 1].input,
            output: result,
        })
    }
}

function notCalcualter(exp) {
    while (exp.includes("NOT")) {
        const index = findOpertor(exp, "NOT")
        const result = NOT(exp[index + 1]?.output)
        exp.splice(index, 2, {
            id: "NOT (" + exp[index + 1].id + ")",
            input: exp[index + 1].input,
            output: result,
        })
    }
}

function findMatchingBrackets(arr) {
    const stack = []
    const brackets = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "(") {
            stack.push(i)
        } else if (arr[i] === ")") {
            if (stack.length === 0) {
                new Error(
                    "오른쪽 괄호에 대응되는 왼쪽 괄호를 찾을 수 없습니다."
                )
                return
            }
            const leftBracketIndex = stack.pop()
            brackets.push({ left: leftBracketIndex, right: i })
        }
    }

    if (stack.length > 0) {
        new Error("왼쪽 괄호에 대응되는 오른쪽 괄호를 찾을 수 없습니다.")
        return
    }

    return brackets
}

export function truthTable(expression) {
    const expLower = expression.toLowerCase()

    // 변수 추출
    let variables = {}
    for (let i = 0; i < expLower.length; i += 1) {
        if (letters.has(expLower[i])) {
            variables[expLower[i]] = [0, 1]
        }
    }

    const input = inputGenerator(Object.keys(variables).length)

    // 논리식 구성
    let exp = []

    for (let i = 0; i < expLower.length; i += 1) {
        if (letters.has(expLower[i])) {
            exp.push({
                id: expLower[i],
                input: input,
                output: variableOutput(
                    getPropertyOrder(variables, expLower[i]),
                    input
                ),
            })
        } else if (operators.has(expLower[i])) {
            if (expLower[i] === "+") {
                exp.push("OR")
            } else if (expLower[i] === "*") {
                exp.push("AND")
            } else if (expLower[i] === "!") {
                exp.push("NOT")
            } else if (expLower[i] === "(") {
                exp.push("(")
            } else if (expLower[i] === ")") {
                exp.push(")")
            }
        }
    }

    let brackes = findMatchingBrackets(exp)
    while (brackes.length > 0) {
        let firstExp = exp.slice(brackes[0].left + 1, brackes[0].right)
        let length = firstExp.length
        notCalcualter(firstExp)
        expCalcualter(firstExp, "AND")
        expCalcualter(firstExp, "OR")
        exp.splice(brackes[0].left, length + 2, firstExp[0])
        brackes = findMatchingBrackets(exp)
    }
    notCalcualter(exp)
    expCalcualter(exp, "AND")
    expCalcualter(exp, "OR")
    console.log(exp[0])
}
