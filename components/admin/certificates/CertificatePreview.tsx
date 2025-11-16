'use client'

import React from 'react'
import { Download, Zap } from 'lucide-react'

export default function CertificatePreview() {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Premium Certificate Template</h3>
          <p className="text-gray-600 text-sm mt-1">HD Quality with luxury design elements</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Zap className="h-4 w-4" />
          Download Sample
        </button>
      </div>

      {/* Certificate Preview */}
      <div className="relative w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 rounded-lg overflow-hidden shadow-2xl">
        {/* Certificate Frame */}
        <div className="aspect-video flex items-center justify-center p-8">
          <div
            className="w-full h-full border-4 border-amber-600 rounded-sm relative"
            style={{
              backgroundColor: 'rgb(252, 250, 245)',
              boxShadow:
                'inset 0 0 0 1px rgb(212, 175, 55), inset 0 0 0 3px rgb(212, 175, 55), 0 20px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-8xl font-bold text-gray-400">SkillUP!!</span>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-12">
              {/* Top Flourish */}
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-12 bg-amber-600"></div>
                  <div className="w-8 h-8 border-2 border-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 text-lg">★</span>
                  </div>
                  <div className="h-0.5 w-12 bg-amber-600"></div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center space-y-2 mb-4">
                <h1 className="text-5xl font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                  CERTIFICATE
                </h1>
                <div className="flex justify-center gap-20 my-2">
                  <div className="h-1 w-16 bg-amber-600"></div>
                  <div className="h-1 w-16 bg-amber-600"></div>
                </div>
                <p className="text-lg text-amber-700 italic" style={{ fontFamily: 'Georgia, serif' }}>
                  of Completion
                </p>
              </div>

              {/* Presentation Text */}
              <div className="text-center space-y-3 mb-2">
                <p className="text-sm text-gray-700">This is proudly presented to</p>
                <p className="text-3xl font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                  John Doe
                </p>
                <div className="flex justify-center gap-16">
                  <div className="h-1.5 w-20 bg-amber-600"></div>
                  <div className="h-1 w-20 bg-amber-700"></div>
                </div>
              </div>

              {/* Achievement Text */}
              <div className="text-center space-y-2 my-4">
                <p className="text-xs text-gray-700">For successfully completing and demonstrating mastery in</p>
                <p className="text-base font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Advanced Web Development with React & Next.js
                </p>
                <p className="text-xs text-gray-600">On this {today}</p>
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-end pt-4 border-t-2 border-gray-200">
                <div className="text-left">
                  <p className="text-xs text-gray-600 mb-1">Course Instructor</p>
                  <p className="text-sm font-bold text-blue-900">Prof. Sarah Anderson</p>
                </div>
                <div className="text-right">
                  <div className="h-0.5 w-32 bg-gray-400 mb-1"></div>
                  <p className="text-xs text-gray-600">Authorized Signature</p>
                </div>
              </div>

              {/* Bottom Flourish */}
              <div className="flex justify-center mt-2">
                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-12 bg-amber-600"></div>
                  <div className="h-0.5 w-12 bg-amber-600"></div>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            {[
              'top-4 left-4',
              'top-4 right-4',
              'bottom-4 left-4',
              'bottom-4 right-4'
            ].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-6 h-6 border-2 border-amber-600`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'HD Quality', icon: '🎨' },
          { label: 'Royal Blue & Gold', icon: '👑' },
          { label: 'Premium Fonts', icon: '✨' },
          { label: 'Luxury Elements', icon: '💎' },
          { label: 'Gold Foil Effect', icon: '🌟' },
          { label: 'Embossed Style', icon: '📜' },
          { label: 'Decorative Seal', icon: '⭐' },
          { label: 'Professional Layout', icon: '🎯' }
        ].map((feature) => (
          <div key={feature.label} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">{feature.icon}</div>
            <p className="text-xs font-medium text-gray-700">{feature.label}</p>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">Certificate Features</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Luxury cream background with subtle watermark</li>
          <li>✓ Premium double-line borders with gold accents</li>
          <li>✓ Central star emblem seal for authenticity</li>
          <li>✓ Royal blue typography with elegant fonts</li>
          <li>✓ Decorative flourishes and corner elements</li>
          <li>✓ Professional layout suitable for official credentials</li>
          <li>✓ High-resolution PDF output (300+ DPI)</li>
          <li>✓ Includes recipient name, course, date, and instructor signature line</li>
        </ul>
      </div>
    </div>
  )
}
