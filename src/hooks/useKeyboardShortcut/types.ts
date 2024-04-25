
export type UseKeyboardShortCut = <Callback extends ((...args: any[]) => void) = (() => void)>(callback: Callback, keys?: string[], modifierKey?: 'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey', node?: HTMLElement | null) => void;
