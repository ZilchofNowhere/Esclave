const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")

const rip = ["ölmüş", "vefat etmiş"] 
const blacklist = [] //any features about blacklist dont work

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setPresence({
    status: 'idle',
    activity: {
        name: 'Être un bon esclave pour son propriétaire',
        type: 'PLAYING',
    }
})
})
client.on("message", msg => {
    if (msg.author.bot){
        return
    }
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/)
    const yaz = function(x){
        msg.channel.send(x)}

    if (rip.some(word => msg.content.includes(word))){
        yaz("RIP :pensive:")
    }

    /*
    if (msg.author.id in blacklist){
        yaz("You are in the blacklist, you can't use commands :scream:")
        return
    }
*/

    switch(args[0]){
        /*
        case "blacklist":
            if (msg.author.id != config.ownerid){
                yaz("Who gave you the permission, huh?")
                break
            }
            blacklist.push(args[1])
            yaz(`The user with the ID of ${args[1]} has been added to the blacklist`)
            break

        case "whitelist":
            if (msg.author.id != config.ownerid){
                yaz("Who gave you the permission, huh?")
                break
            }
            if (blacklist == []){
                yaz("The blacklist is already empty")
                break
            } else {
            blacklist.pop()
            break
            }
*/

        case "ping":
            yaz("Pong!")
            break
        
        case "hello":
            msg.reply("hello :blush:")
            break

        case "say":
            let msj = args.join(" ")
            msg.delete().catch()
            yaz(msj.slice(3))
            break

        case "clear":
            if (!args[1]){
                return msg.channel.send("How many messages?")
            }
            msg.channel.bulkDelete(args[1]).then(() => {
                yaz(`Cleared ${args[1]} message(s)`)
                msg.channel.bulkDelete(1)
            })
            break

        case "how":
            if (!args[1] || !args[3]){
                yaz("Your question doesn't seem complete :thinking:")
                break
            }
            let n = Math.floor(Math.random() * 101)
            yaz(`${args[3].charAt(0).toUpperCase() + args[3].slice(1)} is ${n}% ${args[1]}`)
            break
            
        case "eval":
            if (msg.author.id != config.ownerid){
                yaz("Who gave you the permission, huh?")
                break
            }
            else if (msg.author.id == config.ownerid){
                try {
                    let kod = msg.content.slice(5)
                    eval(kod)
                    break
                }
                catch (Error){
                    yaz("It seems that you entered invalid code :-1:")
                    break
                }
            }
        
        case "calc":
            /* unused variables
            var n1 = parseFloat(args[1])
            var n2 = parseFloat(args[3])
            */
            if (!args[2] || !args[3]){
                yaz("Which operation do you want me to do? :thinking:")
                break
            }
            try {
                var res = eval(msg.content.slice(5)) //version that supports only two arguments : eval(`${parseFloat(args[1])} ${args[2]} ${parseFloat(args[3])}`)
                if (res == "NaN"){
                    yaz("Don't you know maths :zero:")
                    break
                }
                yaz(res)
                break
            }
            catch(Error){
                yaz("An error occurred, revise your request or maybe you wrote something ahead of your time :-1:")
                break
            }
            /* initial code that didnt work (some parts lack or are still used in the valid version) : 
            else if (n1 != Number || n2 != Number){
                yaz("I can't add apples to pears. Give me some real numbers :apple: :pear:")
                break 
            } else if (args[2] == "+"){
                yaz(n1 + n2)
                break
            } else if (args[2] == "-"){
                yaz(n1 - n2)
                break
            } else if (args[2] == "*"){
                yaz(n1 * n2)
                break
            } else if (args[2] == "/"){
                yaz(n1 / n2)
                break
            } else if (args[2] == "^"){
                yaz(n1 ** n2)
                break
            } else {
                yaz("An error occurred, revise your request or maybe you wrote something ahead of your time :-1:")
                break
            }*/
        
        case "import":
            if (args[1] == "antigravity"){
                yaz("https://xkcd.com/353/")
            } else {
                yaz("No import support in JS, sorry :/")
            }
            break
            
        case "meurs":
            if (msg.author.id != config.ownerid){
                yaz("I don't know what you mean :grimacing:")
                break
            } else process.exit(1)

        case "help":
            const aide = new Discord.MessageEmbed()
            .setColor("00c18e")
            .setTitle("All of the commands so far (there might be a couple of secret ones tho :face_with_monocle:)")
            .setDescription("Like and subscribe to get more of them\nBot prefix is '.'")
            .addField("hello", "Greet this cute bot :wave:", false)
            .addField("ping", "Guess how the bot will respond :ping_pong:", false)
            .addField("say", "Make the bot *say* something, like a parrot :parrot:", false)
            .addField("clear", "Get rid of your dirty past :soap:", false)
            .addField("how ____", "Learn how much you are something :thinking:", false)
            .addField("calc", "Do any of your calculation stuff :plus: :minus: :heavy_multiplication_x: :heavy_division_sign:", false)
            .setFooter(`${msg.author.tag} asked for this`)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/avatars/842055167074762784/8e8d23400e01c56adebbeb7f915953f1.png?size=128")
            return msg.channel.send(aide)

        default:
            break
    }
})

client.login(config.token)
