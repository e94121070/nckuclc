const formData = {
    pages: [
        ["single_choice", "multiple_choice"],
        ["text", "dropdown"]
    ],
    questions: {
        "single_choice": {
            "question": "你的最愛的顏色？",
            "options": ["紅", "藍", "綠", "黃"],
            "type": "radio"
        },
        "multiple_choice": {
            "question": "你喜歡哪些水果？",
            "options": ["蘋果", "香蕉", "葡萄", "西瓜"],
            "type": "checkbox"
        },
        "text": {
            "question": "請輸入你的姓名",
            "type": "text"
        },
        "dropdown": {
            "question": "請選擇你的國家",
            "options": ["台灣", "美國", "日本", "法國"],
            "type": "select"
        }
    }
};

let currentPage = 0;
let answers = {};
 
function renderPage(){
    const container = document.getElementById("form");
    container.innerHTML = "";

    formData.pages[currentPage].forEach(qType =>{
        const questionData = formData.question[qType];
        const div = document.createElement("div");
        div.className = "name-div";
        div.innerHTML = `<div class = "name>${questionData.question}<div>`;

        if (questionData.type === "radio" || questionData.type === "checkbox") {
            questionData.options.forEach(option => {
                div.innerHTML += `
                    <label>
                        <input type="${questionData.type}" name="${qType}" value="${option}"
                            ${answers[qType]?.includes(option) ? "checked" : ""}>
                        ${option}
                    </label><br>
                `;
            });
        } else if (questionData.type === "select") {
            let optionsHtml = questionData.options.map(option =>
                `<option value="${option}" ${answers[qType] === option ? "selected" : ""}>${option}</option>`
            ).join("");
            div.innerHTML += `<select name="${qType}">${optionsHtml}</select>`;
        } else {
            div.innerHTML += `<div class = "input-div"><input type="text" name="${qType}" placeholder = "您的回答"></div>`;
        }
    })
}


function saveAnswers() {
    document.querySelectorAll("input, select").forEach(input => {
        if (input.type === "radio" && input.checked) {
            answers[input.name] = input.value;
        } else if (input.type === "checkbox") {
            if (!answers[input.name]) answers[input.name] = [];
            if (input.checked && !answers[input.name].includes(input.value)) {
                answers[input.name].push(input.value);
            } else if (!input.checked) {
                answers[input.name] = answers[input.name].filter(val => val !== input.value);
            }
        } else if (input.type === "text" || input.tagName === "SELECT") {
            answers[input.name] = input.value;
        }
    });
}

function nextPage() {
    saveAnswers();
    if (currentPage < formData.pages.length - 1) {
        currentPage++;
        renderPage();
    }
}

function prevPage() {
    saveAnswers();
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    }
}

function submitForm() {
    saveAnswers();
    alert("提交成功！\n" + JSON.stringify(answers, null, 2));
}

renderPage();