'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, ChevronRight, Coins, Home, LineChart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroCarousel } from '@/components/hero-carousel'
import { properties } from '@/lib/properties-data'

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative bg-black min-h-[85vh] overflow-hidden">
        <HeroCarousel />

        <div className="absolute inset-0 z-[5] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_55%_70%_at_50%_45%,#000_25%,transparent_100%)]" />

        <div className="relative z-20 min-h-[85vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
              <div className="flex justify-center lg:justify-start mb-10">
                <Image
                  src="/brand-mark.svg"
                  alt="RealEstate"
                  width={88}
                  height={88}
                  className="rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                  priority
                />
              </div>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500 mb-4">
                Tokenized real estate
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
                Own the skyline.
                <span className="block text-zinc-400 font-light mt-1 sm:mt-2">Not the paperwork.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl font-light leading-relaxed sm:mx-auto lg:mx-0">
                Fractional investing in institutional-grade properties—on-chain transparency, clear yield, and a portfolio that actually scales.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-start">
                <Link href="/properties">
                  <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-black hover:bg-zinc-200 h-12 px-8 font-medium">
                    View properties
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 h-12 px-8"
                  >
                    How it works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-zinc-950/80 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
            Featured properties
          </h2>
          <p className="mt-2 text-zinc-500 text-sm font-light max-w-lg">
            Curated opportunities—updated as new listings go live.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden bg-black border-white/10 rounded-2xl">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover opacity-90"
                />
                <CardContent className="p-5">
                  <h3 className="text-lg font-medium text-white tracking-tight">{property.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{property.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-white font-medium">${property.price.toLocaleString()}</span>
                    <span className="text-zinc-400 text-sm">APY {property.roi}%</span>
                  </div>
                  <Link href={`/property/${property.id}`}>
                    <Button className="w-full mt-4 rounded-xl bg-white text-black hover:bg-zinc-200">
                      View details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white text-center">
            How it works
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Home, title: "Choose a property", description: "Browse vetted assets and compare yield, geography, and terms." },
              { icon: Coins, title: "Invest on your terms", description: "Start with fractional tickets and add over time as conviction grows." },
              { icon: LineChart, title: "Track performance", description: "Clear reporting on value, distributions, and ownership—no black boxes." },
              { icon: Building2, title: "Build a portfolio", description: "Diversify across markets and property types from one place." },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 text-white mx-auto">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-medium text-white tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 font-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div>
              <h3 className="text-[10px] font-medium text-zinc-500 tracking-widest uppercase">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-medium text-zinc-500 tracking-widest uppercase">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Whitepaper</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-medium text-zinc-500 tracking-widest uppercase">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-medium text-zinc-500 tracking-widest uppercase">Connect</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/brand-mark.svg" alt="" width={32} height={32} className="rounded-lg opacity-80" />
              <span className="text-sm text-zinc-500">RealEstate</span>
            </div>
            <p className="text-xs text-zinc-600 text-center sm:text-right">
              © 2026 RealEstate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
