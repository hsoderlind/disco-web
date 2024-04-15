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

export type ExtractObjectStructure<T> = T extends (infer U)[] ? U : never;

export abstract class Enum {
	static values(): Readonly<[string, ...string[]] | [number, ...number[]]> {
		return [''] as const;
	}

	static toObject(): Readonly<Record<string, string> | Record<number, number>> {
		return {};
	}
}
