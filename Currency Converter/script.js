document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // Use a public API
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        });

    convertButton.addEventListener('click', () => {
        const amountVal = amount.value;
        const fromCurrencyVal = fromCurrency.value;
        const toCurrencyVal = toCurrency.value;

        if (amountVal === '') {
            result.textContent = 'Please enter an amount';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyVal}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrencyVal];
                const convertedAmount = (amountVal * rate).toFixed(2);
                result.textContent = `${amountVal} ${fromCurrencyVal} = ${convertedAmount} ${toCurrencyVal}`;
            });
    });
});
