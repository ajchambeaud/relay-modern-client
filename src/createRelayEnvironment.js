import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import promiseDelay from 'promise-delay';

const relayServerUrl = 'http://localhost:4000/graphql';

/**
 * Funcion fetchQuery tomada de la documentacion de Relay Modern. 
 * Ver https://facebook.github.io/relay/docs/network-layer.html
 * 
 * Define como se comunica relay con el server de GraphQl. La function realiza la peticion al servidor para cualquier operacion 
 * (query/mutation/etc) y retorna el resultado como una Promise.
 */
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  console.log(operation);

  return fetch(relayServerUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, // Si el servidor lo requiere, agregar los headers de autenticacion.
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(r => promiseDelay(3000, r));
}

// Crea la capa de red de Relay usando la funcion fetchQuery
const network = Network.create(fetchQuery);
const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store
});
