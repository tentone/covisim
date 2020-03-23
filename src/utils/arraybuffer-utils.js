"use strict";

/**
 * ArraybufferUtils contains methods to convert from and to ArrayBuffer binary format
 */
function ArraybufferUtils() {}

/**
 * Create arraybuffer from base64 string
 *
 * @param str Input string data bas64.
 */
ArraybufferUtils.fromBase64 = function(str) {
	var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var length = str.length / 4 * 3;
	var array = new ArrayBuffer(length);
	var view = new Uint8Array(array);

	var a, b, c, d;

	for (var i = 0, j = 0; i < length; i += 3) {
		a = encoding.indexOf(str.charAt(j++));
		b = encoding.indexOf(str.charAt(j++));
		c = encoding.indexOf(str.charAt(j++));
		d = encoding.indexOf(str.charAt(j++));

		// tslint:disable-next-line:no-bitwise
		view[i] = (a << 2) | (b >> 4);
		if (c !== 64) {
			// tslint:disable-next-line:no-bitwise
			view[i + 1] = ((b & 15) << 4) | (c >> 2);
		}
		if (d !== 64) {
			// tslint:disable-next-line:no-bitwise
			view[i + 2] = ((c & 3) << 6) | d;
		}
	}

	return array;
};

export {ArraybufferUtils};
