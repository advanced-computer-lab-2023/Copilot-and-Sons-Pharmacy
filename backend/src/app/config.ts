export const jwtSecret =
  process.env.JWT_TOKEN ??
  'e82468f0f2b076a6ecd7bd357596c18fd7e5bc64868fba1a63f7bbc9a8b12e29e82468f0f2b076a6ecd7bd357596c18fd7e5bc64868fba1a63f7bbc9a8b12e29'

export const bcryptSalt =
  process.env.BCRYPT_SALT ?? '$2b$10$13bXTGGukQXsCf5hokNe2u'
