const app = require('./app')

const port = process.env.PORT || 5000

// logs what port is the server running on
app.listen(port, () => console.log(`Server started on port ${port}`))