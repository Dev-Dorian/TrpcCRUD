import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '../../BackEnd/src/app'

export const trpc = createTRPCReact<AppRouter>();