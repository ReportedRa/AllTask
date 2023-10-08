<script>
  let amount1 = 1;
  let amount2 = 0;
  let currency1 = "USD";
  let currency2 = "EUR";
  let exchangeRate = 1;

  async function fetchExchangeRate() {
    try {
      const response = await fetch(`https://api.example.com/exchangerate?from=${currency1}&to=${currency2}`);
      const data = await response.json();
      exchangeRate = data.rate;
      updateConvertedAmount();
    } catch (error) {
      console.error("Ошибка при получении курсов валют:", error);
    }
  }

  function updateConvertedAmount() {
  const convertedAmount = parseFloat((amount1 * exchangeRate).toFixed(2));
  if (!isNaN(convertedAmount)) {
    amount2 = convertedAmount;
  } else {
    amount2 = 0;
  }
}

  $: {
    fetchExchangeRate();
    updateConvertedAmount();
  }
</script>

<h1>Конвертер валют</h1>

<div class="currency-input">
  <label for="amount1">Сумма:</label>
  <input type="number" id="amount1" bind:value={amount1} on:input={updateConvertedAmount} />
  <select bind:value={currency1} on:change={fetchExchangeRate}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
  </select>
</div>

<div class="currency-input">
  <label for="amount2">Результат:</label>
  <input type="number" id="amount2" bind:value={amount2} on:input={updateConvertedAmount} />
  <select bind:value={currency2} on:change={fetchExchangeRate}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
  </select>
</div>

<p>Курс обмена: 1 {currency1} = {exchangeRate} {currency2}</p>

