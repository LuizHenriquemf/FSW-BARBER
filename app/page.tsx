import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";


const Home = async () => {

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Luiz</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
          <Button className="gap-2" variant="secondary" key={option.title}>
            <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
            {option.title}
          </Button>
        ))}
        </div>

        {/* IMAGEM */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt="Agende nos melhores com FSW Barber"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        <h2 className="mb-3 mt-6 uppercase text-gray-400 font-bold text-xs ">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

        <h2 className="mb-3 mt-6 uppercase text-gray-400 font-bold text-xs ">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>
      </div>
    </div>
  )
}

export default Home;