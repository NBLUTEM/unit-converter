const units = {
    length: { "Meters": 1, "Kilometers": 0.001, "Feet": 3.28084, "Inches": 39.3701 },
    mass: { "Kilograms": 1, "Grams": 1000, "Pounds": 2.20462, "Ounces": 35.274 },
    temp: { "Celsius": "C", "Fahrenheit": "F", "Kelvin": "K" }
};

let currentCategory = 'length';

const tabBtns = document.querySelectorAll('.tab-btn');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultValue = document.getElementById('resultValue');
const convertBtn = document.getElementById('convertBtn');
const historyList = document.getElementById('historyList');

// Switch Categories
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        populateDropdowns();
    });
});

function populateDropdowns() {
    const options = Object.keys(units[currentCategory]);
    fromUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
    toUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
}

function convert() {
    const val = parseFloat(inputValue.value);
    if (isNaN(val)) return;

    const from = fromUnit.value;
    const to = toUnit.value;
    let result;

    if (currentCategory === 'temp') {
        result = convertTemp(val, from, to);
    } else {
        result = (val / units[currentCategory][from]) * units[currentCategory][to];
    }

    resultValue.value = result.toFixed(2);
    addHistory(`${val} ${from} = ${result.toFixed(2)} ${to}`);
}

function convertTemp(v, f, t) {
    if (f === t) return v;
    let c;
    if (f === "Celsius") c = v;
    else if (f === "Fahrenheit") c = (v - 32) * 5/9;
    else c = v - 273.15;

    if (t === "Celsius") return c;
    if (t === "Fahrenheit") return (c * 9/5) + 32;
    return c + 273.15;
}

function addHistory(text) {
    const li = document.createElement('li');
    li.textContent = text;
    historyList.prepend(li);
    if (historyList.children.length > 5) historyList.lastChild.remove();
}

convertBtn.addEventListener('click', convert);

// Init
populateDropdowns();