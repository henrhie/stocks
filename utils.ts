import fs from 'fs/promises';

export const generateCsv = (items: any) => {
	let csv = '';
	let keysCounter = 0;
	const keysAmount = Object.keys(items[0]).length;

	//generate headers for the csv
	for (let key in items[0]) {
		csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
		keysCounter++;
	}

	// generate data items for csv
	for (let row = 0; row < items.length; row++) {
		keysCounter = 0;

		for (let key in items[row]) {
			csv += items[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
			keysCounter++;
		}
	}
	return csv;
};

export const addToCsv = async (item: any) => {
	delete item._id;
	let csvFile: string | undefined;
	const keysAmount = Object.keys(item).length;
	let keysCounter = 0;
	try {
		csvFile = await fs.readFile('splunk.data.csv', { encoding: 'utf-8' });
	} catch (error: any) {
		console.log(error.message);
	}

	if (!csvFile || csvFile.length === 0) {
		const csv = generateCsv([item]);
		await fs.writeFile('splunk.data.csv', csv);
		return;
	}

	for (let key in item) {
		csvFile += item[key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
		keysCounter++;
	}

	try {
		await fs.writeFile('splunk.data.csv', csvFile || '');
	} catch (error: any) {
		console.log(error.message);
	}
};
