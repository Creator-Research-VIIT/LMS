'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import AwardCard from './AwardCard'
import AwardPreviewModal from './AwardPreviewModal'

interface Award {
  id: string
  name: string
  description: string
  icon: string
  milestone: number
  color: string
}

export default function AwardPreviewSection() {
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/awards/list')
        if (response.ok) {
          const data = await response.json()
          setAwards(data.awards || [])
        } else {
          console.error('Failed to fetch awards')
        }
      } catch (error) {
        console.error('Error fetching awards:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAwards()
  }, [])

  const handlePreview = (award: Award) => {
    setSelectedAward(award)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading awards...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Award Animations Preview</h2>
          <p className="text-sm text-gray-600 mt-1">
            Preview the celebration animations students will see when they earn each award
          </p>
        </div>

        {/* Awards Grid */}
        {awards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {awards.map((award) => (
              <AwardCard
                key={award.id}
                award={award}
                onPreview={() => handlePreview(award)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <p className="text-gray-600">No awards found in the system</p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showModal && selectedAward && (
        <AwardPreviewModal
          award={selectedAward}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setSelectedAward(null)
          }}
        />
      )}
    </>
  )
}
