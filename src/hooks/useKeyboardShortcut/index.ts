import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { UseKeyboardShortCut } from "./types";

export const useKeyboardShortcut: UseKeyboardShortCut = (callback, keys, modifierKey, node) => {
	const callbackRef = useRef(callback);

	useLayoutEffect(() => {
		callbackRef.current = callback;
	});

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			const keysPressed = keys?.some((key) => event.key === key || event.key === key.toUpperCase() || event.key === key.toUpperCase());

			if ((modifierKey && event[modifierKey] && keysPressed) || keysPressed) {
				callbackRef.current(event);
			}
		},
		[keys, modifierKey]
	)

	useEffect(() => {
		const targetNode = node ?? document;

		targetNode.addEventListener('keydown', (event) => handleKeyPress(event as KeyboardEvent));

		return () => targetNode.removeEventListener('keydown', (event) => handleKeyPress(event as KeyboardEvent));
	}, [handleKeyPress, node])
}
