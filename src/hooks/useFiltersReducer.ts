import { useReducer } from "react";
import {
  filtersReducer,
  initState,
  UPDATE_ACTION_TYPE,
  type FilterType,
} from "../reducers/filters.reducer";

export function useFiltersReducer() {
  const [filters, dispatch] = useReducer(filtersReducer, initState);

  const updateFilter = (field: FilterType, value: string) => {
    dispatch({ type: UPDATE_ACTION_TYPE, payload: { field, value } });
  };

  return { filters, updateFilter };
}
