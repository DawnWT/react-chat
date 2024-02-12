import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface MessageTable {
  id: Generated<number>
  parent_room: number
  from: number
  content: string
  created_at: ColumnType<Date, string | null, never>
}

export type Message = Selectable<MessageTable>
export type NewMessage = Insertable<MessageTable>
export type UpdateMessage = Updateable<MessageTable>
