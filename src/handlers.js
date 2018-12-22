module.exports = [
    {
        identifier: 'pageView',
        method: 'GET',
        handle: (req, res) => {

            res.render('home');
        }
    }
];