/* Essa é uma maneira de fazer o código
// Criando a variável texto e selecionando o h1 no container
const texto = document.querySelector('.container h1');
const data = new Date();

// Função com switch para pegar o dia da semana
function getDiaSemanaTexto(diaSemana) {
    let diaSemanaTexto;

    switch(diaSemana) {
        case 0:
            diaSemanaTexto = 'Domingo';
        return diaSemanaTexto;
    
        case 1:
            diaSemanaTexto = 'Segunda-feira';
        return diaSemanaTexto;
    
        case 2:
            diaSemanaTexto = 'Terça-feira';
        return diaSemanaTexto;
    
        case 3:
            diaSemanaTexto = 'Quarta-feira';
        return diaSemanaTexto;
    
        case 4:
            diaSemanaTexto = 'Quinta-feira';
        return diaSemanaTexto;
    
        case 5:
            diaSemanaTexto = 'Sexta-feira';
        return diaSemanaTexto;
    
        case 6:
            diaSemanaTexto = 'Sábado';
        return diaSemanaTexto;
    }
}

// Função para pegar o mês
function getNomeMes(numeroMes) {
    let nomeMes;

    switch(numeroMes) {
        case 0:
            nomeMes = 'Janeiro';
        return nomeMes;
    
        case 1:
            nomeMes = 'Fevereiro';
        return nomeMes;

        case 2:
            nomeMes = 'Março';
        return nomeMes;

        case 3:
            nomeMes = 'Abril';
        return nomeMes;

        case 4:
            nomeMes = 'Maio';
        return nomeMes;

        case 5:
            nomeMes = 'Junho';
        return nomeMes;

        case 6:
            nomeMes = 'Julho';
        return nomeMes;

        case 7:
            nomeMes = 'Agosto';
        return nomeMes;

        case 8:
            nomeMes = 'Setembro';
        return nomeMes;

        case 9:
            nomeMes = 'Outubro';
        return nomeMes;

        case 10:
            nomeMes = 'Novembro';
        return nomeMes;

        case 11:
            nomeMes = 'Dezembro';
        return nomeMes;
    }
}

// Função para colocar um 0 na esquerda em minuto
function zero (num) {
    // Retorna: se o número for maior ou igual a dez, coloque um 0 ao lado do número
    return num >= 10 ? num : `0${num}`;
}

// Função para criar a data
function criaData(data) {
    // Pegando os dias e meses
    const diaSemana = data.getDay();
    const numeroMes = data.getMonth();
    const nomeDia = getDiaSemanaTexto(diaSemana);
    const nomeMes = getNomeMes(numeroMes);

    // Template String exibindo a data
    // Usando parênteses no return para poder quebrar linha
    return (
        `${nomeDia}, ${data.getDate()} de ${nomeMes} ` +
        `de ${data.getFullYear()} | ` +
        `${zero(data.getHours())}:${zero(data.getMinutes())}`
    );
}

texto.innerHTML = criaData(data);
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/*
// Essa é uma outra maneira de fazer o código
// Criando a variável texto e selecionando o h1 no container
const texto = document.querySelector('.container h1');
const data = new Date();

// Função com switch para pegar o dia da semana
function getDiaSemanaTexto(diaSemana) {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasSemana[diaSemana];
}

// Função para pegar o mês
function getNomeMes(numeroMes) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[numeroMes];
}

// Função para colocar um 0 na esquerda em minuto
function zero (num) {
    // Retorna: se o número for maior ou igual a dez, coloque um 0 ao lado do número
    return num >= 10 ? num : `0${num}`;
}

// Função para criar a data
function criaData(data) {
    // Pegando os dias e meses
    const diaSemana = data.getDay();
    const numeroMes = data.getMonth();
    const nomeDia = getDiaSemanaTexto(diaSemana);
    const nomeMes = getNomeMes(numeroMes);

    // Template String exibindo a data
    // Usando parênteses no return para poder quebrar linha
    return (
        `${nomeDia}, ${data.getDate()} de ${nomeMes} ` +
        `de ${data.getFullYear()} | ` +
        `${zero(data.getHours())}:${zero(data.getMinutes())}`
    );
}

texto.innerHTML = criaData(data);
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


//Maneira mais rápida

// Criando a variável texto e selecionando o h1 no container
const texto = document.querySelector('.container h1');
const data = new Date();

// Transformando o resultado para o HTML e traduzindo para o horário pt-BR
//                                              Estilo da data: completo
//                                                                 Estilo do horário: curto
texto.innerHTML = data.toLocaleString('pt-BR', {dateStyle: 'full', timeStyle: 'short'});
