const server = {
    foo: 'bar',
};

const run = {
    ...server,
    bar: 'baz',
};

run.baz();
