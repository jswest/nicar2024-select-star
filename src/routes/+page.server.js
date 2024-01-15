import { csvParse } from "d3";
import fs from "fs";
import path from "path";

import human from "./../../data/human-classifications.json";
import rawImages from "./../../data/index.csv?raw";

const images = csvParse(rawImages);

export function load() {
	const filtered = images
		.filter(
			(image) =>
				!human.find((classification) => classification.image_id === image.id),
		)
		.sort((a, b) => a.id - b.id);
	return {
		counts: {
			human: human.filter(
				(human) => human.name === "contains_human" && human.value === true,
			).length,
			images: images.length,
			noHuman: human.filter(
				(human) => human.name === "contains_human" && human.value === false,
			).length,
			taggedImages: [...new Set(human.map((i) => i.image_id))].length
		},
		image: "",
		metadata: filtered[0],
	};
}

export const actions = {
	human: async ({ request }) => {
		const data = await request.formData();
		const imageId = data.get("image_id");
		human.push({
			image_id: imageId,
			name: "contains_human",
			value: true,
		});
		fs.writeFileSync(
			"./data/human-classifications.json",
			JSON.stringify(human, null, 2),
		);
	},
	no_human: async ({ request }) => {
		const data = await request.formData();
		const imageId = data.get("image_id");
		human.push({
			image_id: imageId,
			name: "contains_human",
			value: false,
		});
		fs.writeFileSync(
			"./data/human-classifications.json",
			JSON.stringify(human, null, 2),
		);
	},
};
