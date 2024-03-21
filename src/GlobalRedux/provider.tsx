import { Provider } from "react-redux"
import { store } from "./redux"

interface ProvidersProps {
    children: any;
}
//A voir
export const Providers = ({ children }: ProvidersProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider> 
    )
}