import type { EmailAdapter } from 'payload'

export const developmentEmailAdapter: EmailAdapter<void> = ({ payload }) => ({
  defaultFromAddress: 'admin@portfolio.local',
  defaultFromName: 'Portfolio Control Room',
  name: 'development-console',
  sendEmail: async (message) => {
    const recipient = Array.isArray(message.to) ? message.to.join(', ') : String(message.to ?? '')
    payload.logger.info(`Development email: ${recipient} · ${String(message.subject ?? '')}`)
  },
})
