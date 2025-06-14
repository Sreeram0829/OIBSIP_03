document.addEventListener('DOMContentLoaded', function() {
            const temperatureInput = document.getElementById('temperature');
            const convertBtn = document.getElementById('convert-btn');
            const resultContainer = document.getElementById('result-container');
            const resultValue = document.getElementById('result-value');
            const resultUnit = document.getElementById('result-unit');
            const inputError = document.getElementById('input-error');
            
            // Show result container with animation
            function showResult() {
                resultContainer.classList.remove('hidden');
            }
            
            // Validate input
            function validateInput() {
                const value = temperatureInput.value.trim();
                
                if (value === '') {
                    inputError.textContent = 'Please enter a temperature';
                    return false;
                }
                
                if (isNaN(value)) {
                    inputError.textContent = 'Please enter a valid number';
                    return false;
                }
                
                inputError.textContent = '';
                return true;
            }
            
            // Conversion functions
            function celsiusToFahrenheit(c) {
                return (c * 9/5) + 32;
            }
            
            function fahrenheitToCelsius(f) {
                return (f - 32) * 5/9;
            }
            
            function celsiusToKelvin(c) {
                return c + 273.15;
            }
            
            function kelvinToCelsius(k) {
                return k - 273.15;
            }
            
            function fahrenheitToKelvin(f) {
                return celsiusToKelvin(fahrenheitToCelsius(f));
            }
            
            function kelvinToFahrenheit(k) {
                return celsiusToFahrenheit(kelvinToCelsius(k));
            }
            
            // Perform conversion
            function convertTemperature() {
                if (!validateInput()) return;
                
                const temp = parseFloat(temperatureInput.value);
                const fromUnit = document.querySelector('input[name="from-unit"]:checked').value;
                const toUnit = document.querySelector('input[name="to-unit"]:checked').value;
                
                let convertedTemp;
                let unitSymbol;
                
                // Determine conversion path
                if (fromUnit === toUnit) {
                    convertedTemp = temp; // No conversion needed
                } 
                // Celsius conversions
                else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                    convertedTemp = celsiusToFahrenheit(temp);
                } 
                else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                    convertedTemp = celsiusToKelvin(temp);
                } 
                // Fahrenheit conversions
                else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                    convertedTemp = fahrenheitToCelsius(temp);
                } 
                else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
                    convertedTemp = fahrenheitToKelvin(temp);
                } 
                // Kelvin conversions
                else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                    convertedTemp = kelvinToCelsius(temp);
                } 
                else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
                    convertedTemp = kelvinToFahrenheit(temp);
                }
                
                // Set unit symbol
                switch(toUnit) {
                    case 'celsius': unitSymbol = '°C'; break;
                    case 'fahrenheit': unitSymbol = '°F'; break;
                    case 'kelvin': unitSymbol = 'K'; break;
                }
                
                // Display result
                resultValue.textContent = convertedTemp.toFixed(2);
                resultUnit.textContent = unitSymbol;
                showResult();
            }
            
            // Event listeners
            convertBtn.addEventListener('click', convertTemperature);
            
            temperatureInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    convertTemperature();
                }
            });
            
            // Input validation on blur
            temperatureInput.addEventListener('blur', validateInput);
        });