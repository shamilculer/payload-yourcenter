import type { GlobalConfig } from 'payload'

const ContactDetails: GlobalConfig = {
    slug: 'contact-details', // The unique slug used for API calls (e.g., payload.findGlobal({ slug: 'contact-details' }))
    label: 'Contact Details', // Label in the Payload Admin UI
    access: {
        // Allows the data to be publicly readable (essential for the frontend)
        read: () => true, 
    },
    fields: [
        {
            name: 'mainPhoneNumber',
            label: 'Main Phone Number (General Enquiries)',
            type: 'text',
            required: true,
        },
        // --- NEW HELPLINE FIELD ADDED HERE ---
        {
            name: 'helplineNumber',
            label: 'Helpline / Emergency Number',
            type: 'text',
            required: false, // Make this required: true if it must always be present
            admin: {
                description: 'A dedicated number for urgent support or helpline services.',
            },
        },
        // -------------------------------------
        {
            name: 'secondaryPhoneNumbers',
            label: 'Secondary Phone Numbers',
            type: 'array',
            minRows: 0,
            fields: [
                {
                    name: 'phoneNumber',
                    label: 'Phone Number',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    label: 'Label (e.g., WhatsApp, Office)',
                    type: 'text',
                },
            ],
        },
        {
            name: 'mainEmailAddress',
            label: 'Main Email Address',
            type: 'email',
            required: true,
        },
        {
            name: 'secondaryEmailAddresses',
            label: 'Secondary Email Addresses',
            type: 'array',
            minRows: 0,
            fields: [
                {
                    name: 'emailAddress',
                    label: 'Email Address',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'label',
                    label: 'Label (e.g., Support, Sales)',
                    type: 'text',
                },
            ],
        },
        {
            name: 'locationGroup',
            label: 'Location Details',
            type: 'group',
            fields: [
                {
                    name: 'addressLine1',
                    label: 'Address Line 1',
                    type: 'text',
                },
                {
                    name: 'addressLine2',
                    label: 'Address Line 2',
                    type: 'text',
                },
                {
                    name: 'city',
                    label: 'City / Town',
                    type: 'text',
                },
                {
                    name: 'state',
                    label: 'State / Province',
                    type: 'text',
                },
                {
                    name: 'zipCode',
                    label: 'Zip / Postal Code',
                    type: 'text',
                },
                {
                    name: 'googleMapsEmbedUrl',
                    label: 'Google Maps Embed URL',
                    type: 'text',
                    admin: {
                        description: 'Embed URL from Google Maps for the location (iframe src).',
                    },
                },
            ]
        },
    ],
};

export default ContactDetails;