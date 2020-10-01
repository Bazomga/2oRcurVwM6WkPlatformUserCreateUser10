const axios = require('axios');

const getUser = async (tokenSeniorX) => {
    let response;
    
    let headersConfig = {
        headers: {
            "Authorization" : tokenSeniorX
        }
    };
    try {
        response = await axios.get('https://platform-homologx.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUser', headersConfig);
        return response.data;
    } catch(e) {
        return {
            statusCode: 400,
            headers: {
            "Content-Type": "application/json"
            },
            body: 'Erro ao realizar chamada HTTP e indentificar o usuário logado!'
        };
    }
};

module.exports = { getUser };