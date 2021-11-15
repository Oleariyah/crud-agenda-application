export const appReducer = (state, action) => {
  switch (action.type) {
    case "fetchInitialData": {
      return action.payload;
    }
    case "addAgenda": {
      return [
        {
          id: Date.now(),
          ...action
        },
        ...state
      ];
    }
    case "editAgenda": {
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            title: action.title
          };
        }
        return item;
      });
    }
    case "removeFromList": {
      return state.filter(item => item.id !== action.id);
    }

    default:
      return state;
  }
};
