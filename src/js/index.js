const form = document.getElementById('converterForm');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const convertedAmount = document.getElementById('convertedAmount');
const toCurrency = document.getElementById('toCurrency');
const loading = document.querySelector('.loading');
const result = document.querySelector('.result');
const error = document.querySelector('.error');

// |Endereço da API|
const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`;


async function converterMoney() {

    loading.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const rate = data.rates[toCurrency.value];
        const convertedRate = (amount.value * rate).toFixed(2);

        convertedAmount.value = convertedRate;
        result.style.display = 'block';

        result.innerHTML = `
        <div style="font-size: 1.4rem"> 
            ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>
        <div style="font-size: 0.9rem" opacity="0.7">
            Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
        </div>
        `

    } catch (err) {
        console.log(err);
        alert(err);
        error.style.display = 'block';
        error.innerHTML = `Falha ao converter moeda! tente novamente.`
    }

    loading.style.display = 'none';

}

form.addEventListener('submit', function (converterMoeda) {
    converterMoeda.preventDefault();
    converterMoney();
})