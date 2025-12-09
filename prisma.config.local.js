// Version 3: Force Vercel full rebuild - engineType library applied
// This ensures Vercel clears cache and rebuilds with the new schema
module.exports = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};
