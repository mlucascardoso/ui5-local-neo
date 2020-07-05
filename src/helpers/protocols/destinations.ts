interface DestinationOptions {
    uri: string
    credentials?: DestinationCredentials
}

interface DestinationCredentials {
    user: string
    password: string
}

export interface Destinations {
    [key: string]: DestinationOptions
}
