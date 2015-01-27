exports.parse = function(address) {
	var stack = [], temp = [], result = true;
	address && [].forEach.apply(address, [ parse ]);
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
						if(/^\*$/i.test(character)) {
							//console.log("ASTERISCO");
						} else {
							console.log(character);
							console.log("ERRORRRRRRRRRRRRRR");
							result = false;
							return false;
						}
					}
				}
			}
		}
	}
	return result;
};