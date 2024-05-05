import { AddToWantlist } from "../../../../../services/discogs/wantlist/AddToWantlist";

export type AddToWantlistProps = {
	releaseId: number;
}

export type AddToWantlistButtonProps = AddToWantlistProps;

export type AddToWantlistModalProps = {
	onFinish?: (model: AddToWantlist) => void;
	onCancel: () => void;
	open: boolean
} & AddToWantlistProps
