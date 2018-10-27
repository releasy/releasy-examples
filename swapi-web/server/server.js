import path from 'path';
import express from 'express';
import renderer from './renderer';

const PORT = 5000;

const app = express();

app.use(express.Router().get('/', renderer));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(renderer);

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});
