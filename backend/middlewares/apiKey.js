import dotenv from 'dotenv';
dotenv.config();

// Middleware to check API Key
export const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['apikey'];
    
    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API Key is required'
        });
    }
    
    // Kiểm tra API Key với giá trị trong .env
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            success: false,
            message: 'Invalid API Key'
        });
    }
    
    next();
};
