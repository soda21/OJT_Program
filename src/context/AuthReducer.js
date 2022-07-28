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
      // ローカルストレージを削除
      window.localStorage.removeItem("user");
      return {
        currentUser: null,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
