"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
    name: "Mariana Torres",
    avatar: "MT",
    title: "Chief Risk Officer",
    description: "Pivot. has transformed our approach to managing the risks of natural disasters. Its real-time analytics and intuitive interface allow us to quickly assess and act on potential impacts to our operations."
    },
    
    {
    name: "Ethan Wright",
    avatar: "EW",
    title: "Stock Trader",
    description: "As a stock trader, Pivot. has been invaluable for adjusting my portfolio in response to natural disasters. The platform provides instant, analyst-level insights into market changes, helping me make informed decisions fast."
    },
    
    {
    name: "Sophia Cheng",
    avatar: "SC",
    title: "Operations Director",
    description: "Pivot. enables our team to proactively manage operational risks from natural disasters. Its detailed, real-time analysis ensures we maintain continuity and resilience in the face of adversity."
    },
    
    {
    name: "Liam Johnson",
    avatar: "LJ",
    title: "Environmental Compliance Officer",
    description: "Pivot. is crucial for our environmental risk management, especially during natural disasters. It offers quick, comprehensive insights, aiding in our compliance and sustainability efforts."
    }
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}