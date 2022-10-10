import { AuthChecker } from "type-graphql";
import { AccessTokenPayload, Context } from "./context";
import { UserModel } from "./users/user.model";
import pino from 'pino'

var jwt = require('jsonwebtoken');
const logger = pino()

export const customAuthChecker: AuthChecker<Context> = async (
    { root, args, context, info }
    ) => {
    logger.info('Checking authorization')
    const authorization = context.req.headers.authorization
    console.log('autooooo',authorization)
    if(!authorization) return false

    try {
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload
        context.payload = payload
    } catch (err) {
        logger.info(err.message)
        return false
    }

    console.log('cococooo',context.payload)
  //const user = await UserModel.findOne(context.payload.userId)
  //if (!user) return false
    logger.info('User authorized')
    return true
}