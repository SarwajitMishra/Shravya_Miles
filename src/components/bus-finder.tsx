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
import { Loader2, ArrowRight, Clock, IndianRupee, Sofa } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

const mockBusResults = [
  {
    operator: "VRL Travels",
    type: "A/C Sleeper (2+1)",
    from: "Bangalore",
    to: "Hyderabad",
    departure: "21:00",
    arrival: "06:30",
    duration: "9h 30m",
    price: "950",
    amenities: ["A/C", "Sleeper", "Water Bottle"],
    image: "https://placehold.co/600x400.png",
    imageHint: "night highway"
  },
  {
    operator: "KSRTC",
    type: "Airavat Club Class",
    from: "Bangalore",
    to: "Hyderabad",
    departure: "22:30",
    arrival: "07:45",
    duration: "9h 15m",
    price: "1150",
    amenities: ["A/C", "Semi-Sleeper", "Charging Port"],
    image: "https://placehold.co/600x400.png",
    imageHint: "bus interior"
  },
];

export function BusFinder() {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async () => {
    setSearching(true);
    setResults(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResults(mockBusResults);
    setSearching(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Search Buses</CardTitle>
          <CardDescription>
            Book your bus tickets from a wide range of operators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input placeholder="From City" />
            <Input placeholder="To City" />
            <Input type="date" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} disabled={searching} className="w-full sm:w-auto">
            {searching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {searching ? "Searching..." : "Search Buses"}
          </Button>
        </CardFooter>
      </Card>

      {searching && (
         <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Finding Buses...</h3>
            <p className="mt-2 text-sm text-muted-foreground">Checking schedules and seat availability.</p>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Buses</h2>
          {results.map((bus, index) => (
            <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1">
                   <Image
                    src={bus.image}
                    alt={bus.operator}
                    width={600}
                    height={400}
                    data-ai-hint={bus.imageHint}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{bus.operator}</CardTitle>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{bus.from}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>{bus.to}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent"/>
                        <div>
                          <p className="font-semibold">{bus.departure} - {bus.arrival}</p>
                          <p className="text-xs text-muted-foreground">{bus.duration}</p>
                        </div>
                      </div>
                       <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-accent"/>
                        <div>
                          <p className="font-semibold">₹{bus.price}</p>
                          <p className="text-xs text-muted-foreground">per seat</p>
                        </div>
                      </div>
                    </div>
                     <div className="mt-4 flex items-center gap-2">
                        <Sofa className="h-4 w-4 text-accent"/>
                        <p className="font-semibold">{bus.type}</p>
                      </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {bus.amenities.map((amenity: string) => (
                        <Badge key={amenity} variant="secondary">{amenity}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <Separator className="my-2" />
                  <CardFooter>
                     <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
