"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import SignInDialog from "./sign-in-dialog";


const SidebarSheet = () => {
    const { data } = useSession()
    const handleLoginWithGoogleClick = () => signIn("google")
    const handleLogoutClick = () => signOut()
    console.log(data?.user)

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="py-5 border-b border-solid flex items-center gap-3 justify-between">


                {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={data?.user?.image ?? ""} />
                        </Avatar>

                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <SignInDialog />
                            </DialogContent>
                        </Dialog>

                    </>
                )}

            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
                <SheetClose asChild>
                    <Button className="gap-2 justify-start" variant="ghost" asChild>
                        <Link href="/">
                            <HomeIcon size={18} />
                            Início
                        </Link>
                    </Button>
                </SheetClose>
                <Button className="gap-2 justify-start" variant="ghost" asChild>
                    <Link href="/bookings">
                        <CalendarIcon size={18} />
                        Agendamentos</Link>
                </Button>
            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
                {quickSearchOptions.map((option) =>
                    <SheetClose key={option.title} asChild>
                        <Button
                            className="gap-2 justify-start"
                            variant="ghost"
                            asChild
                        >
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image alt={option.title}
                                    src={option.imageUrl}
                                    height={18}
                                    width={18}
                                />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                )}
            </div>

            {
                data?.user && (
                    <div className="py-5 flex flex-col gap-2" onClick={handleLogoutClick}>
                        <Button className="justify-start gap-2" variant="ghost">
                            <LogOutIcon />
                            Sair da conta
                        </Button>
                    </div>
                )
            }
        </SheetContent >
    );
}

export default SidebarSheet;