import { CSSProperties } from "react";

export type EditorProps = {
	value?: string;
	onChange: (value: string) => void;
	height?: CSSProperties['height'];
}
