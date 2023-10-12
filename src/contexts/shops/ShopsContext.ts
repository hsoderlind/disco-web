import { createContext } from "react";
import { ShopsContextType } from "./types";

export const ShopsContext = createContext<ShopsContextType>(null!);
