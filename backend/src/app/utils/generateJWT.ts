import jwt from 'jsonwebtoken'

const generateJWT = async (payload: any) => {
  const secret: string = process.env.JWT_SECRET || ''
  const expiresIn = '30d'

  const token = await jwt.sign(payload, secret, { expiresIn })

  return token
}

export default generateJWT
