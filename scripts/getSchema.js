var fetch = require('node-fetch');
var fs = require('fs');
var schemaUrl = 'http://localhost:4000/graphql';

const writeSchema = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./${fileName}`, data, err => {
      if (err) {
        const error = new Error(`No se pudo escribir el archivo ${fileName}`);
        return reject(error);
      }
      return resolve(null);
    });
  });
};

const {
  buildClientSchema,
  introspectionQuery,
  printSchema
} = require('graphql/utilities');

console.log(introspectionQuery);

fetch(schemaUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query: introspectionQuery })
})
  .then(res => res.json())
  .then(res => {
    console.log(res);
    const schemaString = printSchema(buildClientSchema(res.data));
    return writeSchema('schema.graphql', schemaString);
  })
  .catch(err => {
    console.log(err);
  });
