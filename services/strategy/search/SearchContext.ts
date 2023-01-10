import ISearchStrategy from "./ISearchStrategy";
/**
 * Search controller context for managing search strategy instances
 */
export default class SearchContext {
  sStrategy!: ISearchStrategy;

  /**
   * A setter for the search strategy
   * @param sStrategy a {@link ISearchStrategy}
   */
  setSearchStrategy(sStrategy: ISearchStrategy) {
    this.sStrategy = sStrategy;
  }
}
