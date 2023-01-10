import { createContext } from "react";

const AuthContext = createContext(null);
const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

export { AuthConsumer, AuthProvider };

export default AuthContext;
