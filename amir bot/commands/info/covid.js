const fetch = require('node-fetch');



const Discord = require('discord.js');



module.exports = {

    name: "covid",
    category: "info",
    description: "Track a country or worldwide COVID-19 cases",



    async run (client, message, args){



        let countries = args.join(" ");






        const noArgs = new Discord.MessageEmbed()

        .setTitle('Missing arguments')

        .setColor(0xFF0000)

        .setDescription('You are missing some args (ex: _covid all || _covid Canada)')

        .setTimestamp()



        if(!args[0]) return message.channel.send(noArgs);



        if(args[0] === "all"){

            fetch(`https://covid19.mathdro.id/api`)

            .then(response => response.json())

            .then(data => {

                let confirmed = data.confirmed.value.toLocaleString()

                let recovered = data.recovered.value.toLocaleString()

                let deaths = data.deaths.value.toLocaleString()



                const embed = new Discord.MessageEmbed()

                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                 
                .setColor('RANDOM') 

                .addField('Confirmed Cases', confirmed)

                .addField('Recovered', recovered)

                .addField('Deaths', deaths)



                message.channel.send(embed)

            })

        } else {

            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)

            .then(response => response.json())

            .then(data => {

                let confirmed = data.confirmed.value.toLocaleString()

                let recovered = data.recovered.value.toLocaleString()

                let deaths = data.deaths.value.toLocaleString()



                const embed = new Discord.MessageEmbed()

                .setTitle(`COVID-19 Stats for **${countries}**`)
                
                .setColor(0xFB3C3C)       
         

                .setFooter("https://en.wikipedia.org/wiki/Introduction_to_viruses")

                .setThumbnail("https://cdn.discordapp.com/attachments/538082151980072960/724873419539349554/SARS-CoV-2_withou3333333t_background.png ")

                .addField('Confirmed Cases', confirmed)

                .addField('Recovered', recovered)

                .addField('Deaths', deaths)

				

                


                message.channel.send(embed)
				

            }).catch(e => {

                return message.channel.send('Invalid country provided')

            })

        }

    }

}