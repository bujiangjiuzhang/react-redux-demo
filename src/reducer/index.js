const initState = {
  list: [],
};

const reducer = (state = initState, action) => {
    console.log('action', action.value, state.list)
  switch (action.type) {
    case "send":
      return state = {
        list: action.value
      };
    default:
      return state;
  }
};

module.exports = {
  reducer,
};
