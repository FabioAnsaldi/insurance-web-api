module.exports = [
    {
        identifier: 'landing',
        method: 'GET',
        handle: (req, res) => {

            res.send('Hello World!');
        }
    }
];