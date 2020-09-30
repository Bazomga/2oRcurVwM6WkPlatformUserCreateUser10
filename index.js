
/**
 * Nome da primitiva : createUser
 * Nome do dominio : platform
 * Nome do serviço : user
 * Nome do tenant : fabcustom
 **/

const axios = require('axios')
const obterDados = require('./obterDados')

//O hander é o "main", onde gerencia o que irá acontecer
exports.handler = async (event) => {
  let body;
  let tokenSeniorX = '0'//Token para testes
  
  if (event.body === undefined) {
    body = event
  } else {
    body = JSON.parse(event.body)  
    tokenSeniorX = event.headers['X-Senior-Token']
  }  
  
  //status 200 = ok, status 400 = bad request
  if (body.hasOwnProperty('description')) {
    return sendRes(200, body)
  } else {
    let dataInfo = new Date()
    let dataHoje = dataInfo.getDate() + "/" + (dataInfo.getMonth()+1) + "/" + dataInfo.getFullYear()
    let user = await obterDados.obterDadosUser(tokenSeniorX)
    if (user.statusCode == 400) {
      return sendRes(user.statusCode, user.body)
    }
    const infoGeral = `Usuário '${body.username}' (${body.fullName}) foi criado em ${dataHoje} por ${user.fullName}`
    body.description = "Campo preenchido automaticamente via Regra. " + infoGeral + "."
    return sendRes(200, body);  
  }
};

const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
  delete body.password
  console.log(body);

  return response;
};
