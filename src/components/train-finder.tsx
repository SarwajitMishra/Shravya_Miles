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
import { Loader2, ArrowRight, Clock, IndianRupee } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";

const mockTrainResults = [
  {
    name: "Shatabdi Express",
    number: "12001",
    from: "New Delhi",
    to: "Jaipur",
    departure: "06:00",
    arrival: "10:30",
    duration: "4h 30m",
    price: "850",
    image: "https://placehold.co/600x400.png",
    imageHint: "modern train"
  },
  {
    name: "Rajdhani Express",
    number: "12951",
    from: "New Delhi",
    to: "Jaipur",
    departure: "17:15",
    arrival: "21:45",
    duration: "4h 30m",
    price: "1250",
    image: "https://placehold.co/600x400.png",
    imageHint: "train window"
  },
  {
    name: "Duronto Express",
    number: "22209",
    from: "New Delhi",
    to: "Jaipur",
    departure: "22:10",
    arrival: "02:55",
    duration: "4h 45m",
    price: "1100",
    image: "https://placehold.co/600x400.png",
    imageHint: "train tracks"
  },
];

export function TrainFinder() {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async () => {
    setSearching(true);
    setResults(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResults(mockTrainResults);
    setSearching(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Search Trains</CardTitle>
          <CardDescription>
            Find real-time availability for Indian Railways.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input placeholder="From Station" />
            <Input placeholder="To Station" />
            <Input type="date" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} disabled={searching} className="w-full sm:w-auto">
            {searching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {searching ? "Searching..." : "Search Trains"}
          </Button>
        </CardFooter>
      </Card>

      {searching && (
         <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Finding Trains...</h3>
            <p className="mt-2 text-sm text-muted-foreground">Checking availability for you.</p>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Trains</h2>
          {results.map((train, index) => (
            <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1">
                   <Image
                    src={train.image}
                    alt={train.name}
                    width={600}
                    height={400}
                    data-ai-hint={train.imageHint}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{train.name} ({train.number})</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{train.from}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>{train.to}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent"/>
                      <div>
                        <p className="font-semibold">{train.departure} - {train.arrival}</p>
                        <p className="text-xs text-muted-foreground">{train.duration}</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-accent"/>
                      <div>
                        <p className="font-semibold">₹{train.price}</p>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
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
