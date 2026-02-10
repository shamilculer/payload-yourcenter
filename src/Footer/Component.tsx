
import Link from "next/link";
import { Mail, PhoneCall } from "lucide-react";
// --- Essential Payload Imports ---
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Media } from '@/payload-types';

import type {
    Footer as FooterType,
    ContactDetail as ContactDetailsType
} from "@/payload-types"

// =================================================================
// 1. MANUAL PAYLOAD TYPE DEFINITIONS
// =================================================================

// Define the structure of a single dynamic navigation link item
interface FooterLinkItem {
    link: {
        type: 'reference' | 'custom';
        reference?: { relationTo: string, value: string, slug: string } | any;
        url?: string | null;
        newTab?: boolean;
        label: string;
    };
}

// **TYPE DEFINITION YOU REQUESTED**
interface FooterNavBlock {
    blockType: 'navBlock';
    title: string;
    navItems: FooterLinkItem[];
    id?: string;
    blockName?: string;
}

// =================================================================
// 2. HELPER FUNCTIONS
// =================================================================

// --- CLOUDINARY MEDIA HELPER FUNCTION ---
const getLocalMediaUrl = (media: Media | string | null | undefined): string => {
    if (typeof media === 'object' && media) {
        // Use Cloudinary URL if available
        if (media.cloudinary?.secure_url) {
            return media.cloudinary.secure_url
        }
        // Fallback to constructing from public_id
        if (media.cloudinary?.public_id) {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
            return `https://res.cloudinary.com/${cloudName}/image/upload/${media.cloudinary.public_id}`
        }
        // Final fallback to local URL
        if ('url' in media && media.url) {
            return media.url;
        }
    }
    return '';
};
// -----------------------------------------------------------

// Helper component to render dynamic links 
const DynamicLink = ({ item }: { item: FooterLinkItem }) => {
    const { link } = item;
    if (!link || !link.label) return null;

    let href = '#';
    if (link.type === 'custom' && link.url) {
        href = link.url;
    } else if (link.type === 'reference' && typeof link.reference === 'object' && link.reference?.slug) {
        href = `/${link.reference.slug}`;
    }

    return (
        <li className="hover:text-primary font-medium">
            <Link
                href={href}
                target={link.newTab ? '_blank' : '_self'}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
            >
                {link.label}
            </Link>
        </li>
    );
};


// =================================================================
// 3. FOOTER COMPONENT
// =================================================================

const Footer = async () => {
    let footerData: FooterType | null = null;
    let contactData: ContactDetailsType | null = null;

    try {
        const payload = await getPayload({ config: configPromise });

        const [fetchedFooter, fetchedContact] = await Promise.all([
            payload.findGlobal({ slug: 'footer', depth: 1 }) as Promise<FooterType>,
            payload.findGlobal({ slug: 'contact-details', depth: 0 }) as Promise<ContactDetailsType>,
        ]);

        footerData = fetchedFooter;
        contactData = fetchedContact;

    } catch (error) {
        console.error("Error fetching global data directly in Footer component:", error);
    }

    if (!footerData || !footerData.socialAndLogo) {
        return <footer className="border-t border-gray-300 py-4 text-center">Footer data not available.</footer>;
    }

    // Destructure and process required fields
    const { socialAndLogo, columns } = footerData;
    const logoUrl = getLocalMediaUrl(socialAndLogo.logo as Media);

    // Get current year for copyright
    const currentYear = new Date().getFullYear();

    return (
        <footer className="section-spacing-t border-t border-gray-300 bg-accent/5">
            <div className="container">
                <div>
                    {/* Top Section */}
                    <div className="flex flex-col gap-16 max-lg:flex-wrap md:flex-row lg:justify-between">

                        {/* 1. Logo + Tagline (No Social Links) */}
                        <div className="w-full lg:w-[35%]">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <Link href="/" className="flex items-center gap-2">
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Your Center" className="h-10" />
                                    ) : (
                                        <span className="text-xl font-bold">Your Center</span>
                                    )}
                                </Link>
                            </div>
                            <p className="mt-4 text-sm">
                                {socialAndLogo.description}
                            </p>
                        </div>

                        {/* 2. DYNAMIC NAVIGATION COLUMNS */}
                        {columns && columns.map((column, index) => {
                            const navColumn = column as FooterNavBlock & { columnWidth?: string };

                            if (navColumn.blockType !== 'navBlock' || !navColumn.navItems?.length) {
                                return null;
                            }

                            // Map column width to Tailwind classes
                            const widthClasses = {
                                '1/6': 'w-full md:w-1/3 lg:w-1/6',
                                '1/4': 'w-full md:w-1/3 lg:w-1/4',
                                '1/3': 'w-full md:w-1/3 lg:w-1/3',
                                '2/6': 'w-full md:w-1/3 lg:w-2/6',
                            };

                            const widthClass = widthClasses[navColumn.columnWidth as keyof typeof widthClasses] || widthClasses['1/6'];

                            return (
                                <div key={index} className={widthClass}>
                                    <h4 className="mb-4 text-[20px]">{navColumn.title}</h4>
                                    <ul className="text-muted-foreground space-y-4">
                                        {navColumn.navItems.map((item, itemIndex) => (
                                            <DynamicLink key={itemIndex} item={item as FooterLinkItem} />
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}

                        {/* 3. CONTACT DETAILS (With Icons) */}
                        {contactData && (
                            <div className="w-full md:w-1/3 lg:w-1/4">
                                <h4 className="mb-4 text-[22px]">Contact</h4>
                                <ul className="text-muted-foreground space-y-4">
                                    {/* Phone Numbers */}
                                    {contactData.helplineNumber && (
                                        <li className="hover:text-primary font-medium">
                                            <Link href={`tel:${contactData.helplineNumber}`} target="_blank" className="flex items-center gap-2.5">
                                                <PhoneCall className="w-4 h-4 text-accent" /> {contactData.helplineNumber}
                                            </Link>
                                        </li>
                                    )}
                                    {contactData.mainPhoneNumber && (
                                        <li className="hover:text-primary font-medium">
                                            <Link href={`tel:${contactData.mainPhoneNumber}`} target="_blank" className="flex items-center gap-2.5">
                                                <PhoneCall className="w-4 h-4 text-accent" /> {contactData.mainPhoneNumber}
                                            </Link>
                                        </li>
                                    )}

                                    {/* Email */}
                                    {contactData.mainEmailAddress && (
                                        <li className="hover:text-primary font-medium">
                                            <Link href={`mailto:${contactData.mainEmailAddress}`} target="_blank" className="flex items-center gap-2.5">
                                                <Mail className="w-4 h-4 text-accent" /> {contactData.mainEmailAddress}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex-center text-muted-foreground mt-24 flex flex-col justify-center gap-4 border-t border-gray-400 py-8 text-sm font-medium">
                        <p>© {currentYear} Your Center Diagnostics. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;