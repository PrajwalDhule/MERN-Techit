export const initialState = null;
export const userReducer = (state, action) => {
  if (action.type == "USER") {
    return action.payload;
  } else if (action.type == "CLEAR") {
    return null;
  }
  if (action.type == "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }
  if (action.type == "UPDATEPIC") {
    return {
      ...state,
      pic: action.payload,
    };
  }
  if (action.type == "UPDATEPOSITION") {
    return {
      ...state,
      position: action.payload,
    };
  }
  if (action.type == "UPDATEBIO") {
    return {
      ...state,
      bio: action.payload,
    };
  }
  return state;
};
