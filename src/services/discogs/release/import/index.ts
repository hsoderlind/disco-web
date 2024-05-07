import { LoaderFunctionArgs } from "react-router-dom";
import app from "../../../../lib/application-builder/ApplicationBuilder";
import { ProductStates } from "../../../product/ProductStates";
import { ProductSchemaType } from "../../../product/types";
import { loadRelease } from "../loaders/loadRelease";

export const importRelease = async (props: LoaderFunctionArgs) => {
	const release = await loadRelease(props);

	if (typeof release === 'undefined') {
		app.addErrorNotification({description: 'Misslyckades att ladda releasen.'});
		return;
	}

	//TODO
	/**
	 * Check if the shop has at least one barcode type of format CODE128,
	 * if not create it.
	 */

	//TODO:
	/**
	 * Should be returned:
	 * 1. formValues
	 * 2. An array of Upload containing the images
	 */

	const formValues: ProductSchemaType = {
		name: release.get('title'),
		description,
		state: ProductStates.DRAFT,
		barcodes
	};
}
