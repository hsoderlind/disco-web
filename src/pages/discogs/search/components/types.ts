import { Dispatch, SetStateAction } from "react"
import { SearchSchema } from "../../../../services/discogs/search/types"
import { Search } from "../../../../services/discogs/search/Search";

export type SearchFormProps = {
	setSearchCriteria: Dispatch<SetStateAction<SearchSchema | null>>;
}

export type SearchResultProps = {
	searchCriteria: SearchSchema | null;
}

export type RecordGridProps = {
	searchResult: Search | undefined;
	isSuccess: boolean;
	isLoading: boolean;
};
