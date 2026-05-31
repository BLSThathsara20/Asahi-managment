import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
} from "firebase/auth";
import { auth, googleProvider } from "../../shared/config/firebase";
import { apiFetch } from "../../shared/api/client";

export type AppUserRole = "super_admin" | "admin" | "staff" | "guest";

export type AppUser = {
	id: string;
	firebase_uid: string;
	email: string | null;
	display_name: string | null;
	role: AppUserRole;
	created_at: string;
	updated_at: string;
};

type AuthContextValue = {
	loading: boolean;
	error: string | null;
	firebaseUser: import("firebase/auth").User | null;
	appUser: AppUser | null;
	signInWithGoogle: () => Promise<unknown>;
	signInWithEmailPassword: (email: string, password: string) => Promise<unknown>;
	signUpWithEmailPassword: (email: string, password: string) => Promise<unknown>;
	sendMagicLink: (email: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [firebaseUser, setFirebaseUser] =
		useState<AuthContextValue["firebaseUser"]>(null);
	const [appUser, setAppUser] = useState<AppUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		return onAuthStateChanged(auth, async (u) => {
			setFirebaseUser(u);
			setError(null);
			setAppUser(null);

			if (!u) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const me = await apiFetch<{ user: AppUser }>("/api/me", {
					method: "POST",
				});
				setAppUser(me.user);
			} catch (e) {
				const msg = e instanceof Error ? e.message : "login_failed";
				setError(msg);
			} finally {
				setLoading(false);
			}
		});
	}, []);

	useEffect(() => {
		(async () => {
			try {
				if (!isSignInWithEmailLink(auth, window.location.href)) return;
				const email = window.localStorage.getItem("asahi-magic-email");
				if (!email) return;
				await signInWithEmailLink(auth, email, window.location.href);
				window.localStorage.removeItem("asahi-magic-email");
				window.history.replaceState({}, document.title, "/");
			} catch (e) {
				const msg = e instanceof Error ? e.message : "magic_link_failed";
				setError(msg);
			}
		})();
	}, []);

	const value = useMemo(
		() => ({
			loading,
			error,
			firebaseUser,
			appUser,
			signInWithGoogle: () => signInWithPopup(auth, googleProvider),
			signInWithEmailPassword: (email: string, password: string) =>
				signInWithEmailAndPassword(auth, email, password),
			signUpWithEmailPassword: (email: string, password: string) =>
				createUserWithEmailAndPassword(auth, email, password),
			sendMagicLink: async (email: string) => {
				window.localStorage.setItem("asahi-magic-email", email);
				await sendSignInLinkToEmail(auth, email, {
					url: window.location.origin,
					handleCodeInApp: true,
				});
			},
			logout: () => signOut(auth),
		}),
		[loading, error, firebaseUser, appUser],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

