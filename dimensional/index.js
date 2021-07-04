// 기준을 선택하는 Radios
// const standard_1 = document.querySelector("#standard_1");
// const standard_2 = document.querySelector("#standard_2");
// const standard_3 = document.querySelector("#standard_3");
const DIV_STANDARDS = document.querySelector(".choose-standard");
let STANDARD_STATUS = "standard_speed";
const DIV_STANDARDS_STATUS = document.querySelector("#choose-status");

// CSV 복붙해서 넣는 TextArea
const TEXTAREA_CSV = document.querySelector("#csv-input");

// 값을 구하기 위한 버튼
const BUTTON_SUBMIT = document.querySelector("#submit-csv");

// 유저에게 복사기능을 제공하기 위한 버튼
const BUTTON_COPY = document.querySelector("#copy-button");

// 정리하는 버튼
const BUTTON_CLEAR = document.querySelector("#clear-button");

// 결과값을 보여주는 textarea
const TEXTAREA_RESULT = document.querySelector("#result-value");

// 현재 상태에 대해서 Display 할 수 있는 div
const DIV_STATUS = document.querySelector("#result-status");

// result 를 아무 css 없이 display 중
const DIV_RESULTS = document.querySelector("#result-copy");

// 1차 함수 a, b 상수를 구하는 함수
const getConstants = (
    first_standard, first_control_1, first_control_2,
    second_standard, second_control_1, second_control_2,
) => {
    // 기준을 이용해 둘의 값의 사이를 구한다
    let control_1_a = (second_control_1 - first_control_1) / (second_standard - first_standard);
    let control_1_b = first_control_1 - ( control_1_a * first_standard );
    let control_2_a = (second_control_2 - first_control_2) / (second_standard - first_standard);
    let control_2_b = first_control_2 - ( control_2_a * first_standard );

    return [control_1_a, control_1_b, control_2_a, control_2_b];
}

// 1차 함수 상수들을 이용해 값을 얻음
const getValue = (a, b, standard, fixLevel) => {
    let result = (a * standard) + b;
    return result.toFixed(fixLevel);
}

const submitCSV = () => {
    DIV_STATUS.innerHTML = "";

    // 값을 넣을 것들
    let result = [];
    // 내용물 : [[전압, 속도, 전류], ...]
    let values = [];

    // 전달받은 데이터 전처리
    // 전압 속도 전류 세트로 분류
    let stack = []
    TEXTAREA_CSV.value.split('\n').map(line => {
        line.split(' ').forEach(cell => {
            const cell_number = parseFloat(cell);
            // 값이 있을 때 넣어야 한다.
            if (!isNaN(cell_number)){
                stack.push(cell_number);
                // stack 이 세 개면 전압, 속도, 전류를 받은 것이다.
                if (stack.length == 3){
                    values.push(stack);
                    stack = [];
                }
            }
        })
    });

    // 전압, 속도, 전류 세개 전부 넣고 빈 배열이여야 함
    // 전달받은 값이 최소 2개이상 이여야한다.
    if (stack.length !== 0 || values.length < 2) {
        DIV_RESULTS.innerHTML = "제대로 입력해주세요";
        return;
    }

    // 전압 : 소수점 1자리 까지 나머지는 반올림
    // 속도 : 소수점 1자리 까지 나머지는 반올림
    // 전류 : 기준이 전류일 때 1단위
    // 전류가 (전압과 속도)를 통해 구해진다.
    let [beforeV, beforeS, beforeC] = values[0];

    // 값을 계산
    for (let i = 1; i < values.length; i++) {
        const [nowV, nowS, nowC] = values[i];
        // 속도가 기준일 때 (0.1 단위로)
        if (STANDARD_STATUS === "standard_speed") {
            const [volt_a, volt_b, current_a, current_b] = getConstants(
                beforeS, beforeV, beforeC,
                nowS, nowV, nowC
            );

            for (let x = beforeS; x < nowS; x = parseFloat((x + 0.1).toFixed(1))) {
                result.push([
                    getValue(volt_a, volt_b, x, 1),
                    x.toFixed(1),
                    getValue(current_a, current_b, x, 0)
                ]);
            }
        }
        // 전류가 기준일 때 (1 단위로)
        else if (STANDARD_STATUS === "standard_current") {
            const [volt_a, volt_b, speed_a, speed_b] = getConstants(
                beforeC, beforeV, beforeS,
                nowC, nowV, nowS
            );

            for (let x = beforeC; x < nowC; x = parseInt((x + 1).toFixed(0))) {
                result.push([
                    getValue(volt_a, volt_b, x, 1),
                    getValue(speed_a, speed_b, x, 1),
                    x.toFixed(0)
                ]);
            }
        }

        [beforeV, beforeS, beforeC] = values[i];
    }

    // 마지막 값도 넣어서 처리
    if (STANDARD_STATUS === "standard_speed" && result[result.length - 1][1] != values[values.length - 1][1]) {
        const [volt, speed, current] = values[values.length - 1];
        result.push([volt.toFixed(1), speed.toFixed(1), current.toFixed(0)]);
    }
    if (STANDARD_STATUS === "standard_current" && result[result.length - 1][2] != values[values.length - 1][2]) {
        const [volt, speed, current] = values[values.length - 1];
        result.push([volt.toFixed(1), speed.toFixed(1), current.toFixed(0)]);
    }

    // 출력 값 설정해주기
    const result_string = result.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.join("\t") + "\n";
    }, "")

    TEXTAREA_RESULT.value = result_string;
    TEXTAREA_RESULT.style.height = "0px";
    TEXTAREA_RESULT.style.height = TEXTAREA_RESULT.scrollHeight + "px";

    // 테이블에 보여주기
    const result_table = result.reduce((accumulator, currentValue) => {
        let tempstr = "\n<tr>\n";
        let first = "<td>" + currentValue[0] + "</td>\n";
        let second = "<td>" + currentValue[1] + "</td>\n";
        let third = "<td>" + currentValue[2] + "</td>\n";
        tempstr += first + second + third + "\n</tr>";

        return accumulator + tempstr;
    }, "<table>") + "\n</table>";

    DIV_RESULTS.innerHTML = result_table;
};

// 복사 기능 제공
const copyTexts = (e) => {
    var t = e.target;
    TEXTAREA_RESULT.select();  //문자열 전체 선택
    document.execCommand("copy");  //복사
    document.getSelection().removeAllRanges();  //선택 영역 해제
    t.focus();  //input.select(); 때 옮겨진 포커스를 원래대로 돌린다
    DIV_STATUS.innerHTML = "복사 되었습니다.";
}
const clearTexts = (e) => {
    TEXTAREA_RESULT.value = '';
    TEXTAREA_RESULT.style.height = "0px";
    TEXTAREA_RESULT.style.height = TEXTAREA_RESULT.scrollHeight + "px";
    TEXTAREA_CSV.value = '';
    DIV_RESULTS.innerHTML = '';
}

// 기준 선택하는 Event
const selectStandard = (e) => {
    // Radio 버튼일 때만 작동
    if (e.target.type === "radio") {
        STANDARD_STATUS = e.target.value;
        if (e.target.value === "standard_speed") {
            DIV_STANDARDS_STATUS.innerHTML = "속도 (단위 : 0.1)";
        }
        else if (e.target.value === "standard_current") {
            DIV_STANDARDS_STATUS.innerHTML = "전류 (단위 : 1)";
        }
    }
}

BUTTON_SUBMIT.addEventListener("click", submitCSV);
BUTTON_COPY.addEventListener("click", copyTexts);
BUTTON_CLEAR.addEventListener("click", clearTexts)
DIV_STANDARDS.addEventListener("click", selectStandard)