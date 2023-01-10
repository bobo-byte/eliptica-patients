import { SEARCH_FEEDBACK } from "../../../utils/strategy/search/types";
/**
 * Interface for search functionality using client
 */
interface ISearchStrategy {
  search(query: string): Promise<SEARCH_FEEDBACK>;
}

export default ISearchStrategy;
