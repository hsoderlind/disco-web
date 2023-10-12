import { useContext } from "react"
import { ShopsContextType } from "./types"
import { ShopsContext } from "./ShopsContext"

export const useShopsContext = () => {
	return useContext<ShopsContextType>(ShopsContext);
}
