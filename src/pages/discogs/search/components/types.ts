import { Dispatch, SetStateAction } from "react"
import { SearchSchema } from "../../../../services/discogs/search/types"

export type SearchFormProps = {
	setSearchCriteria: Dispatch<SetStateAction<SearchSchema | null>>;
}

export type SearchResultProps = {
	searchCriteria: SearchSchema | null;
}
