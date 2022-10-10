import { Request, Response } from "express"
import { ObjectId } from "mongodb"

export interface Context {
    req: Request
    res: Response
    payload: AccessTokenPayload
}

export interface AccessTokenPayload {
    id: ObjectId
}