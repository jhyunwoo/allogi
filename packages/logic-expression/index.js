const varNum = 2

//최소항의 합 구하는 함수
export function logicExpression(truthTable) {
    const outputValues = truthTable[1]
    const minTerms = []
    for (let i = 0; i < outputValues.length; i++) {
        if (outputValues[i] === 1) {
            const inputs = truthTable[0][i].split(" ") // 띄어쓰기로 분할
            const minTerm = []
            for (let j = 0; j < inputs.length; j++) {
                if (inputs[j] === "0") {
                    minTerm.push(`!${String.fromCharCode(65 + j)}`)
                } else if (inputs[j] === "1") {
                    minTerm.push(String.fromCharCode(65 + j))
                }
            }
            minTerms.push(minTerm.join(" & "))
        }
    }
    // 최소항을 논리식으로 나타내기
    const minimizedExpression = minTerms.join(" + ")

    return minimizedExpression
}

if (varNum == 2) {
    const truthTable = [
        ["0 0", "0 1", "1 0", "1 1"],
        [0, 0],
    ]
    truthTable[1] = [1, 1, 0, 0]
    const outputValues = truthTable[1]

    // 진리표 출력
    console.log("A | B | F")
    console.log("----------------")
    for (let i = 0; i < 2 ** varNum; i++) {
        const inputs = truthTable[0][i].split(" ")
        const output = outputValues[i]
        console.log(`${inputs[0]} | ${inputs[1]} | ${output}`)
    }

    const minimizedExpression = logicExpression(truthTable)
    console.log("Minimized Expression:", minimizedExpression)
}

// if (varNum == 3) {
//     const truthTable = [
//         [
//             "0 0 0",
//             "0 0 1",
//             "0 1 0",
//             "1 1 0",
//             "1 0 0",
//             "1 0 1",
//             "0 1 1",
//             "1 1 1",
//         ],
//         [1, 1, 0, 0, 0, 1, 1, 0],
//     ]
//     truthTable[1] = [1, 1, 1, 1, 0, 0, 0, 0]
//     // 출력값 가져오기
//     const outputValues = truthTable[1]

//     // 진리표 출력
//     console.log("A | B | C | F")
//     console.log("----------------")
//     for (let i = 0; i < 2 ** varNum; i++) {
//         const inputs = truthTable[0][i].split(" ")
//         const output = outputValues[i]
//         console.log(`${inputs[0]} | ${inputs[1]} | ${inputs[2]} | ${output}`)
//     }
//     const minimizedExpression = logicExpression(truthTable)
//     console.log("Minimized Expression:", minimizedExpression)
// }
