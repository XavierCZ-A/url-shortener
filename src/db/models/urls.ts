import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface UrlsTable {
  id: Generated<number>;
  original_url: string;
  short_code: string;
  user_id: number | undefined;
  clicks?: number;
  expires_at?: ColumnType<Date, string>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Database {
  urls: UrlsTable;
}

export type Url = Selectable<UrlsTable>;
export type NewUrl = Insertable<UrlsTable>;
export type UrlUpdate = Updateable<UrlsTable>;
