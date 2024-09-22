const resolvers = {
    Query: {
        id: () => 'some-id',
        params: () => ({
            x: 0,
            y: 0,
            z: 0,
        }),
    }
}

export {
    resolvers,
}
