# components-v2

Simple Lib for the new Discord Components v2

## Installation

```bash
npm i github:LaylaLeaks/components-v2
```

## Example
```js
const { Container, TextDisplay, Separator, Message, Sender } = require("components-v2");

const sender = Sender.createBotSender({
    botToken: "BOT-TOKEN",
    channelId: "CHANNELID",
    crosspost: false,
});

const message = new Message()
    .addContainer(
        new Container()
            .setAccentColor("7923c4")
            .addTextDisplay("## Message Container")
            .addSeparator({ divider: true, spacing: "small" })
            .addTextDisplay("This is a Components v2 message!")
            .addSeparator({ divider: true, spacing: "small" })
            .addTextDisplay("-# This could be a cool footer")
    );

sender.send(message)
    .then(() => console.log("Message sent!"))
    .catch(console.error);
```

## Contributing
Every improvements are welcome, just open a pull request, if there an issue just open a issue.