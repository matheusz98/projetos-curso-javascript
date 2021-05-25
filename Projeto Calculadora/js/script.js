class Calculator{
    // Método construtor
    // Aqui vai todos atributos e métodos
    constructor(previousDisplay, currentDisplay){
        this.previousDisplayElement = previousDisplay;
        this.currentDisplayElement = currentDisplay;
        this.clear();
    }

    // Método de limpar campos
    clear(){
        this.currentDisplay = '';
        this.previousDisplay = '';
        this.operation = undefined;
    }

    // Método de deletar números
    delete(){
        // Pegando o último valor e cortando ele
        // 0 é o primeiro e -1 é o último
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
    }

    // Método de acrescentar números
    addNumber(number){
        // Verificando se tem . no display, e irá impedir de adicionar mais
        if (number === '.' && this.currentDisplay.includes('.')) return;

        // Convertendo os números para string
        // O motivo é porque js vai tentar add como números e vai bagunçar o display
        this.currentDisplay = this.currentDisplay.toString() + number.toString();
    }

    // Método das operações matemáticas
    mathOperation(operation){
        // Verificando se o display tá vazio
        if (this.currentDisplay === '') return;

        // Verificando se o display não está vazio
        if (this.previousDisplay !== ''){
            // O método calc irá atualizar o display conforme necessário
            this.calc();
        }

        this.operation = operation;
        this.previousDisplay = this.currentDisplay;
        this.currentDisplay = '';
    }

    // Método de realizar os cálculos
    calc(){
        // Variável de resultado
        let results;

        // Transformando strings em números
        const prev = parseFloat(this.previousDisplay);
        const current = parseFloat(this.currentDisplay);

        // Verificando tem algo inserido
        if (isNaN(prev) || isNaN(current)) return;

        // Utilizando switch para lidar com as operações matemáticas
        switch (this.operation){
            case '+':
                results = prev + current;
            break;

            case '-':
                results = prev - current;
            break;

            case '*':
                results = prev * current;
            break;

            case '÷':
                results = prev / current;
            break;

            default:
                return;
        }

        // Setando os resultados dos cálculos
        this.currentDisplay = results;
        this.operation = undefined;
        this.previousDisplay = '';
    }

    // Método para formatar os números com vírgula
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        // Verificando se os dígitos serão números ou não
        if (isNaN(integerDigits)){
            integerDisplay = '';
            // Mas se digitarem um valor
        } else {
            // Limitando o número de dígitos de casas decimais
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        // Verificando se tem dígitos decimais
        if (decimalDigits != null){
            // Caso for encontrado dígitos decimais
            return `${integerDisplay}.${decimalDigits}`
        } else {
            // Caso não for encontrado
            return integerDisplay;
        }
    }

    // Método de atualizar as informações exibidas na calculadora
    update(){
        this.currentDisplayElement.innerText = this.getDisplayNumber(this.currentDisplay);
        
        // Verificando se a operation não está vazia
        // Criando uma concatenação dos displays anteriores
        if (this.operation != null){
            this.previousDisplayElement.innerText = `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`
        } else {
            this.previousDisplayElement.innerText = '';
        }
    }
}

// Selecionando todos os botões
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousDisplayElement = document.querySelector('[data-previous]');
const currentDisplayElement = document.querySelector('[data-current]');

// Instância da calculadora
const calculator = new Calculator(previousDisplayElement, currentDisplayElement);

// forEach para percorrer os botões
numberButtons.forEach(button => {
// Adicionando evento nos botões
// Todo clique no botão resultará em um evento
    button.addEventListener('click', () => {
// Cada clique adiciona um número no display
        calculator.addNumber(button.innerText);
// Atualizando o display com o número inserido
        calculator.update();
    });
});

// forEach para operações matemáticas
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.mathOperation(button.innerText);
        calculator.update();
    });
});

// Evento para o botão de igual
equalButton.addEventListener('click', () => {
    calculator.calc();
    calculator.update();
});

// Evento do limpar campos
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
});

// Evento de deletar
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
});
