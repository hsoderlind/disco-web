import { createContext } from "react";
import { ProductFileUploadContextType } from "./types";

export const ProductFileUploadContext = createContext<ProductFileUploadContextType>(null!);
