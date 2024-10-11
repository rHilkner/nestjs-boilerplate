import { User } from '../../modules/users/user.model'
import { ApiSession } from '../../modules/api-session/api-session.model'

export interface RequestContext {
  transactionId: string
  user: User
  apiSession: ApiSession
  method: string
  route: {
    path: string
  }
  params: any
  body: any
  headers: { [key: string]: string }
  ip: string
  url: string
}