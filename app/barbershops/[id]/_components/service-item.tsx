"use client";

import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }

    //TODO: abrir modal de agendamentos
  };
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex justify-between items-center mt-3">
              <p className="text-primary font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(service.price)}
              </p>
              <Button variant={"secondary"} onClick={handleBookingClick}>
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
