const methods = require('./methods');
const api = require('./api');
const { execute } = require('./utils');

class VkBot {
  constructor(settings) {
    if (!settings) {
      throw new Error('You must pass token into settings');
    } else if (typeof settings === 'object' && !settings.token) {
      throw new Error('You must set token param in settings');
    }

    this.middlewares = [];
    this.methods = [];
    this.products = [];

    this.isStopped = false;

    this.settings = Object.assign(
      {
        polling_timeout: 25,
        execute_timeout: 50,
      },
      typeof settings === 'object'
        ? settings
        : { token: settings },
    );

    Object.entries({ ...methods, api }).forEach(([key, method]) => {
      this[key] = method.bind(this);
    });

    setInterval(() => {
      execute(
        this.methods,
        this.settings.token,
      );

      this.methods = [];
    }, settings.execute_timeout);
  }

  event(triggers, ...middlewares) {
    this.command(triggers, ...middlewares);
  }

  
    on(...middlewares) {
        this.middlewares = this.middlewares.filter((item) => item.triggers.length !== 0)
    this.command([], ...middlewares);
  }

removeOn() {
	this.middlewares = this.middlewares.filter((item) => item.triggers.length !== 0)
}

sortMiddlewares() {
	this.middlewares = this.middlewares.sort((a, b) => b.triggers.length - a.triggers.length)
}


deleteCommand(command) {
   this.middlewares =  this.middlewares.filter((obj) => {
                        return -1 === obj.triggers.indexOf(command);
                })
  }

}

module.exports = VkBot;
