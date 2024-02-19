export interface Payload {
  id: number
  username: string
  displayName: string
  password: string
}

export type RouteError = string | { error: string }

export type GetUserListResponse = Array<{
  id: number
  id_name: string
}>

export interface GetUserByIdResponse {
  id: number
  id_name: string
  display_name: string
  created_at: Date
}

export type EditUserResponse = Payload

export type GetRoomListResponse = Array<{
  id: number
  created_at: Date
}>

export interface GetRoomByIdResponse {
  id: number
  created_at: Date
}

export interface GetRoomByUserIdResponse {
  rooms: Array<{
    user1_id: number
    user2_id: number
    id: number
    content: string | null
    user1_id_name: string | null
    user1_display_name: string | null
    user2_id_name: string | null
    user2_display_name: string | null
  }>
}

export type GetMessageListByRoomIdResponse = Array<{
  from: number
  content: string
  created_at: Date
}>

export type RegisterResponse = Payload

export type LoginResponse = Payload

export type JwtResponse = Payload

export interface LogoutResponse {
  message: string
}
