module.exports.validateUserName = (v) => typeof v === 'string' && /^[a-zа-яё -]+$/i.test(v);
