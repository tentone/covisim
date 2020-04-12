/**
 * File utils contains file manipulation utils.
 */
import {EnvUtils} from "./env-utils";

function FileUtils() {}

/**
 * Read file data from URL, using XHR.
 *
 * @param fname File URL.
 * @param sync If set to true or undefined the file is read synchronously.
 * @param onLoad On load callback.
 * @param onProgress On progress callback.
 * @param onError On error callback.
 * @return Data read if in sync mode.
 */
FileUtils.readFile = function(fname, sync, onLoad, onProgress, onError) {
	if(sync === undefined)
	{
		sync = true;
	}
	
	// NodeJS
	if(!EnvUtils.browser())
	{
		var fs = require("fs");
		var remote = FileUtils.isRemote(fname);

		if(remote)
		{
			var request = require('request');
			request.get(fname, function (error, response, body) {
				if (onLoad !== undefined) {
					onLoad(body);
				}
			});
		}
		else
		{
			if(sync === true)
			{
				var data = fs.readFileSync(fname, "utf8");

				if(onLoad !== undefined)
				{
					onLoad(data);
				}

				return data;
			}
			else
			{
				fs.readFile(fname, "utf8", function(error, data)
				{
					if(error !== null)
					{
						if(onError !== undefined)
						{
							onError(error);
						}
					}
					else if(onLoad !== undefined)
					{
						onLoad(data);
					}
				});

				return null;
			}
		}
	}
	// Browser
	else
	{
		var file = new XMLHttpRequest();
		file.overrideMimeType("text/plain");
		file.open("GET", fname, !sync);

		if(onLoad !== undefined)
		{
			file.onload = function()
			{
				onLoad(file.response);
			};
		}

		if(onProgress !== undefined)
		{
			file.onprogress = onProgress;
		}
		if(onError !== undefined)
		{
			file.onerror = onError;
		}

		file.send(null);

		return sync === true ? file.response : null;
	}
};

/**
 * Write a file to a blob and download it to the client.
 *
 * @param fname File name.
 * @param data CovidData to be written into the file.
 * @param sync
 * @param onFinish
 */
FileUtils.writeFile = function(fname, data, sync, onFinish) {
	if(data instanceof Object)
	{
		data = JSON.stringify(data, null, "\t");
	}

	if(!EnvUtils.browser())
	{
		var fs = require("fs");

		if(fs.writeFileSync !== undefined)
		{
			if(sync !== false)
			{
				fs.writeFileSync(fname, data, "utf8");
				if(onFinish !== undefined)
				{
					onFinish();
				}
			}
			else
			{
				fs.writeFile(fname, data, "utf8", onFinish);
			}
		}
		else
		{
			var stream = fs.createWriteStream(fname, "utf8");
			stream.write(data);
			stream.end();
		}
	}
	else
	{
		var blob = new Blob([data], {type:"octet/stream"});

		var download = document.createElement("a");
		download.download = fname;
		download.href = window.URL.createObjectURL(blob);
		download.style.display = "none";
		download.onclick = function()
		{
			document.body.removeChild(this);
		};
		document.body.appendChild(download);
		download.click();

		if(onFinish !== undefined)
		{
			onFinish();
		}
	}
};

/**
 * Check if a file corresponds to a remote location.
 *
 * @method isRemote
 * @return {boolean} If the file is remote returns true, false otherwise.
 */
FileUtils.isRemote = function(fname)
{
	return fname.startsWith("http");
};

/**
 * Open file chooser dialog receives onLoad callback, file filter, saveas.
 *
 * Save mode does not work inside the browser.
 *
 * The onLoad callback receives an array of files as parameter.
 *
 * @param onLoad onLoad callback that receives array of files choosen as parameter.
 * @param filter File type filter.
 * @param multiple If true the chooser will accept multiple files.
 */
FileUtils.chooseFile = function(onLoad, filter, multiple) {
	const chooser = document.createElement("input");
	chooser.type = "file";
	chooser.style.display = "none";
	document.body.appendChild(chooser);

	if (filter !== undefined) {
		chooser.accept = filter;
	}

	if (multiple === true) {
		chooser.multiple = true;
	}

	chooser.onchange = function (event) {
		if (onLoad !== undefined) {
			onLoad(chooser.files);
		}

		document.body.removeChild(chooser);
	};

	chooser.click();
};

/**
 * Get file name without extension from file path string.
 *
 * If input is a/b/c/abc.d output is abc.
 *
 * @param file File path
 * @return string name without path and extension
 */
FileUtils.getFileName = function(file) {
	if (file !== undefined) {

		if (file instanceof File) {
			file = file.name;
		}

		const a = file.lastIndexOf("\\");
		const b = file.lastIndexOf("/");

		return file.substring((a > b) ? (a + 1) : (b + 1), file.lastIndexOf("."));
	}

	return "";
};

/**
 * Get file extension from file path string.
 *
 * If input is a/b/c/abc.d output is d.
 *
 * @param file File path
 * @return string extension
 */
FileUtils.getFileExtension = function(file) {
	if (file !== undefined) {

		if (file instanceof File) {
			file = file.name;
		}

		return file.substring(file.lastIndexOf(".") + 1, file.length);
	}

	return "";
};

/**
 * Check if a file exists.
 *
 * Only works inside of node. When running inside the browser always returns false.
 *
 * @method fileExists
 * @param {string} file File path
 * @return {boolean} True is file exists
 */
FileUtils.fileExists = function(file)
{
	if(!EnvUtils.browser())
	{
		var fs = require("fs");
		file.replace(new RegExp("/", 'g'), "\\");
		return fs.existsSync(file);
	}

	return false;
};

export {FileUtils};
