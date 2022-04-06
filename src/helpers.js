const authHeader = {
    headers: {
        "Authorization": `Bearer ${process.env.FACEIT_API_KEY}`
    },
}

const getNickname = () => window.location.href.split('/')[5];

module.exports = {
    authHeader,
    getNickname
}