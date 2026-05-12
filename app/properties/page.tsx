'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { properties } from '@/lib/properties-data'
import type { Property } from '@/lib/properties-data'
import { mongoListingToProperty } from '@/lib/mongo-listing'
import { API_BASE } from '@/lib/api-base'
import { Box, MapPin, ArrowRight } from 'lucide-react'

export default function PropertiesPage() {
  const [posted, setPosted] = useState<Property[]>([])

  useEffect(() => {
    let cancelled = false
    fetch(`${API_BASE}/api/v1/property-listings`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        const raw = data?.listings
        if (!Array.isArray(raw)) {
          setPosted([])
          return
        }
        setPosted(raw.map((item: Record<string, unknown>) => mongoListingToProperty(item)))
      })
      .catch(() => {
        if (!cancelled) setPosted([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const allProperties = useMemo(() => [...posted, ...properties], [posted])

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black pt-24 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 mt-12">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <span className="mr-2 flex h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
            Live Portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-6">
            Invest in tomorrow.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light tracking-wide mb-8">
            Fractional ownership of world-class properties. Tokenized on the blockchain for instant liquidity and transparent yields.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/list-property">
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-11 text-sm font-medium">
                List a property
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProperties.map((property) => (
            <div
              key={String(property.id)}
              className="group relative rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-white/[0.02] flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {property.model3d && (
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium">
                    <Box className="w-3 h-3" />
                    3D Tour
                  </div>
                )}
              </div>

              <div className="p-6 relative z-20 -mt-12 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 text-xs text-zinc-300 backdrop-blur-md">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-2 tracking-tight">{property.title}</h3>

                {property.features && (
                  <div className="flex flex-wrap gap-2 mt-2 mb-6">
                    {property.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs text-zinc-400 bg-zinc-900/80 px-2 py-1 rounded-md border border-white/5">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-medium">Property Value</p>
                      <span className="text-xl font-medium text-white flex items-center">${property.price.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-medium">Est. APY</p>
                      <span className="text-lg font-medium text-white flex items-center justify-end gap-1">{property.roi}%</span>
                    </div>
                  </div>

                  <Link href={`/property/${property.id}`} className="block">
                    <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl h-12 font-medium transition-colors group/btn">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
