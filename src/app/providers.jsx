// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '@/store/store'
import { Provider } from 'react-redux'

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </Provider>
    )
}