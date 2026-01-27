import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CircleCheckBig, PhoneCall, Send, MapPin, Mail } from 'lucide-react'
import PageCTA from '@/components/PageCTA'

// Fetch branch data by slug
const queryBranchBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'branches',
        draft,
        limit: 1,
        overrideAccess: draft,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})

// Fetch services for a specific branch
const queryServicesByBranch = cache(async ({ branchId }: { branchId: string | number }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'services',
        draft,
        limit: 100,
        overrideAccess: draft,
        where: {
            branch: {
                equals: branchId,
            },
        },
        sort: 'createdAt',
    })

    return result.docs || []
})

// Helper function to extract main phone number
const getMainPhoneNumber = (phoneArray: { number?: string | null }[] | undefined): string => {
    if (!phoneArray) return '9061060000'
    const primaryPhone = phoneArray.find(
        (item) =>
            item.number &&
            (item.number.includes('+91') || item.number.replace(/\D/g, '').length === 10),
    )

    return primaryPhone?.number
        ? primaryPhone.number.replace(/\D/g, '').slice(-10)
        : '9061060000'
}

export default async function BranchPageContent({ slug }: { slug: string }) {
    const { isEnabled: draft } = await draftMode()
    const url = `/${slug}`
    const branch = await queryBranchBySlug({ slug })

    if (!branch) {
        return <div>Branch Not Found</div>
    }

    // Fetch services for this branch
    const services = await queryServicesByBranch({ branchId: branch.id })

    // Extract contact details
    const phone = branch.contact?.phone || []
    const address = branch.contact?.address || ''
    const email = branch.contact?.email || ''
    const mainPhone = getMainPhoneNumber(phone)

    // Get image URLs
    const heroImageUrl =
        typeof branch.image === 'object' && branch.image && 'url' in branch.image
            ? branch.image.url
            : '/hero-banner-5.webp'

    const introImageUrl =
        typeof branch.intro?.image === 'object' && branch.intro.image && 'url' in branch.intro.image
            ? branch.intro.image.url
            : '/hero-banner-5.webp'

    const whyChooseUsImageUrl =
        typeof branch.whyChooseUs?.image === 'object' &&
            branch.whyChooseUs.image &&
            'url' in branch.whyChooseUs.image
            ? branch.whyChooseUs.image.url
            : '/hero-banner-5.webp'

    // Helper to safely render text that might be returning as Rich Text object
    const safeRender = (content: any) => {
        if (typeof content === 'string') return content
        if (typeof content === 'number') return content

        // Recursive function to extract text from Lexical nodes
        const extractText = (node: any): string => {
            if (!node) return ''
            if (typeof node === 'string') return node
            if (node.text) return node.text
            if (node.children && Array.isArray(node.children)) {
                return node.children.map((child: any) => extractText(child)).join('')
            }
            return ''
        }

        // Check for Lexical rich text
        if (content && typeof content === 'object' && 'root' in content) {
            return extractText(content.root)
        }

        return ''
    }

    const ctaContentSafe = branch.ctaContent
        ? {
            ...branch.ctaContent,
            heading: safeRender(branch.ctaContent.heading),
            subheading: safeRender(branch.ctaContent.subheading),
            description: safeRender(branch.ctaContent.description),
        }
        : undefined

    return (
        <main>
            <PayloadRedirects disableNotFound url={url} />
            {draft && <LivePreviewListener />}

            {/* HERO SECTION */}
            <section className="section-spacing-b">
                <div className="w-full py-10 min-h-[550px] md:min-h-[650px] relative flex-center">
                    <Image
                        height={650}
                        width={1400}
                        alt={`${branch.name} banner`}
                        src={heroImageUrl || '/hero-banner-5.webp'}
                        className="w-full h-full object-cover object-left absolute top-0 left-0"
                    />

                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-30% from-accent/95 to-black/50 md:to-transparent"></div>

                    <div className="container z-10 flex items-center">
                        <div className="xl:w-2/3">
                            <div>
                                <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-primary/20">
                                    {branch.name}
                                </span>
                                <h1 className="mt-4 !text-white max-sm:!text-[40px]">{safeRender(branch.heading)}</h1>
                                <p className="text-white mt-4 sm:w-4/5">{safeRender(branch.overview)}</p>
                            </div>

                            <div className="flex items-center gap-3 mt-6">
                                <Button asChild>
                                    <Link href={`tel:+91${mainPhone}`}>
                                        <PhoneCall />
                                        Give us a Call
                                    </Link>
                                </Button>

                                <Button asChild>
                                    <Link
                                        href={`https://wa.me/91${mainPhone}?text=Hello%20Your%20Center%20${encodeURIComponent(branch.name)}`}
                                    >
                                        <Send />
                                        Leave Us A Message
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="section-spacing-b">
                <div className="container flex max-lg:flex-col gap-16 md:gap-20">
                    <div className="w-full lg:w-1/2 relative min-h-96 md:min-h-[600px]">
                        <Image
                            fill
                            src={introImageUrl || '/hero-banner-5.webp'}
                            alt={`${branch.name} intro`}
                            className="object-cover rounded-2xl rounded-br-[30%] rounded-tl-[30%] z-10"
                        />

                        <div className="w-full h-full bg-secondary absolute -bottom-5 -left-5 md:-bottom-10 md:-left-10 rounded-4xl rounded-br-[30%] rounded-tl-[30%]"></div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5">
                        <div className="w-full">
                            <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm">
                                {safeRender(branch.intro?.subheading)}
                            </span>
                            <h2 className="mt-4">{safeRender(branch.intro?.heading)}</h2>
                        </div>

                        <div className="space-y-5">
                            <p>{safeRender(branch.intro?.description)}</p>
                        </div>

                        <div className="flex items-center gap-4 mt-5">
                            <Button asChild>
                                <Link href="/about" className="text-white">
                                    Know More About Us
                                </Link>
                            </Button>

                            <Button asChild className="bg-accent">
                                <Link href="/contact" className="text-white">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="pb-14">
                <div className="container space-y-7 sm:space-y-12">
                    {/* Section Header */}
                    <div className="w-full flex items-end gap-20 justify-center">
                        <div className="flex-center flex-col text-center w-full lg:w-2/3">
                            <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm">
                                Advanced Diagnostics
                            </span>
                            <h2 className="mt-4">{safeRender(branch.serviceHeading)}</h2>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div
                        className={`w-full gap-y-14 gap-x-12 max-sm:px-3 ${services.length < 3
                            ? 'flex justify-center'
                            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}
                    >
                        {services.map((service) => {
                            const serviceImageUrl =
                                typeof service.overview?.featuredImage === 'object' &&
                                    service.overview.featuredImage &&
                                    'url' in service.overview.featuredImage
                                    ? service.overview.featuredImage.url
                                    : '/radiography.webp'

                            return (
                                <article
                                    key={service.id}
                                    className={`group bg-accent min-h-96 rounded-4xl max-sm:py-5 max-sm:px-4 sm:p-5 space-y-5 sm:space-y-3 transition-all delay-200 shadow-xl ${services.length < 3 ? 'max-w-96' : ''
                                        }`}
                                >
                                    {/* Image Container */}
                                    <div className="w-full h-68 relative">
                                        <Image
                                            src={serviceImageUrl || '/radiography.webp'}
                                            fill
                                            className="object-cover rounded-3xl"
                                            alt={service.title}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    {/* Content Block */}
                                    <div className="mt-6 space-y-3 px-1">
                                        <h3 className="!text-white">{service.title}</h3>
                                        <p className="text-gray-200">
                                            {/* Extract text from Lexical rich text */}
                                            Learn more about this service
                                        </p>
                                        <Button
                                            asChild
                                            className="bg-primary hover:bg-secondary transition-colors duration-300"
                                        >
                                            <Link
                                                href={`/${slug}/services/${service.slug}`}
                                                className="flex items-center gap-2"
                                            >
                                                Know More
                                            </Link>
                                        </Button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="section-spacing-b relative">
                <Image
                    src="/pattern-3.png"
                    width={300}
                    height={40}
                    alt="pattern"
                    className="absolute bottom-0 left-0 opacity-15"
                />

                <div className="w-full flex items-center max-lg:flex-col gap-10 sm:gap-18 z-10 relative">
                    <div className="w-full xl:w-1/2 px-4 sm:p-12 sm:pl-16 space-y-5">
                        <div>
                            <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20">
                                {safeRender(branch.whyChooseUs?.subheading)}
                            </span>
                            <h2 className="mt-4">{safeRender(branch.whyChooseUs?.heading)}</h2>
                        </div>

                        <p className="mb-10">{safeRender(branch.whyChooseUs?.intro)}</p>

                        <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
                            {branch.whyChooseUs?.features?.map((feature, index) => (
                                <li key={index} className="flex flex-col items-start gap-3">
                                    <div className="p-3 min-h-12 bg-primary/35 shadow flex-center [border-radius:70%_30%_30%_70%_/_60%_40%_60%_40%]">
                                        <CircleCheckBig className="w-7 h-7" fill="#C4C93B" stroke="#735D2B" />
                                    </div>

                                    <div>
                                        <h4 className="!font-semibold uppercase">{safeRender(feature.title)}</h4>
                                        <p className="!text-sm mt-2 leading-6">{safeRender(feature.text)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <Image
                            src={whyChooseUsImageUrl || '/hero-banner-5.webp'}
                            width={700}
                            height={600}
                            alt="Why choose us"
                            className="h-80 sm:h-[800px] w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* CONTACT INFO SECTION */}
            <section className="container -mt-16 sm:-mt-20 z-20 relative mb-16">
                <div className="bg-white p-6 md:p-10 shadow-xl rounded-xl border-t-4 border-primary grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Address Card */}
                    <div className="flex lg:justify-center items-start gap-4">
                        <div className="p-3 rounded-full bg-accent/20 text-accent flex-shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xl mb-2 text-gray-700">Find Our Center</h4>
                            <p className="!text-lg text-accent mt-1">{address}</p>
                            {branch.contact?.mapLink && (
                                <Link
                                    href={branch.contact.mapLink}
                                    target="_blank"
                                    className="text-primary text-sm font-medium hover:underline mt-3 inline-block"
                                >
                                    Get Directions
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="flex lg:justify-center items-start gap-4">
                        <div className="p-3 rounded-full bg-accent/20 text-accent flex-shrink-0">
                            <PhoneCall className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xl mb-2 text-gray-700">Call Us Directly</h4>
                            <div className="flex flex-col space-y-3 mt-3">
                                {phone.map((item, index) => (
                                    <span key={index} className="text-lg text-accent">
                                        {item.number}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="flex lg:justify-center items-start gap-4">
                        <div className="p-3 rounded-full bg-accent/20 text-accent flex-shrink-0">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xl mb-2 text-gray-700">Email Us</h4>
                            <Link
                                href={`mailto:${email}`}
                                className="text-lg text-accent hover:text-primary transition-colors mt-1 inline-block"
                            >
                                {email}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <PageCTA ctaData={ctaContentSafe} />
        </main>
    )
}
