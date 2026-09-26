export interface Job {
  id: string
  title: string
  department: string
  location: string
  arrangement: 'On-site' | 'Remote' | 'Hybrid'
  type: 'Full-time' | 'Part-time' | 'Contract'
  description: string
  requirements: string[]
  /** ISO date (e.g. '2026-01-15'). Set this when adding a real vacancy — it's required for JobPosting structured data, and is never fabricated. */
  datePosted?: string
}

/**
 * No fictional openings. Add real, published vacancies here.
 * The Careers page shows an elegant empty state when this list is empty.
 */
export const jobs: Job[] = []
