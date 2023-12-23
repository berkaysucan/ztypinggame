"use client"
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Keyboard, User } from 'lucide-react';
import { link as linkStyles } from "@nextui-org/theme";
import { signOut, useSession } from "next-auth/react";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { SearchEmail } from "@/app/libs/db";
import axios from "axios";
import { useEffect, useState } from "react";



export const Navbar = () => {
	
	const { data: session, status } = useSession();
	const [username,setUsername ] = useState<string>();
	useEffect(() => {
		const fetchData = async () => {
			if(session)
			{
			const email = session?.user?.email;
			const result =  await axios.post("/api/getUser", JSON.stringify(email as string));
			setUsername(result.data.username);
			
			}
		}
				
		fetchData();
	}, [session])
	

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Keyboard size={32} />
						<p className="ml-1 font-bold text-inherit text-primary-600">Z TYPE</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
				
					
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>
			{session ? 
			<>
			<Link className="text-foreground flex gap-2 " href={`/profile/${username}`}><User />{username}</Link>
				<NavbarItem>		
				<Button color="primary" variant="ghost" onClick={()=>{signOut()}}>Sign Out</Button>
				</NavbarItem>
				
			</>
:
				<>
				<NavbarItem>
					<RegisterForm/>
				</NavbarItem>

				<NavbarItem>
					<LoginForm/>
				</NavbarItem>
				</>
				
				
			}
			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2 ">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}` }>
							<Link className=""
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
