interface RouteTarget {
    type: string,
    name: string,
    entryPath: string
}

export interface NeoAppRoutes {
    path: string
    target: RouteTarget
    description: string
}

