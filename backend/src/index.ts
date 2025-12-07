import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`
    Server is running!
    Port: ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    ${new Date().toLocaleString()}
  `);
});