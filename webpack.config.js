module.exports = {
    context: __dirname,
    entry: "./entry",
    output: {
        path: __dirname + "./app/assets/javascripts",
        filename: "bundle.js"
    }
};
