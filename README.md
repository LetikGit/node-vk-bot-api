# VK Bot API

Clean API for VK bots based on long poll with multi-dispatch send messages **(~75 per second)**.

## Install

```
$ npm install node-vk-bot-api
```

## Example

Full example you can check in `examples` folder.

```javascript
const app = require('node-vk-bot-api');

app.auth(process.env.BOT_TOKEN);

app.command('/start', (data) => {
  const uid = data.user_id;

  app.sendMessage({ user_id: uid, message: 'Hello, this is /start command!' });
});

app.hears('hello', (data) => {
  const uid = data.user_id;

  app.sendMessage({ user_id: uid, message: 'Hi!' });
});

app.reserve(data => {
  const uid = data.user_id;
  const msg = data.msg;

  app.sendMessage({ user_id: uid, message: msg }); // => '{ response: [ 3 ] }'
});

app.startLongPoll();
```

## Methods

* [.auth(token)](https://github.com/bifot/node-vk-bot-api#authtoken)
* [.command(command, callback)](https://github.com/bifot/node-vk-bot-api#commandcommand-callback)
* [.hears(command, callback)](https://github.com/bifot/node-vk-bot-api#hearscommand-callback)
* [.reserve(callback)](https://github.com/bifot/node-vk-bot-api#reservecallback)
* [.sendMessage(opts)](https://github.com/bifot/node-vk-bot-api#sendmessageopts)
* [.getLastMessage(update)](https://github.com/bifot/node-vk-bot-api#getlastmessageupdate)
* [.getForwardMessage(update)](https://github.com/bifot/node-vk-bot-api#getforwardmessageupdate)
* [.startLongPoll()](https://github.com/bifot/node-vk-bot-api#startlongpoll)
* [.getLongPoll()](https://github.com/bifot/node-vk-bot-api#getlongpoll)

### .auth(token)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| token      | string    | yes       |

Authting with token.

```javascript
app.setToken('88935996c67c290f47b79a0c8b0093227e916ce14c62e490aa96c8f8ed3090c9cbcdda92c8fadf1f5c74c');
```

### .command(command, callback)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| command    | string    | yes       |
| callback   | function  | yes       |

If bot get message which equal to command, then will run callback.

```javascript
app.command('/start', (data) => {
  app.sendMessage({ user_id: data.user_id, message: 'This is start command!' });
});
```

### .hears(command, callback)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| command    | string    | yes       |
| callback   | function  | yes       |

If bot hears command in message from user, then will run callback (e.g. user sent 'Hello, world' and bot hears 'hello', then bot will run callback).

```javascript
app.hears('hello', (data) => {
  app.sendMessage({ user_id: data.user_id, message: 'Hi!' });
});
```

### .reserve(callback)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| callback   | function  | yes       |

If bot get message and this isn't command, then will run reserved callback.

```javascript
app.reserve(data => {
  app.sendMessage({ user_id: data.user_id, message: 'Sorry, you sent not command to bot.' });
});
```

### .sendMessage(opts)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| opts       | object    | yes       |

Send message (multi-dispatch).

```javascript
app.sendMessage({ user_id: data.user_id, message: 'Hello, world!' });
```

### .getLastMessage(update)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| update     | object    | yes       |

Get last message from forward message.

```javascript
app.getLastMessage({
  "response": {
    "count": 1,
    "items": [{
      "id": 480,
      "date": 1491653021,
      "out": 0,
      "user_id": 145003487,
      "read_state": 1,
      "title": " ... ",
      "body": "",
      "fwd_messages": [{
        "user_id": -138165805,
        "date": 1491652976,
        "body": "Hello, world!"
      }]
    }]
  }
});
```

### .getForwardMessage(update)

| Parameter  | Type      | Requried  |
| -----------|:---------:| ---------:|
| update     | array     | yes       |

Get message info from forward message. If function detects `fwd_messages`, then will call `.getLastMessage(update)`.

```javascript
app.getForwardMessage([ 4, 487, 529, 145003487, 1491653078, ' ... ', '',  { fwd: '145003487_2214301' } ]);
```

### .startLongPoll()

Get long poll params.

```javascript
app.startLongPoll();
```

### .getLongPoll()

Start long poll.

## License

MIT.
