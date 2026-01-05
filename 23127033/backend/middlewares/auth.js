import dotenv from 'dotenv'

dotenv.config();

export default async function (req, res, next) {
  const apikey = req.header('apikey');
  if (apikey !== process.env.API_KEY) {
    return res.unauthorized();
  }
  next();
}