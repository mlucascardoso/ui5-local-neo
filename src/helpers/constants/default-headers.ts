import allowedHeaders from './allowed-headers';

export default [
    {
        name: 'Access-Control-Allow-Origin',
        value: '*',
    },
    {
        name: 'Access-Control-Allow-Credentials',
        value: 'true',
    },
    {
        name: 'Access-Control-Allow-Methods',
        value: 'GET,PUT,POST,DELETE',
    },
    {
        name: 'Access-Control-Allow-Headers',
        value: allowedHeaders.join(','),
    },
];
