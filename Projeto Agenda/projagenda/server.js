require('dotenv').config();

const express = require('express');
const app = express();

// Conectando com o BD
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    })
// Emitindo um sinal de sucesso
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

// Chamando a session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');

// Helmet e csrf
const helmet = require('helmet');
const csrf = require('csurf');

// Middleware
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// Chamando o helmet
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Conteúdo estático
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurando a session
const sessionOptions = session({
    // Habilita criptografia transparente de acordo com as recomendações de gerenciamento de sessão OWASP.
    secret: 'aoejsiaoek9587dbvjuluda98578',
    // Onde será salvo
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    // Tempo de duração da sessão
    cookie: {
        // Vai durar 7 dias em milésimos de segundos
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

// Setando as views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Chamando o csrf
app.use(csrf());

// Fazendo todas rotas passar pelo middleware
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar: http://localhost:3000');
        console.log('Servidor iniciado com sucesso.');
    });
});