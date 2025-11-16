'use client'

import React from 'react'
import { Download } from 'lucide-react'

export default function CertificatePreview() {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Premium Certificate of Achievement</h3>
          <p className="text-gray-600 text-sm mt-1">Professional luxury template with HD quality output</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Download className="h-4 w-4" />
          Download Sample
        </button>
      </div>

      {/* Single Premium Certificate Preview */}
      <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
        {/* Certificate Container */}
        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
          <div
            className="w-full h-full relative"
            style={{
              backgroundColor: 'rgb(252, 250, 245)',
              backgroundImage: `
                linear-gradient(135deg, transparent 48%, rgba(212, 175, 55, 0.02) 49%, rgba(212, 175, 55, 0.02) 51%, transparent 52%),
                linear-gradient(45deg, transparent 48%, rgba(212, 175, 55, 0.02) 49%, rgba(212, 175, 55, 0.02) 51%, transparent 52%)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px',
              boxShadow: `
                inset 0 0 0 2px rgb(212, 175, 55),
                inset 0 0 0 4px rgb(252, 250, 245),
                inset 0 0 0 6px rgb(184, 134, 11),
                0 25px 50px rgba(0, 0, 0, 0.15)
              `
            }}
          >
            {/* Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
              <span className="text-9xl font-black text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
                SkillUP!!
              </span>
            </div>

            {/* Main Content */}
            <div className="relative h-full flex flex-col justify-between p-12 text-center">
              {/* Top Seal Section */}
              <div className="flex justify-center mb-2">
                <div
                  className="w-16 h-16 rounded-full border-2 border-amber-600 flex items-center justify-center relative"
                  style={{
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3), inset 0 2px 4px rgba(212, 175, 55, 0.2)'
                  }}
                >
                  <span className="text-3xl">⭐</span>
                </div>
              </div>

              {/* Header Text */}
              <div className="space-y-3">
                <h1
                  className="text-6xl font-black tracking-wider text-blue-950"
                  style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}
                >
                  CERTIFICATE
                </h1>
                <div className="flex justify-center gap-8">
                  <div className="h-0.5 w-20 bg-gradient-to-r from-transparent to-amber-600"></div>
                  <div className="text-2xl text-amber-600">✦</div>
                  <div className="h-0.5 w-20 bg-gradient-to-l from-transparent to-amber-600"></div>
                </div>
                <p className="text-xl text-amber-700 font-light" style={{ fontFamily: 'Georgia, serif' }}>
                  of Achievement
                </p>
              </div>

              {/* Certificate Body */}
              <div className="space-y-4 my-2">
                <p className="text-sm tracking-wide text-gray-700">is presented to</p>

                <div className="space-y-2">
                  <p
                    className="text-4xl font-black text-blue-950"
                    style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}
                  >
                    John Alexander Doe
                  </p>
                  <div className="flex justify-center">
                    <div className="h-1 w-56 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600"></div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <p className="text-xs tracking-widest text-gray-600 uppercase">for successfully demonstrating excellence in</p>
                  <p className="text-lg font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Advanced Web Development with React & Next.js
                  </p>
                </div>

                <p className="text-xs text-gray-600 pt-2">Awarded on {today}</p>
              </div>

              {/* Bottom Signature Section */}
              <div className="flex justify-between items-end pt-6 border-t border-gray-300">
                <div className="text-left">
                  <div className="h-12 w-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded mb-1"></div>
                  <p className="text-xs font-bold text-gray-700">Director Signature</p>
                </div>

                <div className="text-center flex-1">
                  <p className="text-xs text-gray-600 mb-1">Course Instructor</p>
                  <p className="text-sm font-bold text-blue-900">Prof. Sarah Anderson</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Certificate ID</p>
                  <p className="text-sm font-mono font-bold text-amber-600">SKU-2025-001</p>
                </div>
              </div>

              {/* Corner Flourishes */}
              {[
                'top-3 left-3',
                'top-3 right-3',
                'bottom-3 left-3',
                'bottom-3 right-3'
              ].map((pos) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-5 h-5 border-2 border-amber-600`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 2px, 2px 2px, 2px 100%, 0 100%)'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-4">Design Elements</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ Luxury cream background with geometric pattern</li>
            <li>✓ Premium triple-line gold borders</li>
            <li>✓ Central embossed star seal</li>
            <li>✓ Royal blue serif typography (Georgia font)</li>
            <li>✓ Gradient accent lines and flourishes</li>
            <li>✓ Corner decorative elements</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
          <h4 className="font-bold text-amber-900 mb-4">Technical Specifications</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>✓ HD Quality (300+ DPI)</li>
            <li>✓ A4 Landscape Format</li>
            <li>✓ PDF Download with custom filename</li>
            <li>✓ Recipient name & course auto-populated</li>
            <li>✓ Completion date & instructor details</li>
            <li>✓ Unique Certificate ID generated</li>
          </ul>
        </div>
      </div>

      {/* Premium Features Highlight */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg shadow-lg">
        <h4 className="text-xl font-bold mb-4">🏆 Premium Certificate Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <span className="text-2xl">👑</span>
            <div>
              <p className="font-semibold">Luxury Design</p>
              <p className="text-sm text-blue-100">Professional & elegant aesthetic</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-semibold">Embossed Effect</p>
              <p className="text-sm text-blue-100">Premium shadow & depth styling</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-semibold">Gold & Blue Theme</p>
              <p className="text-sm text-blue-100">Royal color palette</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

