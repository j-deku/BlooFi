// middlewares/cors.js
import cors from 'cors';

const corsOptions = {
  origin: ["https://bloofi-fy.onrender.com", "https://bloofi-admin.onrender.com"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
