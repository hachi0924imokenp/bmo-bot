if (message.author.id === '197891949913571329') {
			let toSay = `${args.msg}
~TJ, SmoreSoftware Owner`
			//eslint-disable-next-line array-callback-return
			this.client.guilds.map((guild) => {
				let found = 0
				toSay = `${args.msg}
~TJ, SmoreSoftware Owner
Want to turn these announcements off? Do \`${guild.commandPrefix}settings add announcements off\` to opt out.`
				let setting = guild.settings.get('announcements')
				//eslint-disable-next-line array-callback-return
				if (setting === 'off') return
				//eslint-disable-next-line array-callback-return
				guild.channels.map((c) => {
					if (found === 0) {
						if (c.type === 'text') {
							if (c.permissionsFor(this.client.user).has('VIEW_CHANNEL') === true) {
								if (c.permissionsFor(this.client.user).has('SEND_MESSAGES') === true) {
									c.send(toSay)
									found = 1
								}
							}
						}
					}
				})
			})
			message.reply(`Execution completed. Shouted "${toSay}"`)
		} else if (message.author.id === '251383432331001856') {
			let toSay = `${args.msg}
~Chrono, SmoreSoftware Founder & Retired Developer`
			//eslint-disable-next-line array-callback-return
			this.client.guilds.map((guild) => {
				let found = 0
				toSay = `${args.msg}
~Chrono, SmoreSoftware Founder & Retired Developer
Want to turn these announcements off? Do \`${guild.commandPrefix}settings add announcements off\` to opt out.`
				let setting = guild.settings.get('announcements')
				//eslint-disable-next-line array-callback-return
				if (setting === 'off') return
				//eslint-disable-next-line array-callback-return
				guild.channels.map((c) => {
					if (found === 0) {
						if (c.type === 'text') {
							if (c.permissionsFor(this.client.user).has('VIEW_CHANNEL') === true) {
								if (c.permissionsFor(this.client.user).has('SEND_MESSAGES') === true) {
									c.send(toSay)
									found = 1
								}
							}
						}
					}
				})
			})
			message.reply(`Execution completed. Shouted "${toSay}"`)
		} else if (message.author.id === '156019409658314752') {
			let toSay = `${args.msg}
~Ciel, SmoreSoftware CEO & Host`
			//eslint-disable-next-line array-callback-return
			this.client.guilds.map((guild) => {
				let found = 0
				toSay = `${args.msg}
~Ciel, SmoreSoftware CEO & Host
Want to turn these announcements off? Do \`${guild.commandPrefix}settings add announcements off\` to opt out.`
				let setting = guild.settings.get('announcements')
				//eslint-disable-next-line array-callback-return
				if (setting === 'off') return
				//eslint-disable-next-line array-callback-return
				guild.channels.map((c) => {
					if (found === 0) {
						if (c.type === 'text') {
							if (c.permissionsFor(this.client.user).has('VIEW_CHANNEL') === true) {
								if (c.permissionsFor(this.client.user).has('SEND_MESSAGES') === true) {
									c.send(toSay)
									found = 1
								}
							}
						}
					}
				})
			})
			message.reply(`Execution completed. Shouted "${toSay}"`)
		} else {
			//eslint-disable-next-line array-callback-return
			this.client.guilds.map((guild) => {
				let found = 0
				let toSay = `${args.msg}
~SmoreSoftware
Want to turn these announcements off? Do \`${guild.commandPrefix}settings add announcements off\` to opt out.`
				let setting = guild.settings.get('announcements')
				//eslint-disable-next-line array-callback-return
				if (setting === 'off') return
				//eslint-disable-next-line array-callback-return
				guild.channels.map((c) => {
					if (found === 0) {
						if (c.type === 'text') {
							if (c.permissionsFor(this.client.user).has('VIEW_CHANNEL') === true) {
								if (c.permissionsFor(this.client.user).has('SEND_MESSAGES') === true) {
									c.send(toSay)
									found = 1
								}
							}
						}
					}
				})
			})
			message.reply(`Execution completed. Shouted "${args.msg}"`)
		}
	}
