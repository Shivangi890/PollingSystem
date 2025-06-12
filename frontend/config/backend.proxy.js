
const backendURL = process.env.Backend_Url || 'http://localhost:8090';
const backendContextPath = '';

console.log('using baclend URL', backendURL);
console.log('using backend context path', backendContextPath);

module.exports = {
    '/api' : {
        target: backendURL,
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
            [`${backendContextPath}`] : backendContextPath
        }
    }
}