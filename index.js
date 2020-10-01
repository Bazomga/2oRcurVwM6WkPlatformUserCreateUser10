/**
 * Nome da primitiva : createUser
 * Nome do dominio : platform
 * Nome do serviço : user
 * Nome do tenant : fabcustom
 **/

const verificaDados = require('./src/verificaDados');

//O hander é o "main", onde gerencia o que irá acontecer
exports.handler = async (event) => {
  let descricao;
  let body;
  let tokenSeniorX = 'token'; //Token de testes oculto
  if (event.body === undefined) {
    body = event;
  } else {
    body = JSON.parse(event.body);  
    tokenSeniorX = event.headers['X-Senior-Token']; //header que guarda a chave
  }  
  descricao = await verificaDados.checkDescricao(body, tokenSeniorX);
  return sendRes(descricao.statusCode, descricao.body);
};

const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
  return response;
};
