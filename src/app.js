import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './config.js';
import { cartsRouter } from './routes/carts.router.js';
import { home } from './routes/home.router.js';
import { productsRouter } from './routes/products.router.js';
import { realTimeProducts } from './routes/realtimeproducts.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';

const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(PORT, () => {
  console.log(`App runing on ${__dirname} - server http://localhost:${PORT}`);
});

connectSocketServer(httpServer);

//TODOS MIS ENDPOINTS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/home', home);
app.use('/realtimeproducts', realTimeProducts);
app.use('/test-chat', testChatRouter);

//OTROS ENDPOINTS
app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', msg: 'No se encuentra esa ruta', data: {} });
});
