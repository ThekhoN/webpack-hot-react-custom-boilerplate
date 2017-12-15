const mockAuthUser = payload => {
  return new Promise((resolve, reject) => {
    if (payload.name === "admin" && payload.password === "admin") {
      setTimeout(() => {
        // mock token on auth
        return resolve({
          token: "011dsafsdag83jjedsfdszsaaxxvdg9766544",
          profile: {
            name: "Jack Quarry",
            email: "test@email.com"
          }
        });
      }, 1000);
    } else {
      throw "Invalid input. Failed to authenticate";
    }
  });
};

export const authUser = payload => ({
  type: "AUTH_USER",
  payload
});

export const unAuthUser = () => {
  if (window.localStorage) {
    localStorage.setItem("user", "");
  }
  return { type: "UNAUTH_USER" };
};

export const errorAuthUser = () => ({
  type: "ERROR_AUTH_USER"
});

// valid userDetail is an object {name: 'admin', password: 'admin'}
export const initAuthUser = userDetail => {
  return function(dispatch) {
    mockAuthUser(userDetail)
      .then(userObj => {
        dispatch(authUser(userObj));
        localStorage.setItem("user", userObj);
      })
      .catch(err => {
        dispatch(authUserError());
      });
  };
};

const auth = (
  state = {
    user: null,
    error: ""
  },
  action
) => {
  switch (action.type) {
    case "AUTH_USER":
      return { ...state, user: action.payload };
    case "UNAUTH_USER":
      return { ...state, user: null };
    case "ERROR_AUTH_USER":
      return { ...state, error: "Enter valid name/password" };
    default:
      return state;
  }
};

export default auth;
