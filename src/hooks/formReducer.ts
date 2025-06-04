export const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "set_status":
      return { ...state, status: action.newValue };
    case "set_rating":
      return { ...state, rating: action.newValue };
    case "set_current":
      return { ...state, current: action.newValue };
    case "set_total":
      return { ...state, total: action.newValue };
    case "set_comment":
      return { ...state, comment: action.newValue };
    case "set_track_progress":
      return { ...state, trackProgress: action.newValue };
    case "set_track_rating":
      return { ...state, trackRating: action.newValue };
    case "set_all":
      return action.newValues;
    default:
      return state;
  }
};

export const initialFormState = {
    status: "want-to-read",
    rating: 0,
    current: undefined,
    total: undefined,
    comment: "",
    trackProgress: false,
    trackRating: false,
};