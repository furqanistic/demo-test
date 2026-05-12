'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_BASE } from '@/lib/api-base'
import { ChevronLeft } from 'lucide-react'

export default function ListPropertyPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [roi, setRoi] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [features, setFeatures] = useState('')
  const [model3d, setModel3d] = useState(false)
  const [modelUrl, setModelUrl] = useState('/penthouse.glb')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const priceNum = Number(price.replace(/,/g, ''))
    const roiNum = Number(roi)
    if (!title.trim() || !location.trim() || !image.trim()) {
      setError('Title, location, and image URL are required.')
      return
    }
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setError('Enter a valid property value.')
      return
    }
    if (!Number.isFinite(roiNum) || roiNum < 0) {
      setError('Enter a valid expected APY.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/v1/property-listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          location: location.trim(),
          price: priceNum,
          roi: roiNum,
          image: image.trim(),
          description: description.trim(),
          model3d,
          modelUrl: model3d ? modelUrl.trim() || '/penthouse.glb' : '',
          features:
            features
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean) || [],
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(typeof data?.message === 'string' ? data.message : 'Failed to publish listing')
      }
      const id = data?.listing?._id
      if (typeof id === 'string') {
        router.push(`/property/${id}`)
      } else {
        router.push('/properties')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach the server. Is it running on port 4000?')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-24 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/properties"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-10 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to portfolio
        </Link>

        <div className="mb-10">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-3">Publish</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-4">List a property</h1>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Posts are saved to MongoDB and appear on the Properties page immediately. Use a public image URL (for example Unsplash).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-950 border border-white/10 rounded-3xl p-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[10px] uppercase tracking-widest text-zinc-500">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black border-white/10 text-white rounded-xl h-11"
              placeholder="Downtown loft"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-[10px] uppercase tracking-widest text-zinc-500">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-black border-white/10 text-white rounded-xl h-11"
              placeholder="City, region"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[10px] uppercase tracking-widest text-zinc-500">
                Value (USD)
              </Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-black border-white/10 text-white rounded-xl h-11"
                placeholder="850000"
                inputMode="decimal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roi" className="text-[10px] uppercase tracking-widest text-zinc-500">
                Est. APY %
              </Label>
              <Input
                id="roi"
                value={roi}
                onChange={(e) => setRoi(e.target.value)}
                className="bg-black border-white/10 text-white rounded-xl h-11"
                placeholder="8.5"
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-[10px] uppercase tracking-widest text-zinc-500">
              Cover image URL
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-black border-white/10 text-white rounded-xl h-11"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[10px] uppercase tracking-widest text-zinc-500">
              Description (optional)
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
              placeholder="Short pitch for investors."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="text-[10px] uppercase tracking-widest text-zinc-500">
              Features (comma-separated, optional)
            </Label>
            <Input
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="bg-black border-white/10 text-white rounded-xl h-11"
              placeholder="Terrace, Parking, Smart home"
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
            <label className="flex items-center gap-3 text-sm text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={model3d}
                onChange={(e) => setModel3d(e.target.checked)}
                className="rounded border-white/20 bg-black text-white focus:ring-white/20"
              />
              Enable 3D tour (uses .glb path below)
            </label>
            {model3d && (
              <div className="space-y-2">
                <Label htmlFor="modelUrl" className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Model path or URL
                </Label>
                <Input
                  id="modelUrl"
                  value={modelUrl}
                  onChange={(e) => setModelUrl(e.target.value)}
                  className="bg-black border-white/10 text-white rounded-xl h-11"
                  placeholder="/penthouse.glb"
                />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black hover:bg-zinc-200 rounded-2xl h-12 text-sm font-medium"
          >
            {submitting ? 'Publishing…' : 'Publish listing'}
          </Button>
        </form>
      </div>
    </div>
  )
}
