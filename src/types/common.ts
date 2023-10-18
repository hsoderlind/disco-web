import React from 'react';
import { UIMatch } from 'react-router-dom';

export interface ReactCommonProps {
	children?: React.ReactNode;
}

export interface Message {
	message: string;
}

export type RouteMatch = UIMatch<unknown, {
	menuKey: string
}>
