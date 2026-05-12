'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { FractionalOwnershipSlider } from '@/components/fractional-ownership-slider'
import { ChevronLeft, MapPin, Box, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { properties } from '@/lib/properties-data'
import type { Property } from '@/lib/properties-data'
import { ModelViewer } from '@/components/model-viewer'
import { API_BASE } from '@/lib/api-base'
import { mongoListingToProperty } from '@/lib/mongo-listing'

interface PropertyDetailProps {
  id: string
}

function resolveModelUrl(property: Property): string {
  if (property.modelUrl && property.modelUrl.trim() !== '') {
    const u = property.modelUrl.trim()
    return u.startsWith('http') || u.startsWith('/') ? u : `/${u}`
  }
  return '/penthouse.glb'
}

const MONGO_ID_RE = /^[a-f\d]{24}$/i

export function PropertyDetail({ id }: PropertyDetailProps) {
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      if (MONGO_ID_RE.test(id)) {
        try {
          const res = await fetch(`${API_BASE}/api/v1/property-listings/${id}`)
          const data = await res.json()
          if (cancelled) return
          if (!res.ok || !data.listing) {
            setProperty(null)
          } else {
            setProperty(mongoListingToProperty(data.listing))
          }
        } catch {
          if (!cancelled) setProperty(null)
        }
      } else {
        const propertyId = parseInt(id, 10)
        const found = properties.find((p) => p.id === propertyId) ?? null
        if (!cancelled) setProperty(found)
      }
      if (!cancelled) setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 pt-32 flex items-center justify-center">
        <p className="text-sm font-medium text-zinc-400 tracking-wide">Loading asset…</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 p-8 pt-32 flex items-center justify-center">
        <h1 className="text-2xl font-medium text-white tracking-tight">Property not found</h1>
      </div>
    )
  }

  const aboutCopy =
    property.description?.trim() ||
    'This premium asset represents a unique opportunity to own a fraction of high-yield real estate. Tokenized on the blockchain, it offers instant liquidity, transparent ownership records, and automated yield distribution via smart contracts.'

  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-24 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-zinc-400 hover:text-white mb-10 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Portfolio
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 group">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

              {property.model3d && (
                <button
                  type="button"
                  onClick={() => setShow3D(true)}
                  className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  <Box className="w-4 h-4" />
                  Experience 3D Tour
                </button>
              )}

              <div className="absolute bottom-6 left-6 z-20">
                <div className="bg-white/10 border border-white/20 rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm text-white backdrop-blur-md">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
              <h1 className="text-4xl font-medium text-white mb-6 tracking-tight">{property.title}</h1>

              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-medium">Premium Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, idx) => (
                      <span key={idx} className="text-sm text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                <h3 className="text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-medium">About this Asset</h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed">{aboutCopy}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-medium">Total Asset Value</h3>
                  <p className="text-3xl font-medium text-white tracking-tight">${property.price.toLocaleString()}</p>
                </div>
                <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-medium">Estimated APY</h3>
                  <p className="text-3xl font-medium text-white tracking-tight">{property.roi}%</p>
                </div>
              </div>

              <FractionalOwnershipSlider
                tokenPrice={100}
                totalTokens={Math.max(1, property.price / 100)}
                cryptoSymbol="ETH"
                cryptoPrice={3500}
              />

              <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-2xl h-14 text-lg font-medium transition-colors mt-2">
                Invest Now
              </Button>

              <p className="text-center text-xs text-zinc-500 mt-2">
                Smart contract audited. Capital at risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {show3D && property.model3d && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-in fade-in duration-500">
          <button
            type="button"
            onClick={() => setShow3D(false)}
            className="absolute top-8 right-8 z-50 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-105"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-8 left-8 z-50 pointer-events-none max-w-[min(90vw,28rem)]">
            <h2 className="text-2xl font-medium text-white tracking-tight">{property.title}</h2>
            <p className="text-zinc-400 flex items-center gap-2 mt-1 text-sm">
              <MapPin className="w-4 h-4 shrink-0" /> {property.location}
            </p>
          </div>

          <div className="w-full h-full">
            <ModelViewer url={resolveModelUrl(property)} />
          </div>
        </div>
      )}
    </div>
  )
}
