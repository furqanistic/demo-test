'use client'

import React, { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"

interface FractionalOwnershipSliderProps {
  tokenPrice: number
  totalTokens: number
  cryptoSymbol: string
  cryptoPrice: number
}

export function FractionalOwnershipSlider({
  tokenPrice,
  totalTokens,
  cryptoSymbol,
  cryptoPrice
}: FractionalOwnershipSliderProps) {
  const [tokens, setTokens] = useState(1)
  const [usdValue, setUsdValue] = useState(tokenPrice)
  const [cryptoValue, setCryptoValue] = useState(tokenPrice / cryptoPrice)
  const [ownershipPercentage, setOwnershipPercentage] = useState((1 / totalTokens) * 100)

  useEffect(() => {
    setUsdValue(tokens * tokenPrice)
    setCryptoValue((tokens * tokenPrice) / cryptoPrice)
    setOwnershipPercentage((tokens / totalTokens) * 100)
  }, [tokens, tokenPrice, totalTokens, cryptoPrice])

  return (
    <div className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-8">
      <h3 className="text-xl font-medium text-white mb-8 tracking-tight">Investment Calculator</h3>
      
      <div className="mb-10">
        <Slider
          min={1}
          max={totalTokens}
          step={1}
          value={[tokens]}
          onValueChange={(value) => setTokens(value[0])}
          className="mb-2"
        />
        <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest font-medium text-zinc-500">
          <span>1 Token</span>
          <span>{totalTokens.toLocaleString()} Tokens (Max)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
        <div>
          <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-medium">Tokens Selected</p>
          <p className="text-2xl font-medium text-white">{tokens.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-medium">USD Value</p>
          <p className="text-2xl font-medium text-white">${usdValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-medium">{cryptoSymbol} Equivalent</p>
          <p className="text-xl font-medium text-zinc-300">{cryptoValue.toFixed(4)} {cryptoSymbol}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-medium">Ownership Share</p>
          <p className="text-xl font-medium text-white">{ownershipPercentage.toFixed(4)}%</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Progress to full ownership</span>
        </div>
        <div className="bg-zinc-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${Math.max(ownershipPercentage, 1)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
} 