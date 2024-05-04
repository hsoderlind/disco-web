export type Track = {
	position: string,
	title: string,
	duration: string,
};

export type TrackslistProps = {
	tracks: Track[];
	title?: string;
}
