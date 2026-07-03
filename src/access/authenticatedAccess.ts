import type { Access } from 'payload'

export const authenticatedAccess: Access = ({ req }) => Boolean(req.user)
