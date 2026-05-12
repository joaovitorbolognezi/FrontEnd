var inputCelsius    = document.getElementById("celsius");
var inputFahrenheit = document.getElementById("fahrenheit");

inputCelsius.addEventListener("input", function() {
  var c = parseFloat(inputCelsius.value);
  if (!isNaN(c)) {
    inputFahrenheit.value = ((c * 9 / 5) + 32).toFixed(2);
  } else {
    inputFahrenheit.value = "";
  }
});

inputFahrenheit.addEventListener("input", function() {
  var f = parseFloat(inputFahrenheit.value);
  if (!isNaN(f)) {
    inputCelsius.value = ((f - 32) * 5 / 9).toFixed(2);
  } else {
    inputCelsius.value = "";
  }
});
