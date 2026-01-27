import Image from "next/image"
import Link from "next/link"

interface PageTitleProps {
    image?: string
    title: string
    segments?: string[]
}

const PageTitle: React.FC<PageTitleProps> = ({ image, title, segments = [] }) => {
    return (
        <section className="w-full min-h-60 sm:min-h-[24rem] relative flex items-center justify-center">
            <Image
                height={380}
                width={1400}
                alt={`${title} banner`}
                src={image || "/hero-banner-5.webp"}
                className="w-full h-full object-cover absolute top-0 left-0"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-accent to-transparent"></div>

            <div className="w-full z-10 flex flex-col items-center gap-2 px-4">
                <h1 className="max-sm:!text-[45px] w-full max-w-4xl !text-white text-center capitalize">
                    {title}
                </h1>

                {/* Breadcrumb */}
                <nav className="font-medium text-gray-200 text-sm sm:text-base">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-primary max-sm:text-xs">
                                Home
                            </Link>
                        </li>
                        {segments.map((seg, index) => {
                            const href = "/" + segments.slice(0, index + 1).join("/")
                            const isLast = index === segments.length - 1

                            return (
                                <li key={index} className="flex items-center gap-2 max-sm:text-xs">
                                    <span>&gt;</span>
                                    {isLast ? (
                                        <span className="text-primary capitalize">{seg}</span>
                                    ) : (
                                        <Link
                                            href={href}
                                            className="hover:text-primary capitalize max-sm:text-xs"
                                        >
                                            {seg}
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ol>
                </nav>
            </div>
        </section>
    )
}

export default PageTitle
