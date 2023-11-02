module.exports.validateEmail = (v) => typeof v === 'string' && /^\w+(?:.\w+)?@[-\w]+.[a-z]{2,}$/i.test(v);
