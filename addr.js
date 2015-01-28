var ch = {
	LETTER: 1,
	SPACE:  2,
	NUMBER: 3,
	HYPHEN: 4
};
var rex = [
	[ /^[a-zA-Z]$/i, ch.LETTER ],
	[ /^\s$/i, ch.SPACE ],
	[ /^[0-9]$/i, ch.NUMBER ],
	[ /^-$/i, ch.HYPHEN ]
];

exports.parse = function(params) {
	var stack = [], temp = [], result = {};
	
	var type = params.type || "vpri";
	var address = params.addr || "";

	if(type === "vpri") {
		if(address) {
			[].forEach.apply(address, [ function(character, index, string) {
				var pRes = false;
				rex.every(function(it) {
					//console.log(character);
				});
			} ]);
		} else {
			result = false;
		}
	}

	/*address && [].forEach.apply(address, [ parse ]);
	function parse(character, index, string) {
		//console.log(character);
		if(/^[a-zA-Z]$/i.test(character)) {
			//console.log("LETRA");
		} else {
			if(/^\s$/i.test(character)) {
				//console.log("ESPACIO");
			} else {
				if(/^[0-9]$/i.test(character)) {
					//console.log("NUMERO");
				} else {
					if(/^-$/i.test(character)) {
						//console.log("GUION");
					} else {
						//if(/^\*$/i.test(character)) {
							//console.log("ASTERISCO");
						//} else {
							console.log(character);
							console.log("ERRORRRRRRRRRRRRRR");
							result = false;
							return false;
						//}
					}
				}
			}
		}
	}*/
	return result;
};