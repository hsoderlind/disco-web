import { useContext } from "react";
import { ProductFileUploadContextType } from "../types";
import { ProductFileUploadContext } from "../ProductFileUploadContext";

export const useProductFileUploadContext = () => 
	useContext<ProductFileUploadContextType>(ProductFileUploadContext);
