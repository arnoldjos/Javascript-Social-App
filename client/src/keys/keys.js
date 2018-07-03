let keys;

if (process.env.NODE_ENV === 'production') {
	keys = require('./keys_prod');
} else {
	keys = require('./keys_devr');
}

export default keys;
