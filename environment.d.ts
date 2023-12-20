declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string,
            MONGODB: string,
            QUERY_RESULT_LIMIT: string
        }
    }
}

export {}