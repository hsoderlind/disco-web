import { useSyncExternalStore } from "react";
import { Key, Listener } from "./types";

export const useLocalStorage = <T extends string>(key: Key, initialValue?: T) => {
	const setValue = (newValue: T) => {
		window.localStorage.setItem(key, newValue);
		window.dispatchEvent(new StorageEvent('storage', {key, newValue}));
	}

	const getSnapshot = () => window.localStorage.getItem(key);

	if (typeof initialValue !== 'undefined' && !getSnapshot()) {
		setValue(initialValue);
	}

	const subscribe = (listener: Listener) => {
		window.addEventListener('storage', listener);
		return  () => void window.removeEventListener('storage', listener);
	}

	const store = useSyncExternalStore(subscribe, getSnapshot);

	return [store, setValue] as const;
}
