import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

//reducer initalState

const initalState = {
  user: null,
  isAuthenticated: false,
};

//reducer function
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Emir",
  email: "emirkocaoglu@example.com",
  password: "12",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  //user,isAuthenticated,
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initalState,
  );

  // login
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  //logout
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

// export ile dışa aktar
export { AuthProvider, useAuth };
