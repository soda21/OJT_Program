const AuthReducer = (state, action) => {
  console.log('authreducer')
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
        loginInfo:action.payload
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
