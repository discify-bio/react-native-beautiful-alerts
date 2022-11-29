import { createContext, MutableRefObject } from 'react'
import { AlertMethods } from './types'

const Context = createContext<MutableRefObject<AlertMethods>>(null as any)

export default Context