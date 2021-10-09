const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const { exec } = require("child_process")
const { stdout, stderr } = require("process")
const config = require("./config.json")

const rip = ["ölmüş", "vefat etmiş"] 

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

    if (msg.content.startsWith(config.prefix)){
        switch(args[0]){
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
                        var res = eval(kod)
                        if (toString(res) != "" || toString(res) != "[object Undefined]"){
                            yaz(res)
                        } else {
                            yaz("No visible output :ghost:")
                        }
                        break
                    }
                    catch (Error){
                        yaz("It seems that you entered invalid code :-1:")
                        break
                    }
                }
            
            case "run":
                msg.channel.messages.fetch(args[1]).then(run => {
                    if(run.content.startsWith("```js")){
                        try {
                            fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\jsrun.js", run.content.substring(5, run.content.length - 3), (err)=>{
                                exec("node \"D:\\Programming\\Important Stuff\\RunLib\\jsrun.js\"", (err, stdout, stderr)=>{
                                    yaz(`\`\`\`${stdout} ${stderr}\`\`\``)
                                })
                            });
                        } catch (err){
                            yaz("An error occurred")
                        }
                    } else {
                        if (run.content.startsWith("```py")){
                            try {
                                fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\pyrun.py", run.content.substring(5, run.content.length - 3), (err)=>{
                                    exec("python -u \"D:\\Programming\\Important Stuff\\RunLib\\pyrun.py\"", (err, stdout, stderr)=>{
                                        yaz(`${stdout} ${stderr}`)
                                    })
                                })
                            } catch (err){
                                yaz("An error occurred")
                            }
                        } else if (run.content.startsWith("```cpp")){
                            try {
                                fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\cpprun.cpp", run.content.substring(6, run.content.length - 3), (err)=>{
                                    exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && g++ cpprun.cpp -o cpprun.exe", (err, stdout, stderr)=>{
                                        yaz(`${stdout} ${stderr}\nCompilation ended`)
                                        exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && .\\cpprun.exe", (err, stdout, stderr)=>{
                                            yaz(`${stdout} ${stderr}`)
                                        })
                                    })
                                })
                            } catch (err){
                                yaz("An error occurred")
                            }
                        } else if (run.content.startsWith("```kt")){
                            try {
                                fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\ktrun.kt", run.content.substring(5, run.content.length - 3), (err)=>{
                                    exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && kotlinc ktrun.kt -include-runtime -d ktrun.jar", (err, stdout, stderr)=>{
                                        yaz(`${stdout} ${stderr}\nCompilation ended`)
                                        exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && java -jar ktrun.jar", (err, stdout, stderr)=>{
                                            yaz(`${stdout} ${stderr}`)
                                        })
                                    })
                                })
                            } catch (err){
                                yaz("An error occurred")
                            }
                        } else if (run.content.startsWith("```ts")){
                            try {
                                fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\tsrun.ts", run.content.substring(5, run.content.length - 3), (err)=>{
                                    exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && ts-node tsrun.ts", (err, stdout, stderr)=>{
                                        yaz(`${stdout} ${stderr}`)
                                    })
                                })
                            } catch (err){
                                yaz("An error occurred")
                            }
                        } else if (run.content.startsWith("```cs")){
                            try {
                                fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\CSRun\\Program.cs", run.content.substring(5, run.content.length - 3), (err)=>{
                                    exec("cd \"D:\\Programming\\Important Stuff\\RunLib\\CSRun\" && dotnet run", (err, stdout, stderr)=>{
                                        yaz(`${stdout} ${stderr}`)
                                    })
                                })
                            } catch (err){
                                yaz("An error occurred")
                            }
                        } else if (run.content.startsWith("```c")){
                            try {
                                fs.writeFile("D:\\Programming\\Important Stuff\\RunLib\\crun.c", run.content.substring(4, run.content.length - 3), (err)=>{
                                    exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && gcc crun.c -o crun.exe", (err, stdout, stderr)=>{
                                        yaz(`${stdout} ${stderr}\nCompilation ended`)
                                        exec("cd \"D:\\Programming\\Important Stuff\\RunLib\" && .\\crun.exe", (err, stdout, stderr)=>{
                                            yaz(`${stdout} ${stderr}`)
                                        })
                                    })
                                })
                            } catch (err){
                                yaz("An error occurred")
                            }
                        } else {
                            yaz("Your language is not supported yet :/")
                        }
                    }
                }, yaz("Code running"))
                break

            case "import":
                if (args[1] == "antigravity"){
                    yaz("https://xkcd.com/353/")
                } else {
                    yaz("You can't import creative stuff like this in JS, sorry :/")
                }
                break

            case "torture":
                if (!args[1]){
                    yaz("Who do you want to torture? :grimacing:")
                }
                else {
                    client.users.fetch(args[1]).then(dm => {
                    for (var i = 0; i < 10; ++i){
                        dm.send("Tortureeeee :smiling_imp:")
                    }
                })}
                break

            case "setnick":
                msg.guild.members.fetch(args[1]).then(id => {
                    id.setNickname(msg.content.slice(28).trim()).catch("An error occurred")
                })
                break

            case "meurs":
                if (msg.author.id != config.ownerid){
                    yaz("I don't know what you mean :grimacing:")
                    break
                } else process.exit(0)

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
                .addField("torture", "Do a little trolling :clown:", false)
                .addField("run", "Do some real hacking and conquer the world :keyboard:\n**Supported langs:** C#, C, C++, JavaScript, Kotlin, Python, TypeScript (more to come soon)", false)
                .addField("setnick", "Change the nick of your friends", false)
                .setFooter(`${msg.author.tag} asked for this`)
                .setTimestamp()
                .setThumbnail("https://cdn.discordapp.com/avatars/842055167074762784/8e8d23400e01c56adebbeb7f915953f1.png?size=128")
                return msg.channel.send(aide)

            default:
                break
        }
    } else {
        return
    }
})

client.login(config.token)
