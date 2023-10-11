import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import type { AuthContext as AuthContextType } from "./types"

export const useAuthContext = () => {
	return useContext<AuthContextType>(AuthContext);
}
