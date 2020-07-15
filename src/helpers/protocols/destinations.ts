export interface DestinationOptions {
    uri: string
    credentials?: DestinationCredentials
}

export interface DestinationCredentials {
    user: string
    password: string
}

export interface Destinations {
    [key: string]: DestinationOptions
}
