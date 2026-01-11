const units = {
    length: { "Meters": 1, "Kilometers": 0.001, "Feet": 3.28084, "Inches": 39.3701 },
    mass: { "Kilograms": 1, "Grams": 1000, "Pounds": 2.20462, "Ounces": 35.274 },
    temp: { "Celsius": "C", "Fahrenheit": "F", "Kelvin": "K" }
};

const category = document.getElementById('category');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultValue = document.getElementById('resultValue');
const convertBtn = document.getElementById('convertBtn');
const historyList = document.getElementById('historyList');

function updateUnits() {
    const options = Object.keys(units[category.value]);
    fromUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
    toUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
}

function convert() {
    const val = parseFloat(inputValue.value);
    if (isNaN(val)) {
        alert("Enter a number!");
        return;
    }

    const cat = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    let result;

    if (cat === 'temp') {
        result = convertTemp(val, from, to);
    } else {
        // Correct logic: Value / FromRate * ToRate
        result = (val / units[cat][from]) * units[cat][to];
    }

    resultValue.value = result.toFixed(4);
    saveHistory(`${val} ${from} = ${result.toFixed(2)} ${to}`);
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

function saveHistory(text) {
    const li = document.createElement('li');
    li.textContent = text;
    historyList.prepend(li);
    if (historyList.children.length > 5) historyList.lastChild.remove();
}

category.addEventListener('change', updateUnits);
convertBtn.addEventListener('click', convert);

// Run immediately to set up dropdowns
updateUnits();