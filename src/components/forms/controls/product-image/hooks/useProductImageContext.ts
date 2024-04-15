import { useContext } from "react";
import { ProductImageContextType } from "../types";
import { ProductImageContext } from "../ProductImageContext";

export const useProductImageContext = () => {
	return useContext<ProductImageContextType>(ProductImageContext);
}
