import { useState, useEffect } from "react";

const USER_STORAGE_KEY = "nome-empresa-user";

const defaultUser = {
  name: "",
  email: "",
  phone: "",
  cpf: "",
  cep: "",
  address: "",
  number: "",
  complement: "",
  city: "",
  state: "",
};

export function useUser() {
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultUser;
  });

  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const updateUser = (data) => {
    setUserData((current) => ({ ...current, ...data }));
  };

  const isProfileComplete = () => {
    return Boolean(userData.name && userData.email && userData.phone);
  };

  return {
    userData,
    updateUser,
    isProfileComplete,
  };
}
