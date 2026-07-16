import type { CollectionConfig } from 'payload'
import { authenticatedAccess } from '@/access'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  // portfolio-admin-contact-messages-inbox-list-v1
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'source', 'createdAt'],
    listSearchableFields: ['name', 'email', 'subject', 'message', 'source'],
    components: {
      beforeList: ['./components/admin/contact-messages/ContactMessagesListHeader'],
      edit: {
        beforeDocumentControls: [
          './components/admin/contact-messages/ContactMessageDocumentControls',
        ],
      },
    },
  },
  access: {
    read: authenticatedAccess,
    create: () => false,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    // portfolio-admin-contact-message-viewer-v1
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        components: {
          Cell: './components/admin/contact-messages/ContactMessageCells#ContactMessageSubjectCell',
          Field: './components/admin/contact-messages/ContactMessageViewer',
        },
      },
    },
    {
      name: 'messageOperations',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/contact-messages/ContactMessageOperations',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
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
        components: {
          Cell: './components/admin/contact-messages/ContactMessageCells#ContactMessageStatusCell',
          Field: './components/admin/contact-messages/ContactMessageStatusField',
        },
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website',
      admin: {
        position: 'sidebar',
        description: 'Where this message came from, e.g. website, landing, contact-page.',
        components: {
          Cell: './components/admin/contact-messages/ContactMessageCells#ContactMessageSourceCell',
        },
      },
    },
    {
      name: 'archivedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
