'use client'

//redux
import { Provider } from "react-redux"
import { store } from "./redux"

//props
interface ProvidersProps {
    children: any;
}


export const Providers = ({ children }: ProvidersProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider> 
    )
}