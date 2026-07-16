import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  // portfolio-admin-testimonials-moderation-list-v1
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'rating', 'source', 'approvedAt'],
    listSearchableFields: ['name', 'role', 'company', 'message', 'source'],
    components: {
      beforeList: ['./components/admin/testimonials/TestimonialsListHeader'],
      edit: {
        beforeDocumentControls: ['./components/admin/testimonials/TestimonialDocumentControls'],
      },
    },
  },
  access: {
    read: publicAccess,
    create: publicAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    // portfolio-admin-testimonial-editor-v1
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Feedback',
          description: 'Client identity and testimonial content.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    components: {
                      Cell: './components/admin/testimonials/TestimonialCells#TestimonialIdentityCell',
                    },
                  },
                },
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'company',
                  type: 'text',
                },
              ],
            },
            {
              name: 'message',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          label: 'Media',
          description: 'Optional client avatar or organization image.',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'testimonialModeration',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/testimonials/TestimonialModerationPanel',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      admin: {
        position: 'sidebar',
        components: {
          Cell: './components/admin/testimonials/TestimonialCells#TestimonialStatusCell',
          Field: './components/admin/testimonials/TestimonialStatusField',
        },
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        position: 'sidebar',
        description: 'Optional rating from 1 to 5.',
        components: {
          Cell: './components/admin/testimonials/TestimonialCells#TestimonialRatingCell',
        },
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Where this testimonial came from, e.g. website, LinkedIn, direct message.',
        components: {
          Cell: './components/admin/testimonials/TestimonialCells#TestimonialSourceCell',
        },
      },
    },
    {
      name: 'approvedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        components: {
          Cell: './components/admin/testimonials/TestimonialCells#TestimonialApprovedCell',
        },
      },
    },
  ],
}
