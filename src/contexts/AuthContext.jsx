import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange, getCurrentUser } from "../utils/firebase";
import { getAccount, topup } from "../utils/axios";
import { getBalance } from "../utils/ethers";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      const address = await getAccount();
      console.log("User address:", address);
      user.address = address.data;
      user.balance = await getBalance(user.address);
      setUser(user);
      setLoading(false);

      // Check if this is a new user (first time signing in)
      if (user) {
        const lastSignIn = user.metadata.lastSignInTime;
        const creationTime = user.metadata.creationTime;

        console.log(user);
      }
    });

    // Set initial user if already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      getAccount()
        .then((address) => {
          console.log("User address:", address);
          currentUser.address = address.data;
          currentUser.balance = getBalance(currentUser.address);
          setUser(currentUser);
        })
        .catch((error) => {
          console.error("Error fetching user address:", error);
        });

      setUser(currentUser);
      console.log("Current user:", currentUser);
    }
    setLoading(false);

    return unsubscribe;
  }, []);
  const callTopup = async () => {
    try {
      const response = await topup();
      const nUser = { ...user };
      nUser.balance = await getBalance(user.address);
      setUser(nUser);
      console.log("Top-up response:", response);
    } catch (error) {
      console.error("Error during top-up:", error);
    }
  };

  const value = {
    user,
    loading,
    isNewUser,
    setIsNewUser,
    callTopup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
