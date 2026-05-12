import type { Property } from '@/lib/properties-data'

export function mongoListingToProperty(listing: Record<string, unknown>): Property {
  const lid = listing._id as { toString?: () => string } | string
  const id = typeof lid === 'object' && lid?.toString ? lid.toString() : String(lid)
  const modelUrl =
    typeof listing.modelUrl === 'string' && listing.modelUrl.trim() !== '' ? listing.modelUrl.trim() : undefined
  return {
    id,
    title: String(listing.title ?? ''),
    location: String(listing.location ?? ''),
    price: Number(listing.price ?? 0),
    roi: Number(listing.roi ?? 0),
    image: String(listing.image ?? ''),
    model3d: Boolean(listing.model3d),
    modelUrl,
    features: Array.isArray(listing.features) ? (listing.features as string[]) : undefined,
    description: typeof listing.description === 'string' ? listing.description : undefined,
  }
}
