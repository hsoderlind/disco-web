import React from 'react';
import { UIMatch } from 'react-router-dom';
import { QueryKey, UseMutationOptions as RCUseMutationOptions, UseQueryOptions as RQUseQueryOptions } from '@tanstack/react-query';

export interface ReactCommonProps {
	children?: React.ReactNode;
}

export interface Message {
	message: string;
}

export type RouteMatch = UIMatch<unknown, {
	menuKey: string
}>

export type RouteParams = {
	urlAlias: string;
	id: string;
}

export type ExtractObjectStructure<T> = T extends (infer U)[] ? U : never;

export type UseMutationOptions<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown
> = Omit<RCUseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>;

export type UseQueryOptions<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
> = Omit<
		RQUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'
	> & { initialData?: () => undefined };

export abstract class Enum {
	static values(): Readonly<[string, ...string[]] | [number, ...number[]]> {
		return [''] as const;
	}

	static toObject(): Readonly<Record<string, string> | Record<number, number>> {
		return {};
	}
}

type EnumType = typeof Enum;
export type EnumInfer<T extends EnumType> = keyof ReturnType<T['toObject']>

export type Prettify<T extends object> = {
	[P in keyof T]: T[P]
};

export type EmptyFn = () => void;
