export const validateOrgnumber = (orgnumber: string) => {
	let valid = false;

    if (!orgnumber.match(/^(\d{1})(\d{5})-(\d{4})$/))
    {
        return false;
    }

    const group = RegExp.$1;
    const controldigits = RegExp.$3;
    const alldigits = group + RegExp.$2 + controldigits;

    if (parseInt(alldigits.substring(2, 3)) < 2)
    {
        return false
    }

    let nn = "";

    for (let n = 0; n < alldigits.length; n++) {
        nn += ((((n + 1) % 2) + 1) * parseInt(alldigits.substring(n, n + 1)));
    }

	let checksum = 0;

    for (let n = 0; n < nn.length; n++) {
        checksum += parseInt(nn.substring(n, n + 1)) * 1;
    }

    valid = (checksum % 10 == 0) ? true : false;

	return valid;
}

export const validateSsn = (ssn: string) => {
	const newSsn = ssn.replace(/\D/g, "").split("").reverse().slice(0, 10);

    if (newSsn.length !== 10) {
        return false;
    }

    const sum = newSsn.map((n) => Number(n)).reduce((previous, current, index) => {
		if (index % 2) {
			current *= 2;
		}

		if (current > 9) {
			current -= 9;
		}

		return previous + current;
    });

    return 0 === sum % 10;
}

export const validateOrgNumberOrSsn = (input: string) => validateOrgnumber(input) || validateSsn(input);

export const validateOrgnumberOptional =(orgnumber: string) => {
    if (orgnumber.length === 0 || orgnumber === null || typeof orgnumber === 'undefined') {
        return true;
    }

    return validateOrgnumber(orgnumber);
}

export const validateSsnOptional = (ssn: string) => {
    if (ssn.length === 0 || ssn === null || typeof ssn === 'undefined') {
        return true;
    }

    return validateSsn(ssn);
}

export const validateZipCode = (zipCode: string) => {
	if (zipCode.length < 5 || zipCode.length > 6) {
		return false;
	}

	return true;
}
