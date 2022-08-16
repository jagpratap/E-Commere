import {
  createContext,
  useState,
  useContext,
  useMemo,
} from "react";

// 1. Create context(with default value)
export const UserContext = createContext({
  userProducts: [],
  userCart: {},
});

// 2. Create Provider(Component)
const UserProvider = ({ children }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [userCart, setUserCart] = useState({});
  const value = useMemo(() => ({
    userProducts, setUserProducts, userCart, setUserCart,
  }), [userProducts, userCart]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

// 3. Rap Provider around elements in root file(app)

// 4. Create useContext hook
export const useUserContext = () => useContext(UserContext);

// 5. Consume useContext in components
