import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface RoomTable {
  id: Generated<number>
  user1_id: number
  user2_id: number
  created_at: ColumnType<Date, string | null, never>
}

export type Room = Selectable<RoomTable>
export type NewRoom = Insertable<RoomTable>
export type UpdateRoom = Updateable<RoomTable>
