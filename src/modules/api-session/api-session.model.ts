import { DbAuditable } from '../../common/models/db-auditable-abstract.model'
import { Column, Entity } from 'typeorm'
import { User } from '../users/user.model'

@Entity(({ name: 'api_session' }))
export class ApiSession extends DbAuditable {
  @Column()
  userId: string
  @Column()
  accessToken: string
  @Column()
  refreshToken: string
  @Column()
  accessTokenExpDt: Date
  @Column()
  refreshTokenExpDt: Date
  @Column()
  ipAddress: string
  @Column()
  startDt: Date
  @Column()
  lastActivityDt: Date
  @Column()
  active: boolean

  user: User

  constructor(
    props: {
      userId: string,
      accessToken: string,
      refreshToken: string,
      ipAddress: string,
      lastActivityDt?: Date,
      accessTokenExpDt: Date,
      refreshTokenExpDt: Date,
      currentUserId?: string,
    },
  ) {
    super({ currentUserId: props.currentUserId })
    const currentDate = new Date()
    this.userId = props.userId
    this.accessToken = props.accessToken
    this.refreshToken = props.refreshToken
    this.ipAddress = props.ipAddress
    this.startDt = currentDate
    this.lastActivityDt = props.lastActivityDt ?? currentDate
    this.accessTokenExpDt = props.accessTokenExpDt
    this.refreshTokenExpDt = props.refreshTokenExpDt
    this.active = true
  }

  update(
    props: {
      ipAddress?: string,
      active?: boolean,
      accessToken?: string,
      accessTokenExpDt?: Date,
      refreshToken?: string,
      refreshTokenExpDt?: Date,
      currentUserId?: string,
    },
  ) {
    super.updateDbAuditable({ currentUserId: props.currentUserId })
    if (props.ipAddress !== undefined) {
      this.ipAddress = props.ipAddress
    }
    if (props.active !== undefined) {
      this.active = props.active
    }
    if (props.accessToken !== undefined) {
      this.accessToken = props.accessToken
    }
    if (props.accessTokenExpDt !== undefined) {
      this.accessTokenExpDt = props.accessTokenExpDt
    }
    if (props.refreshToken !== undefined) {
      this.refreshToken = props.refreshToken
    }
    if (props.refreshTokenExpDt !== undefined) {
      this.refreshTokenExpDt = props.refreshTokenExpDt
    }
    this.lastActivityDt = new Date()
  }
}
