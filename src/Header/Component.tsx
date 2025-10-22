import { Menu, PhoneCall } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { getCloudinaryUrl } from '@/utilities/getCloudinaryUrl';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Header } from '@/payload-types';

// TypeScript interfaces
interface MenuItem {
    label: string;
    link: {
        type: 'reference' | 'custom';
        reference?: any;
        url?: string;
        newTab?: boolean;
    };
    hasDropdown?: boolean;
    dropdownItems?: Array<{
        link: {
            type: 'reference' | 'custom';
            reference?: any;
            url?: string;
            newTab?: boolean;
            label: string;
        };
    }>;
}

interface Logo {
    url: string;
    src: string;
    alt: string;
}

interface CTA {
    showCta: boolean;
    ctaText: string;
    link: {
        type: 'reference' | 'custom';
        reference?: any;
        url?: string;
        newTab?: boolean;
    };
}

export async function Header() {
    // Fetch header global data
    let headerData: Header | null = null;
    let logo: Logo = {
        url: "/",
        src: "/yc-logo.png", // fallback
        alt: "yourcenter",
    };

    let menu: MenuItem[] = [];
    let cta: CTA = {
        showCta: false,
        ctaText: "Contact Us",
        link: { type: 'custom', url: '#' }
    };

    try {
        // Try direct fetch first to debug
        const payload = await getPayload({ config: configPromise });
        headerData = await payload.findGlobal({
            slug: 'header',
            depth: 1,
        }) as Header;


        // Get logo
        if (headerData?.logo && typeof headerData.logo === 'object') {
            // Use Cloudinary URL if available
            let logoSrc = "";
            if (headerData.logo.cloudinary?.secure_url) {
                logoSrc = headerData.logo.cloudinary.secure_url;
            } else if (headerData.logo.cloudinary?.public_id) {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                logoSrc = `https://res.cloudinary.com/${cloudName}/image/upload/${headerData.logo.cloudinary.public_id}`;
            } else {
                logoSrc = headerData?.logo?.url || "";
            }

            logo = {
                url: "/",
                src: logoSrc,
                alt: (headerData.logo as any).alt || "yourcenter",
            };
        } else {
            try {
                const logoMedia = await payload.find({
                    collection: 'media',
                    where: {
                        alt: { equals: 'yourcenter' }
                    },
                    limit: 1
                });

                if (logoMedia.docs.length > 0) {
                    const logoDoc = logoMedia.docs[0];
                    // Log the media document and Cloudinary URL for debugging
                    console.log('Logo media document:', logoDoc);
                    console.log('Cloudinary secure_url:', logoDoc.cloudinary?.secure_url);
                    logo = {
                        url: "/",
                        src: getCloudinaryUrl(logoDoc),
                        alt: logoDoc.alt || "yourcenter",
                    };
                }
            } catch (mediaError) {
                console.log('Could not fetch logo from media:', mediaError);
            }
        }

        // Get navigation items
        if (headerData?.navItems) {
            menu = headerData.navItems.map((item: any) => ({
                label: item.label,
                link: item.link,
                hasDropdown: item.hasDropdown,
                dropdownItems: item.dropdownItems || []
            }));
        }

        // Get CTA button
        if (headerData?.ctaButton) {
            const linkData = headerData.ctaButton.link;
            cta = {
                showCta: headerData.ctaButton.showCta || false,
                ctaText: headerData.ctaButton.ctaText || "Contact Us",
                link: linkData ? {
                    type: linkData.type || 'custom',
                    reference: linkData.reference,
                    url: linkData.url || undefined,
                    newTab: linkData.newTab || undefined
                } : { type: 'custom' as const, url: '#' }
            };
        }
    } catch {
        console.log('Could not fetch header data from Payload, using fallback');
    }

    // Helper function to get URL from link object
    const getLinkUrl = (link: any) => {
        if (link.type === 'custom') {
            return link.url || '#';
        } else if (link.type === 'reference' && link.reference) {
            if (link.reference.slug) {
                return `/${link.reference.slug}`;
            }
            return '#';
        }
        return '#';
    };

    return (
        <header className="py-3 lg:py-4 w-full sticky top-0 shadow z-50 bg-white">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-6 w-1/3">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <Image
                                src={logo.src}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                                width={240}
                                height={30}
                            />
                        </Link>
                    </div>
                    <div className="flex-center w-1/3">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-6">
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex gap-2 justify-end w-1/3">
                        {cta.showCta && (
                            <Button asChild>
                                <Link href={getLinkUrl(cta.link)} target={cta.link.newTab ? '_blank' : undefined}>
                                    <PhoneCall className="w-4 h-4 mr-2" />
                                    {cta.ctaText}
                                </Link>
                            </Button>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                <nav className="block lg:hidden">
                    <div className="flex-between gap-4">
                        {/* Logo */}
                        <Link href={logo.url} className="flex-center">
                            <Image
                                src={logo.src}
                                className="max-h-8"
                                alt={logo.alt}
                                width={180}
                                height={32}
                            />
                        </Link>

                        <div className="flex-center gap-4">
                            {cta.showCta && (
                                <Button size="sm" asChild>
                                    <Link href={getLinkUrl(cta.link)} target={cta.link.newTab ? '_blank' : undefined}>
                                        <PhoneCall className="w-4 h-4 mr-2" />
                                        {cta.ctaText}
                                    </Link>
                                </Button>
                            )}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto z-[1000]">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href={logo.url} className="flex items-center gap-2">
                                                <img
                                                    src={logo.src}
                                                    className="max-h-8"
                                                    alt={logo.alt}
                                                />
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="flex w-full flex-col gap-4"
                                        >
                                            {menu.map((item) => renderMobileMenuItem(item))}
                                        </Accordion>
                                    </div>
                                    {cta.showCta && (
                                        <SheetFooter>
                                            <div className="flex flex-col gap-3">
                                                <Button asChild>
                                                    <Link href={getLinkUrl(cta.link)} target={cta.link.newTab ? '_blank' : undefined}>
                                                        {cta.ctaText}
                                                    </Link>
                                                </Button>
                                            </div>
                                        </SheetFooter>
                                    )}
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

// Helpers
const renderMenuItem = (item: MenuItem) => {
    if (item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0) {
        return (
            <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger className="font-semibold">{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-2 py-2">
                        {item.dropdownItems.map((subItem: any) => (
                            <li key={subItem.link.label}>
                                <Link
                                    className="py-1.5 px-3 w-full inline-flex rounded-lg hover:bg-primary hover:text-primary-foreground text-sm font-medium"
                                    href={getLinkUrl(subItem.link)}
                                    target={subItem.link.newTab ? '_blank' : undefined}
                                >
                                    {subItem.link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.label}>
            <NavigationMenuLink
                href={getLinkUrl(item.link)}
                target={item.link.newTab ? '_blank' : undefined}
                className="bg-background hover:bg-accent hover:text-accent-foreground group inline-flex h-8 w-max items-center justify-center rounded-md px-4 !py-1 font-semibold transition-colors"
            >
                {item.label}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0) {
        return (
            <AccordionItem key={item.label} value={item.label} className="border-b-0">
                <AccordionTrigger className="!text-base text-foreground py-0 font-semibold hover:no-underline">
                    {item.label}
                </AccordionTrigger>
                <AccordionContent className="mt-2 flex flex-col gap-2 pl-2">
                    {item.dropdownItems.map((subItem: any) => (
                        <Link
                            key={subItem.link.label}
                            href={getLinkUrl(subItem.link)}
                            target={subItem.link.newTab ? '_blank' : undefined}
                            className="py-2 border-b border-gray-300 font-medium"
                        >
                            {subItem.link.label}
                        </Link>
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link
            key={item.label}
            href={getLinkUrl(item.link)}
            target={item.link.newTab ? '_blank' : undefined}
            className="text-md font-semibold"
        >
            {item.label}
        </Link>
    );
};

// Helper function to get URL from link object
const getLinkUrl = (link: any) => {
    if (link.type === 'custom') {
        return link.url || '#';
    } else if (link.type === 'reference' && link.reference) {
        if (link.reference.slug) {
            return `/${link.reference.slug}`;
        }
        return '#';
    }
    return '#';
};
