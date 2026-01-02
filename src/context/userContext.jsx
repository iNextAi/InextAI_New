import React, { createContext, useContext, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "inextai_user";

const UserContext = createContext(null);

export function UserProvider({ children }) {
	const [user, setUser] = useState(() => {
		try {
			const txt = localStorage.getItem(LOCAL_STORAGE_KEY);
			return txt ? JSON.parse(txt) : null;
		} catch (err) {
			console.warn("Failed to parse saved user from localStorage", err);
			return null;
		}
	});

	useEffect(() => {
		try {
			if (user) {
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
			} else {
				localStorage.removeItem(LOCAL_STORAGE_KEY);
			}
		} catch (err) {
			console.warn("Failed to persist user to localStorage", err);
		}
	}, [user]);

	const setWalletAddress = (address) => {
		setUser((prev) => ({ ...(prev || {}), walletAddress: address }));
	};

	const clearUser = () => setUser(null);

	return (
		<UserContext.Provider value={{ user, setUser, setWalletAddress, clearUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const ctx = useContext(UserContext);
	if (!ctx) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return ctx;
}

export default UserContext;