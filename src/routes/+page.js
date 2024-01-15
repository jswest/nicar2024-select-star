import { csvParse } from "d3";

import rawClassifications from "./../../data/classifications.csv?raw";
import rawImages from "./../../data/index.csv?raw";

const classifications = csvParse(rawClassifications);
const images = csvParse(rawImages);

export function load() {
	const filtered = images.filter(
		(image) =>
			!classifications.find(
				(classification) => classification.image_id === image.id,
			),
	);
	return {
		classifications,
		image: "",
		metadata: "",
	};
}
