
import Link from "next/link";
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
// (Updated to allow 'null' for compatibility with Payload generated types)
// =================================================================

// Define the structure of a single dynamic navigation link item
interface FooterLinkItem {
    link: {
        type: 'reference' | 'custom';
        // Note: Payload's auto-generated types often include 'null' for optional relationships
        reference?: { relationTo: string, value: string, slug: string } | any;

        // FIX: Changed to string | null | undefined to resolve the type error (url is optional/nullable in Payload)
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
    // FIX: Added explicit check for link.url to ensure it's not null before assignment
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
            // Casting to the auto-generated types
            payload.findGlobal({ slug: 'footer', depth: 1 }) as Promise<FooterType>,
            payload.findGlobal({ slug: 'contact-details', depth: 0 }) as Promise<ContactDetailsType>,
        ]);

        footerData = fetchedFooter;
        contactData = fetchedContact;

    } catch (error) {
        console.error("Error fetching global data directly in Footer component:", error);
    }

    // 1. Initial essential data check (No change)
    if (!footerData || !footerData.socialAndLogo) {
        return <footer className="border-t border-gray-300 py-4 text-center">Footer data not available.</footer>;
    }

    // Destructure and process required fields
    const { socialAndLogo, columns } = footerData;
    // Use the reliable local helper for the logo URL
    // NOTE: Casting socialAndLogo.logo to Media ensures Media.url and Media.alt are treated correctly.
    const logoUrl = getLocalMediaUrl(socialAndLogo.logo as Media);
    const contactInfo = contactData?.locationGroup;


    return (
        <footer className="section-spacing-t border-t border-gray-300 bg-accent/5">
            <div className="container">
                <div>
                    {/* Top Section */}
                    <div className="flex flex-col gap-16 max-lg:flex-wrap md:flex-row lg:justify-between">

                        {/* 1. Logo + Tagline + Social (Fixed First Column) */}
                        <div className="w-full lg:w-[35%]">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <Link href="/" className="flex items-center gap-2">
                                    {logoUrl ? (
                                        // Use 'yourcenter' or a check on socialAndLogo.logo.alt if logo is fully populated
                                        <img src={logoUrl} alt={"yourcenter"} className="h-10" />
                                    ) : (
                                        // Fallback if logo fails
                                        <span className="text-xl font-bold">Your Center</span>
                                    )}
                                </Link>
                            </div>
                            <p className="mt-4 text-sm">
                                {socialAndLogo.description}
                            </p>

                            {/* Social Links */}
                            <ul className="mt-6 flex space-x-4">
                                {socialAndLogo.socialLinks && socialAndLogo.socialLinks.map((social, index) => (
                                    <li key={index} className="hover:text-primary font-medium">
                                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                                            {social.platform}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. DYNAMIC NAVIGATION COLUMNS */}
                        {/* Now uses the manually defined FooterNavBlock type internally for safety */}
                        {columns && columns.map((column, index) => {
                            // Cast the item as the manually defined block to access properties safely
                            const navColumn = column as FooterNavBlock;

                            if (navColumn.blockType !== 'navBlock' || !navColumn.navItems?.length) {
                                return null;
                            }

                            return (
                                <div key={index} className="w-full md:w-1/3 lg:w-1/6">
                                    <h4 className="mb-4 text-[22px]">{navColumn.title}</h4>
                                    <ul className="text-muted-foreground space-y-4">
                                        {navColumn.navItems.map((item, itemIndex) => (
                                            <DynamicLink key={itemIndex} item={item as FooterLinkItem} />
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}

                        {/* 3. CONTACT DETAILS (From ContactDetails Global) */}
                        {contactData && (
                            <div className="w-full md:w-1/3 lg:w-1/4">
                                <h4 className="mb-4 text-[22px]">Get In Touch</h4>
                                <ul className="text-muted-foreground space-y-4">
                                    {/* Helpline Number (Priority) */}
                                    {contactData.helplineNumber && (
                                        <li className="font-medium">
                                            <a href={`tel:${contactData.helplineNumber}`} className="hover:text-primary text-red-600">
                                                Helpline: {contactData.helplineNumber}
                                            </a>
                                        </li>
                                    )}

                                    {/* Main Phone */}
                                    {contactData.mainPhoneNumber && (
                                        <li className="font-medium">
                                            <a href={`tel:${contactData.mainPhoneNumber}`} className="hover:text-primary">
                                                Phone: {contactData.mainPhoneNumber}
                                            </a>
                                        </li>
                                    )}

                                    {/* Main Email */}
                                    {contactData.mainEmailAddress && (
                                        <li className="font-medium">
                                            <a href={`mailto:${contactData.mainEmailAddress}`} className="hover:text-primary">
                                                Email: {contactData.mainEmailAddress}
                                            </a>
                                        </li>
                                    )}

                                    {/* Location */}
                                    {contactInfo?.addressLine1 && (
                                        <li className="font-medium pt-2">
                                            <p>Location:</p>
                                            <p className="mt-1">
                                                {contactInfo.addressLine1}
                                                {contactInfo.addressLine2 && `, ${contactInfo.addressLine2}`}
                                                <br />
                                                {contactInfo.city}, {contactInfo.state} {contactInfo.zipCode}
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Bottom Row */}
                    <div className="text-muted-foreground mt-24 flex flex-col justify-center gap-4 border-t border-gray-400 py-8 text-sm font-medium md:flex-row md:items-center">
                        <p>© 2024 Your Center. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;