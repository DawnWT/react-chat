import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface UserTable {
  id: Generated<number>
  id_name: string
  display_name: string
  password: string
  created_at: ColumnType<Date, string | null, never>
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UpdateUser = Updateable<UserTable>
