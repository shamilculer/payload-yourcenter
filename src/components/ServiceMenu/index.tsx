"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Service {
    id: string
    title: string
    slug: string
    branch?: {
        id: string
        slug: string
        name: string
    } | string | null
}

interface ServiceMenuProps {
    branch?: string // Optional branch slug for filtering
}

const MenuArrow = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
)

const ServiceMenu: React.FC<ServiceMenuProps> = ({ branch }) => {
    const pathname = usePathname()
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [branchName, setBranchName] = useState<string>('')

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let url = '/api/services?limit=100&where[_status][equals]=published&sort=createdAt'

                // If branch is provided, fetch branch data first to get branch ID
                if (branch) {
                    const branchResponse = await fetch(`/api/branches?limit=1&where[slug][equals]=${branch}`)
                    const branchData = await branchResponse.json()

                    if (branchData.docs && branchData.docs.length > 0) {
                        const branchDoc = branchData.docs[0]
                        setBranchName(branchDoc.name)
                        // Filter services by branch ID
                        url = `/api/services?limit=100&where[_status][equals]=published&where[branch][equals]=${branchDoc.id}&sort=createdAt`
                    }
                } else {
                    // If no branch, fetch only global services (services without a branch)
                    url = '/api/services?limit=100&where[_status][equals]=published&where[branch][exists]=false&sort=createdAt'
                }

                const response = await fetch(url)
                const data = await response.json()
                setServices(data.docs || [])
            } catch (error) {
                console.error('Error fetching services:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchServices()
    }, [branch])

    if (loading) {
        return (
            <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden px-5 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-10 bg-gray-100 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden px-5 py-8">
            <div>
                <h4 className="text-2xl font-extrabold text-gray-800 pb-2 mb-4 border-b-2 border-primary inline-block capitalize">
                    {branch ? `${branchName} Services` : 'Our Services'}
                </h4>
            </div>

            <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100">
                {services.map((service) => {
                    // Construct service href based on whether we're in a branch context
                    const serviceHref = branch
                        ? `/${branch}/services/${service.slug}`
                        : `/services/${service.slug}`
                    const isActive = pathname.includes(`/services/${service.slug}`)

                    return (
                        <Link
                            key={service.id}
                            href={serviceHref}
                            className={`
                group w-full flex justify-between items-center px-3 py-3
                font-medium transition duration-200 ease-in-out cursor-pointer rounded-lg
                ${isActive
                                    ? "bg-accent text-white hover:bg-secondary"
                                    : "text-gray-800 hover:bg-gray-50"
                                }
              `}
                        >
                            <span>{service.title}</span>
                            <span
                                className={`
                  ${isActive
                                        ? "text-white"
                                        : "text-gray-400 group-hover:text-green-500"
                                    }
                  transition-colors duration-200
                `}
                            >
                                <MenuArrow />
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ServiceMenu
