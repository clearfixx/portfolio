import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'relatedCollection', 'createdAt'],
  },
  access: {
    read: authenticatedAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'system',
      options: [
        {
          label: 'Contact',
          value: 'contact',
        },
        {
          label: 'Testimonial',
          value: 'testimonial',
        },
        {
          label: 'System',
          value: 'system',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'unread',
      options: [
        {
          label: 'Unread',
          value: 'unread',
        },
        {
          label: 'Read',
          value: 'read',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedCollection',
      type: 'select',
      options: [
        {
          label: 'Contact Messages',
          value: 'contact-messages',
        },
        {
          label: 'Testimonials',
          value: 'testimonials',
        },
        {
          label: 'Projects',
          value: 'projects',
        },
        {
          label: 'Blog Posts',
          value: 'blog-posts',
        },
        {
          label: 'System',
          value: 'system',
        },
      ],
      admin: {
        description: 'Collection that generated this notification.',
      },
    },
    {
      name: 'relatedDocumentId',
      type: 'text',
      admin: {
        description: 'Payload document ID associated with this notification.',
      },
    },
  ],
  timestamps: true,
}
