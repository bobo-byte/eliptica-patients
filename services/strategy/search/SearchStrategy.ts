import ISearchStrategy from "./ISearchStrategy";
import BaseSearchStrategy from "./BaseSearchStrategy";
import { SEARCH_FEEDBACK } from "../../../utils/strategy/search/types";

import supabase from "../../supabase";
/**
 * A search strategy used to textsearch given column based on specified query
 */
export default class SearchStrategy
  extends BaseSearchStrategy
  implements ISearchStrategy
{
  /**
   * A function for executing text based search on column
   * @param query search query
   * @returns a {@link SEARCH_FEEDBACK} promised response
   */
  search(query: string) {
    return (async () => {
      const { data, error } = await supabase
        .from(this.tablename)
        .select("*")
        .textSearch(this.queryColumn, query);

      //.or(`patient_name.phfts.${query},sex.phfts.${query}`);

      return { data, error } as SEARCH_FEEDBACK;
    })();
  }
}
