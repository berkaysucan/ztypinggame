export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [

    {
      label: "Game",
      href: "/",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
   
	],
	navMenuItems: [
		{
			label: "Game",
			href: "/game",
		},
		{
			label: "Leaderboard",
			href: "/leaderboard",
		},
		{
			label: "Profile",
			href: "/profile",
		},

	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
