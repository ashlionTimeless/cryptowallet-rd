let prod = process.env.NODE_ENV=='production';
console.log("is Production",prod, process.env.NODE_ENV);
module.exports = prod;