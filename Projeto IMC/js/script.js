// Capturando evento de submit do formulário
const form = document.querySelector('#formulario');

// Função geral da aplicação
form.addEventListener('submit', function (e){
    // Evento prevenindo o envio do formulário
    e.preventDefault();

    // Pegando os atributos html
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    // Pegando os valores
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Verificando se o usuário digitou um valor que corresponde ao peso
    // Se o peso NÃO for avaliado como true (NaN) ele executará uma ação
    // Se o peso for falso, ele se torna verdadeiro
    if (!peso){
        setResultado('Peso inválido!', false);
        // Se ele bate no return, ele não passa mais disso
        return;
    }

    if (!altura){
        setResultado('Altura inválida!', false);
        return;
    }

    // Variável IMC
    const imc = getImc(peso, altura);
    // Variável nível
    const nivelImc = getNivelImc(imc);

    // Montando a mensagem de resultado
    const msg = `Seu nível IMC é ${imc} (${nivelImc})`;
    setResultado(msg, true);
});

// Função IMC
function getImc(peso, altura){
    // Cálculo do IMC
    const imc = peso / altura ** 2;
    // Retornando o imc com duas casas decimais
    return imc.toFixed(2);
}

// Função para pegar nível do IMC
function getNivelImc(imc){
    // Armazenando os níveis do IMC em um array
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    // Verificando em qual nível de IMC resultou o cálculo
    // Retornando o nível a partir do índice do array 
    // Os ifs estão sem blocos ({}) por serem pequenos
    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5)  return nivel[0];
}

// Função para criar o parágrafo do resultado
function criarParagrafo(){
    // Criando o parágrafo do resultado
    const paragrafo = document.createElement('p');
    return paragrafo;
}

// Função de setar resultado
// Parâmetro isValid para verificar se está válido ou não
// Se for verdadeiro tá jóia, se for falso tá ruim
function setResultado (msg, isValid){
    // Criando o atributo resultado
    const resultado = document.querySelector('#resultado');
    // Deixando o resultado vazio como padrão
    resultado.innerHTML = '';   

    const paragrafo = criarParagrafo();

    // Criando uma condição no caso da mensagem for true ou false
    if (isValid) {
        paragrafo.classList.add('paragrafo-resultado');
    } else {
        paragrafo.classList.add('paragrafo-erro');
    }

    // Adicionando o resultado no parágrafo
    paragrafo.innerHTML = msg;
    resultado.appendChild(paragrafo);
}