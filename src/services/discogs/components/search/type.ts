import { ServerValidationError } from "../../../../lib/error/types";
import { Search } from "../../search/Search"

export type SearchModalProps = {
	onResult: (result?: Search) => void;
	onError?: (error: ServerValidationError) => void;
	onCancel?: () => void;
	open?: boolean;
}
