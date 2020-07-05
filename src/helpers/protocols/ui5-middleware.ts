interface ResourcesReaders {
    _readers: ResourcesProject[]
}

interface ResourcesProject {
    _project: {
        path: string
    }
}

export interface Resources {
    all: any
    rootProject: ResourcesReaders
    dependencies: any
}

export interface Options {
    configuration: any
}

export interface Ui5MiddlewareOptions {
    resources: Resources
    options: Options
};
