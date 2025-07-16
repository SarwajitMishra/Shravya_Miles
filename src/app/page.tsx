"use client";

import { Bus, Car, Plane, Sparkles, TrainTrack } from "lucide-react";

import { AiOptimizer } from "@/components/ai-optimizer";
import { BusFinder } from "@/components/bus-finder";
import { CabFinder } from "@/components/cab-finder";
import { FlightFinder } from "@/components/flight-finder";
import { RaahiLogo } from "@/components/raahi-logo";
import { TrainFinder } from "@/components/train-finder";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <RaahiLogo />
        <h1 className="text-xl font-semibold md:text-2xl">
          <span className="font-bold text-primary">Raahi</span>
          <span className="font-light"> AI</span>
        </h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="optimizer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="optimizer" className="flex-col sm:flex-row gap-2 py-2">
              <Sparkles className="h-5 w-5" />
              <span className="hidden sm:inline">AI </span>Optimizer
            </TabsTrigger>
            <TabsTrigger value="trains" className="flex-col sm:flex-row gap-2 py-2">
              <TrainTrack className="h-5 w-5" />
              Trains
            </TabsTrigger>
            <TabsTrigger value="flights" className="flex-col sm:flex-row gap-2 py-2">
              <Plane className="h-5 w-5" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="buses" className="flex-col sm:flex-row gap-2 py-2">
              <Bus className="h-5 w-5" />
              Buses
            </TabsTrigger>
            <TabsTrigger value="cabs" className="flex-col sm:flex-row gap-2 py-2">
              <Car className="h-5 w-5" />
              Cabs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="optimizer" className="mt-6">
            <AiOptimizer />
          </TabsContent>
          <TabsContent value="trains" className="mt-6">
            <TrainFinder />
          </TabsContent>
          <TabsContent value="flights" className="mt-6">
            <FlightFinder />
          </TabsContent>
          <TabsContent value="buses" className="mt-6">
            <BusFinder />
          </TabsContent>
          <TabsContent value="cabs" className="mt-6">
            <CabFinder />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        <p>Powered by Raahi AI</p>
      </footer>
    </div>
  );
}
