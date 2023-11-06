module.exports.validateEmail = (v) => typeof v === 'string' && /^[a-z0-9]+(?:[-.][_a-z0-9]+)?@[a-z0-9]+(?:[-a-z0-9]+)?\.[a-z]{2,}$/i.test(v);
