'use client'

import { useState } from 'react'
import { Award, FileText } from 'lucide-react'
import CertificatesSection from './CertificatesSection'
import AwardPreviewSection from './AwardPreviewSection'

export default function CertificatesTabs() {
  const [activeTab, setActiveTab] = useState<'certificates' | 'awards'>('certificates')

  const tabs = [
    { id: 'certificates', label: 'Certificates', icon: FileText },
    { id: 'awards', label: 'Awards Preview', icon: Award },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'certificates' | 'awards')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 -mb-px ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'certificates' && <CertificatesSection />}
        {activeTab === 'awards' && <AwardPreviewSection />}
      </div>
    </div>
  )
}
