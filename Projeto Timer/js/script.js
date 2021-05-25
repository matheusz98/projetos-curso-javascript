function relogio(){
    // Selecionando atributos HTML
    const relogio = document.querySelector('.relogio');
    const iniciar = document.querySelector('.iniciar');
    const pausar = document.querySelector('.pausar');
    const resetar = document.querySelector('.resetar');
    // Criando a variável segundos
    let segundos = 0;
    let timer;

    // Função de criar a data e pegar os segundos
    function criarSegundos(segundos){
        // De padrão ele recebe por milésimos, é aconselhável multiplicar por 1000 pra virar segundos
        const data = new Date(segundos * 1000);
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            // Zerando o timezone pra 01/01/1970 00:00:00
            // Pode ser o UTC também
            timeZone: 'GMT'
        });
    }

    // Função de iniciar o relógio
    function iniciarRelogio(){
        // Variável do timer
        // Vai ir executando a soma de segundo em segundo
        timer = setInterval(function() {
            segundos++;
            // Atualizando o elemento relógio do HTML
            relogio.innerHTML = criarSegundos(segundos);
        }, 1000);
    }


    // Botão de iniciar
    iniciar.addEventListener('click', function(e){
        // Removendo a cor de pausa ao iniciar
        relogio.classList.remove('pausado');
        // Garantindo que ele zere o atual e comece de novo
        clearInterval(timer);
        iniciarRelogio();
    });

    // Botão de pausar
    pausar.addEventListener('click', function(e){
        // Cancelando os intervalos
        clearInterval(timer);
        // Adicionando cor de pausa ao parar
        relogio.classList.add('pausado');
    });

    // Botão de resetar
    resetar.addEventListener('click', function(e){
        relogio.classList.remove('pausado');
        clearInterval(timer);
        relogio.innerHTML = '00:00:00';
        segundos = 0;
    });
}

relogio();

