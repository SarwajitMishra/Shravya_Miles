
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  optimizeRouteWithShravyaAI,
  type OptimizeRouteOutput,
} from "@/ai/flows/optimize-route-with-shravya-ai";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  startLocation: z.string().min(2, { message: "Start location is required." }),
  endLocation: z.string().min(2, { message: "End location is required." }),
  departureTime: z.date({ required_error: "Departure date is required." }),
  seatAvailability: z.string().min(1),
  priceRange: z.string().min(1),
  timeToReach: z.string().min(1),
  cancellationDetails: z.string().min(1),
});

export function AiOptimizer() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizeRouteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      seatAvailability: "Any",
      priceRange: "Any",
      timeToReach: "Any",
      cancellationDetails: "Any",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);

    const input = {
      ...values,
      departureTime: format(values.departureTime, "PPP"),
    };

    try {
      const res = await optimizeRouteWithShravyaAI(input);
      setResult(res);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Find Your Perfect Route</CardTitle>
            <CardDescription>
              Provide your travel details and let our AI find the best journey
              for you.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Delhi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="departureTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Departure Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date > new Date("2030-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seatAvailability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Any">Any</SelectItem>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Waitlisted">Include Waitlisted</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2000-4000 INR" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeToReach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time to Reach</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., under 12 hours" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="cancellationDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cancellation</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Any">Any</SelectItem>
                          <SelectItem value="Free Cancellation">Free Cancellation</SelectItem>
                          <SelectItem value="Paid Cancellation">Paid Cancellation</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Optimize with AI
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="flex h-full flex-col">
          {loading && (
             <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-card p-8">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <h3 className="mt-4 text-lg font-semibold">AI is thinking...</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Please wait while we craft the perfect journey for you.</p>
                </div>
            </div>
          )}
          {!loading && !result && (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-card p-8">
                <div className="text-center">
                    <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">AI-Powered Results</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Your optimized routes will appear here.</p>
                </div>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Routes</CardTitle>
                  <CardDescription>
                    Here are the top routes based on your preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-3">
                    {result.suggestedRoutes.map((route, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-lg border bg-background p-4 transition-colors hover:bg-secondary/50"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <p className="pt-1 font-medium text-card-foreground">{route}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI Reasoning</CardTitle>
                  <CardDescription>
                    Our AI's analysis behind these recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border-l-4 border-accent bg-secondary p-4">
                    <p className="italic text-muted-foreground">{result.reasoning}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
