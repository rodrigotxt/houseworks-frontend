// pages/api/test-env.ts (ou app/api/test-env/route.ts)
export default function handler(req, res) {
    console.log('DB_PASSWORD no servidor:', process.env.DB_PASSWORD); // Deve aparecer
    res.status(200).json({ 
      serverEnv: process.env.DB_PASSWORD // Variável sem NEXT_PUBLIC_
    });
  }