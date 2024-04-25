import { createContext } from 'react';
import { PostItContextType } from './types';

export const PostItContext = createContext<PostItContextType>(null!);
