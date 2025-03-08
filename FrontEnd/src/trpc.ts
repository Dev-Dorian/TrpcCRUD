import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../BackEnd/src/app'

export const trpc = createTRPCReact<AppRouter>();