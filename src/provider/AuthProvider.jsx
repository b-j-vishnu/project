import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(null);

    useEffect(()=>{
        const Request = async() => {   
            const getDatas =await axios.get('http://localhost:4500/adminVerify',{withCredentials:true}) 
            setToken(getDatas.data.accessToken)
            console.log(getDatas.data.accessToken)
        }
            Request()
    },[])


  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;