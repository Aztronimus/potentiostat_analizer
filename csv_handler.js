// csv_handler
// converts between CSV and JS Arrays
function save(file) {
	const elem = document.createElement("a");
	elem.setAttribute("href", window.URL.createObjectURL(file));
	elem.setAttribute("download", file.name);
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}

function arrayFromSVString(tsv_string, t_comma_f_tab = true) {
	const lines = tsv_string.split("\n");
	if(lines[lines.length - 1] == "") {
		lines.pop();
	}
	const separator = t_comma_f_tab ? "," : "\t";
	const total_rows = lines.length;
	const total_cols = lines[0].split(separator).length;
	const arr = Array(total_rows);
	for(let row_n = 0; row_n < total_rows; ++row_n) {
		const line = lines[row_n].split("\t");
		const row = Array(total_cols);
		for(let col_n = 0; col_n < total_cols; ++col_n) {
			row[col_n] = line[col_n];
		}
		arr[row_n] = row;
	}
	return arr;
}

function svFileFromArray(array, name = "", t_comma_f_tab = true) {
	const separator = t_comma_f_tab ? "," : "\t";
	return new File([ array.reduce( (acc, cur) => { acc + cur.join(separator) + "\n"; } , "" ) ], name, { type: "text/csv" });
}

function arrayFromSVFile(file, t_comma_f_tab = true) {
	const reader = new FileReader();
	return arrayFromSVString(reader.readAsText(file), t_comma_f_tab);
}

