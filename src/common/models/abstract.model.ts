import { ulid } from 'ulid'

export abstract class AbstractModel {
  id: string = ulid()
}
