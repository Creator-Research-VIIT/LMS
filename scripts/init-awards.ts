/**
 * Awards System - Initialization Guide
 *
 * To initialize awards in your database, run this command once:
 *
 * npx ts-node -O '{"module":"commonjs"}' scripts/init-awards.ts
 *
 * Or add to your app/layout.tsx in a useEffect:
 *
 * useEffect(() => {
 *   const initAwards = async () => {
 *     const res = await fetch('/api/awards/init', { method: 'POST' })
 *     if (res.ok) console.log('Awards initialized')
 *   }
 *   initAwards()
 * }, [])
 */

import { initializeAwards } from '@/lib/awards'

async function main() {
  try {
    console.log('🎯 Initializing awards...')
    await initializeAwards()
    console.log('✅ Awards initialized successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error initializing awards:', error)
    process.exit(1)
  }
}

main()
