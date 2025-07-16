"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Car, Users, IndianRupee } from "lucide-react";
import Image from "next/image";

const mockCabResults = [
  {
    service: "Ola",
    type: "Mini",
    capacity: "4 Seats",
    price: "450-550",
    eta: "5 mins",
    image: "https://placehold.co/300x200.png",
    imageHint: "city street"
  },
  {
    service: "Uber",
    type: "Go",
    capacity: "4 Seats",
    price: "480-580",
    eta: "3 mins",
    image: "https://placehold.co/300x200.png",
    imageHint: "car interior"
  },
   {
    service: "Ola",
    type: "Prime Sedan",
    capacity: "4 Seats",
    price: "600-700",
    eta: "8 mins",
    image: "https://placehold.co/300x200.png",
    imageHint: "night city"
  },
  {
    service: "Uber",
    type: "Premier",
    capacity: "4 Seats",
    price: "620-730",
    eta: "6 mins",
    image: "https://placehold.co/300x200.png",
    imageHint: "map navigation"
  },
];

export function CabFinder() {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async () => {
    setSearching(true);
    setResults(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResults(mockCabResults);
    setSearching(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a Cab</CardTitle>
          <CardDescription>
            Get a ride in minutes. Perfect for last-mile connectivity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input placeholder="Pickup Location" />
            <Input placeholder="Drop Location" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} disabled={searching} className="w-full sm:w-auto">
            {searching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {searching ? "Finding Cabs..." : "Find Cabs"}
          </Button>
        </CardFooter>
      </Card>

      {searching && (
         <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Finding Cabs...</h3>
            <p className="mt-2 text-sm text-muted-foreground">Locating nearby rides for you.</p>
        </div>
      )}

      {results && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Available Cabs</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((cab, index) => (
              <Card key={index} className="flex flex-col justify-between transition-shadow hover:shadow-lg">
                <CardHeader>
                    <Image
                      src={cab.image}
                      alt={cab.service}
                      width={300}
                      height={200}
                      data-ai-hint={cab.imageHint}
                      className="mb-4 w-full rounded-lg object-cover"
                    />
                  <CardTitle className="flex items-center justify-between">
                    <span>{cab.service} {cab.type}</span>
                    <span className="text-sm font-medium text-green-600">{cab.eta}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{cab.capacity}</span>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <IndianRupee className="h-4 w-4" />
                        <span>Est. Fare: ₹{cab.price}</span>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Book Ride</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
