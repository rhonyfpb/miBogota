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
	var stack = [], tokens = [], result = {};
	
	var type = params.type || "vpri";
	var address = params.addr || "";

	if(type === "vpri") {
		console.log(address);
		if(address) {
			[].forEach.apply(address, [ function(character, index, string) {
				var tokenUnkown = true;
				// se obtienen los tokens individuales
				rex.every(function(it) {
					if(it[0].test(character)) {
						tokens.push([ character, it[1] ]);
						tokenUnkown = false;
						return false;
					} else {
						return true;
					}
				});
				if(tokenUnkown) {
					console.log("TOKEN DESCONOCIDO: "+ character);
				}
			} ]);
			console.log(tokens);
			// se procesan los tokens
			var tempType = "";
			var tempString = "";
			tokens.forEach(function(token, index, arr) {
				var text = token[0];
				var type = token[1];

				tempType = !!tempType ? tempType : type;
				console.log("tempType", tempType);

				if(tempType === type) {
					tempString += text;
				} else {
					stack.push([ tempString, tempType ]);
					tempString = "";
					tempString += text;
					tempType = type;
				}
			});
			stack.push([ tempString, tempType ]);
			console.log(stack);
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