document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let displayValue = '';
    let firstValue = null;
    let secondValue = null;
    let operator = null;

    const updateDisplay = () => {
        display.value = displayValue;
    };

    const clearAll = () => {
        displayValue = '';
        firstValue = null;
        secondValue = null;
        operator = null;
        updateDisplay();
    };

    const deleteLast = () => {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    };

    const appendNumber = (number) => {
        displayValue += number;
        updateDisplay();
    };

    const chooseOperator = (op) => {
        if (displayValue === '') return;
        if (firstValue === null) {
            firstValue = parseFloat(displayValue);
        } else if (operator) {
            secondValue = parseFloat(displayValue);
            firstValue = calculate();
        }
        operator = op;
        displayValue = '';
    };

    const calculate = () => {
        if (firstValue === null || secondValue === null || operator === null) return;
        let result;
        switch (operator) {
            case '+':
                result = firstValue + secondValue;
                break;
            case '-':
                result = firstValue - secondValue;
                break;
            case '*':
                result = firstValue * secondValue;
                break;
            case '/':
                result = firstValue / secondValue;
                break;
            default:
                return;
        }
        return result;
    };

    const handleEquals = () => {
        if (operator === null || displayValue === '') return;
        secondValue = parseFloat(displayValue);
        displayValue = calculate();
        operator = null;
        firstValue = null;
        updateDisplay();
    };

    document.getElementById('ac').addEventListener('click', clearAll);
    document.getElementById('de').addEventListener('click', deleteLast);
    document.getElementById('dot').addEventListener('click', () => appendNumber('.'));
    document.getElementById('divide').addEventListener('click', () => chooseOperator('/'));
    document.getElementById('multiply').addEventListener('click', () => chooseOperator('*'));
    document.getElementById('subtract').addEventListener('click', () => chooseOperator('-'));
    document.getElementById('add').addEventListener('click', () => chooseOperator('+'));
    document.getElementById('equals').addEventListener('click', handleEquals);

    document.querySelectorAll('#calculator button:not(.operator)').forEach(button => {
        button.addEventListener('click', (e) => {
            appendNumber(e.target.id);
        });
    });

    function mostrarReloj() {
        const fecha = new Date();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
        const segundos = fecha.getSeconds();
        const tiempo = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        document.getElementById('clock').textContent = tiempo;
    }

    setInterval(mostrarReloj, 1000);
    mostrarReloj(); // Inicializa el reloj inmediatamente
});
