import { useState, useCallback, useMemo, useRef } from "react";
import { PatientsResponse } from "../models/Patients";
import SearchContext from "../services/strategy/search/SearchContext";
import SearchStrategy from "../services/strategy/search/SearchStrategy";
import { QueryColumn } from "../utils/database/helper";

/**
 * A hook for searching patient table that can utilise different search strategies if present
 * @returns an object of read and set functions for searching and querying patient table
 */
export default function usePatientSearch() {
  const [query, setQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<PatientsResponse[]>();

  const previousWasSearch = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isClear = useRef<boolean>(false);

  /**
   * Function for clearing the search state
   */
  function clear() {
    isClear.current = false;
    setQuery("");
    setQueryResult(undefined);
  }

  /**
   * Function for updating the loading state for query
   * @param state `true` or `false`
   */
  function updateIsLoadingQuery(state: boolean) {
    setLoading(state);
  }

  /**
   * Function for upading the query state
   * @param query query to search
   */
  function updateQuery(query: string) {
    if (query !== "") isClear.current = true;
    else isClear.current = false;

    if (previousWasSearch) {
      previousWasSearch.current = false;
      setQueryResult(undefined);
    }

    setQuery(query);
  }

  /**
   * A function for executing the search using {@link SearchStrategy}, and {@link SearchContext}
   * @param query current search query
   * @param queryColumn query column default is {@link QueryColumn.NAME}
   */
  function search(query: string, queryColumn: QueryColumn = QueryColumn.NAME) {
    const context = new SearchContext();

    if (!query) {
      setLoading(false);
      return;
    }

    if (queryColumn) {
      context.setSearchStrategy(new SearchStrategy("Patients", queryColumn));
    } else {
      context.setSearchStrategy(
        new SearchStrategy("Patients", QueryColumn.NAME)
      );
    }

    (async () => {
      const { data, error } = await context.sStrategy.search(query);

      if (error) {
        // setLoading(false);
        // setQueryResult([]);
        console.log(error);
      }

      if (data) {
        setLoading(false);
        setQueryResult(data);

        if (data.length === 0) previousWasSearch.current = true;
      }
    })();
  }

  return {
    query,
    clear,
    isClear: isClear.current,
    search,
    updateQuery: useCallback(updateQuery, []),
    queryResult: useMemo(() => queryResult, [queryResult]),
    loadingQuery: loading,
    setIsLoadingQuery: updateIsLoadingQuery,
  };
}
