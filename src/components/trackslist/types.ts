import { CommonArtistSchema } from "../../services/discogs/types";

export type Track = {
	position: string;
	title: string;
	duration: string;
	artists: CommonArtistSchema[];
};

export type TrackslistProps = {
	tracks: Track[];
	title?: string;
}
