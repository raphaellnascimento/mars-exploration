import express from 'express';
import bodyParser from 'body-parser';
import roverRoutes from './routes/roverRoute';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.text({type:"*/*"}));
app.use('/api/voyager', roverRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
