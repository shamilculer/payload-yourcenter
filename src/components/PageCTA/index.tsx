import { PhoneCall, Send } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PageCTAProps {
    ctaData?: {
        subheading?: string
        heading?: string
        description?: string
    }
}

const PageCTA: React.FC<PageCTAProps> = ({ ctaData }) => {
    return (
        <section className="w-full py-10 min-h-[420px] relative flex-center">
            <Image
                height={300}
                width={1400}
                alt="About yourcenter"
                src={"/hero-banner-2.webp"}
                className="w-full h-full object-cover absolute top-0 left-0"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-50% from-accent to-black/50 md:to-transparent"></div>

            <div className="container z-10 flex items-center">
                <div className="sm:w-1/2">
                    <div>
                        <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-primary/20">
                            {!ctaData ? "Make A Visit" : ctaData.subheading}
                        </span>
                        <h2 className="mt-4 !text-white">
                            {!ctaData ? "Your health deserves accuracy and care." : ctaData.heading}
                        </h2>
                        <p className="text-white mt-4 sm:w-4/5">
                            {!ctaData
                                ? "Visit our branches in Calicut, Tirur, or Vadakara, or book your appointment online today for an effortless diagnostic experience."
                                : ctaData.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                        <Button asChild>
                            <Link href={"tel:+919061060000"}>
                                <PhoneCall />
                                Give us a Call
                            </Link>
                        </Button>

                        <Button asChild>
                            <Link href={"https://wa.me/919061060000?text=Hello%20Your%20Center"}>
                                <Send />
                                Leave Us A Message
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageCTA
