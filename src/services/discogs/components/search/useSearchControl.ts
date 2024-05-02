import { useState, useTransition } from "react"
import { Search } from "../../search/Search";

export const useSearchControl = (defaultState = false) => {
	const [showSearchForm, setShowSearchForm] = useState(defaultState);
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState<Search | undefined>();
	const [isPending, setTransition] = useTransition();

	const onResult = (searchResult?: Search) => {
		setTransition(() => {
			setShowSearchForm(false);
			setResult(searchResult);
			setShowResult(true);
		})
	}

	const onCancel = () => setShowSearchForm(false);

	return {showSearchForm, setShowSearchForm, showResult, setShowResult, onResult, onCancel, result, isPending} as const;
}
