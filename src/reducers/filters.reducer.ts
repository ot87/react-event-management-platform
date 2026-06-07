type UpdateActionType = "UPDATE";

export const UPDATE_ACTION_TYPE: UpdateActionType = "UPDATE";

export interface FiltersState {
  date: string;
  price: string;
}
export type FilterType = keyof FiltersState;

interface UpdateAction {
  type: UpdateActionType;
  payload: {
    field: FilterType;
    value: string;
  };
}
type FiltersAction = UpdateAction;

export const initState: FiltersState = {
  date: "",
  price: "",
};

export const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case UPDATE_ACTION_TYPE:
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
};
