// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from './App.tsx'
import '../index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 6 * 60 * 60 * 1000,    // 6 hours
            staleTime: 1 * 60 * 60 * 1000,    // 1 hour
            // keepPreviousData: true
        }
    }
})

createRoot(document.getElementById('root')!).render(
//   <StrictMode>
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </ChakraProvider>
//   </StrictMode>,
)
