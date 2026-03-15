const { Container, TextDisplay, Separator, Message, Sender } = require("components-v2");

const sender = Sender.createBotSender({
    botToken: "BOT-TOKEN",
    channelId: "CHANNELID",
    crosspost: false,
});

/* For more Container just add it (max. 10 Container possible) */
const message = new Message()
    .addContainer(
        new Container()
            .setAccentColor("7923c4")
            .addTextDisplay("## Message Container")
            .addSeparator({ divider: true, spacing: "small" })
            .addTextDisplay("This is a Components v2 message!")
            .addSeparator({ divider: true, spacing: "small" })
            .addTextDisplay("-# This could be a cool footer")
    )
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