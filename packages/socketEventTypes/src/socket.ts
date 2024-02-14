export interface ClientToServerEvents {
  'message-send': (roomdId: unknown, message: unknown) => void
  'room-create': (otherUserId: unknown) => void
  'room-delete': (userId: unknown, roomId: unknown) => void
}

export interface ServerToClientEvents {
  'message-sent': (roomId: number, message: string) => void
  'message-error': (message: string) => void
  'room-error': (message: string) => void
  'room-created': (id: number) => void
  'room-deleted': (id: number) => void
}
