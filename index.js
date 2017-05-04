const osascript = require('node-osascript');

let Service;
let Characteristic;

module.exports = homebridge => {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-app-switch', 'AppSwitch', AppSwitch);
};

function AppSwitch(log, config) {
	const name = config.name;
	const debug = config.debug;
	this.appName = config.appName;

	if (!config.appName) {
		log('Missing appName in config!');
		return;
	}

	this.log = function () {
		if (!debug) {
			return;
		}
		log.apply({}, Array.prototype.slice.call(arguments, 0));
	};

	log('Creating switch');
	this.lightService = new Service.Switch(name);

	log('Adding ON characteristic');
	this.lightService
		.getCharacteristic(Characteristic.On)
		.on('set', this.setPowerState.bind(this))
		.on('get', this.getPowerState.bind(this));
}

AppSwitch.prototype.getServices = function () {
	return [this.lightService];
};

AppSwitch.prototype.setPowerState = function (powerState, callback) {
	this.log('SET POWERSTATE - ' + powerState);

	osascript.execute(`tell application "${this.appName}" to ${powerState ? 'activate' : 'quit'}`);
	callback();
};

AppSwitch.prototype.getPowerState = function (callback) {
	const log = this.log;
	log('GET POWERSTATE');

	osascript.execute(`tell application "System Events" to exists (processes where name is "${this.appName}")`, (err, res) => {
		if (err) {
			log('GET POWERSTATE - ERR - ' + err);
			callback(err, null);
		} else {
			const state = res;
			log('GET POWERSTATE SUCCESS - ' + state);
			callback(null, state);
		}
	});
};