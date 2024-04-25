import { useContext } from "react";
import { PostItContextType } from "./types";
import { PostItContext } from "./post-it-context";

export const usePostItContext = () => useContext<PostItContextType>(PostItContext);
