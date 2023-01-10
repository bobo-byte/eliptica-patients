import { SUPABASE_TABLES } from "../../../utils/database/helper";
/**
 * Base search strategy interface that a search strategy needs
 */
export default abstract class BaseSearchStrategy {
  protected tablename!: string;
  protected queryColumn!: string;

  /**
   * Constructor for creating search strategies subscribed to the base interface
   * @param tablename supabaase table name {@link SUPABASE_TABLES}
   * @param queryColumn column to query
   */
  constructor(tablename: SUPABASE_TABLES, queryColumn: string) {
    this.tablename = tablename;
    this.queryColumn = queryColumn;
  }

  /**
   * A setter for the tablename property
   * @param tablename a {@link SUPABASE_TABLES}
   */
  setTablename(tablename: string) {
    this.tablename = tablename;
  }

  /**
   * A setter for the query column property
   * @param queryColumn column to query search
   */
  setQueryColumn(queryColumn: string) {
    this.queryColumn = queryColumn;
  }
}
