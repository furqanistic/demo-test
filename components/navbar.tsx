'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SignInModal } from './auth/sign-in-modal'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-2xl border-b border-white/[0.05] supports-[backdrop-filter]:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-700 ease-in-out">
              <div className="w-2 h-2 bg-black rounded-sm -rotate-45 group-hover:-rotate-90 transition-transform duration-700 ease-in-out" />
            </div>
            <span className="text-white font-medium tracking-tight text-lg">RealEstate</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/properties" 
              className={`text-sm transition-colors ${isActive('/properties') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
            >
              Properties
            </Link>
            <Link 
              href="/list-property" 
              className={`text-sm transition-colors ${isActive('/list-property') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
            >
              List property
            </Link>
            <Link 
              href="/how-it-works" 
              className={`text-sm transition-colors ${isActive('/how-it-works') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
            >
              How it Works
            </Link>
            <Link 
              href="/about" 
              className={`text-sm transition-colors ${isActive('/about') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/list-property">
              <Button
                variant="outline"
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white h-9 px-5 text-sm"
              >
                Post
              </Button>
            </Link>
            <Button 
              className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 h-9 text-sm font-medium transition-colors"
              onClick={() => setIsSignInOpen(true)}
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-400 hover:text-white p-2 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/[0.05]">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link 
              href="/properties" 
              className={`block text-sm transition-colors ${isActive('/properties') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              href="/list-property" 
              className={`block text-sm transition-colors ${isActive('/list-property') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              List property
            </Link>
            <Link 
              href="/how-it-works" 
              className={`block text-sm transition-colors ${isActive('/how-it-works') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="/about" 
              className={`block text-sm transition-colors ${isActive('/about') ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button 
              className="w-full bg-white text-black hover:bg-zinc-200 rounded-full h-10 text-sm font-medium transition-colors mt-4"
              onClick={() => {
                setIsSignInOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </nav>
  )
} 