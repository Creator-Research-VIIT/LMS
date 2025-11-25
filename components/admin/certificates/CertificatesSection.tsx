'use client'

import CertificatePreview from './CertificatePreview'

export default function CertificatesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate Management</h3>
        <p className="text-gray-600">View and manage premium certificate templates</p>
      </div>
      <CertificatePreview />
    </div>
  )
}
