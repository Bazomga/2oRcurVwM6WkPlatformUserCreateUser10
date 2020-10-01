const obterDados = require('./obterDados');

const checkDescricao = async (body, tokenSeniorX) => {
    //status 200 = ok, status 400 = bad request
    if (body.hasOwnProperty('description')) {
        return { statusCode: 200, body };
    } else {
        let dataInfo = new Date();
        //getMonth pega o mes começando com 0, por isso se soma 1 na hora da impressao
        let dataHoje = dataInfo.getDate() + "/" + (dataInfo.getMonth()+1) + "/" + dataInfo.getFullYear();
        let user = await obterDados.getUser(tokenSeniorX);
        if (user.statusCode == 400) {
            return {
                statusCode: user.statusCode, 
                body: user.body
            };
        }
        const infoGeral = `Usuário '${body.username}' (${body.fullName}) foi criado em ${dataHoje} por ${user.fullName}`;
        body.description = "Campo preenchido automaticamente via Regra. " + infoGeral + ".";
        return { statusCode: 200, body }; 
    }
};

module.exports = { checkDescricao }; 