const checkForVariables = function (text, msg) {
    const variableCheckerRegEx = new RegExp(/[$]{.+?}/g);

    let result = variableCheckerRegEx.exec(text);
    while (result) {
        const msgVariable = result[0].substring(2, result[0].length - 1);
        const evalResult = getPropertyFromMessage(msgVariable, msg);
        text = text.replace(result[0], evalResult);

        result = variableCheckerRegEx.exec(text)
    }

    return text;
};

const getPropertyFromMessage = function (dotSeparatedPath, msg) {
    let path = dotSeparatedPath.split('.');
    let value = msg;
    let property;

    for (let i = path[0] === 'msg' ? 1 : 0; i < path.length; i++) {
        property = path[i];
        if (property in value) {
            value = value[property];
        } else {
            return;
        }
    }
    return value;
}

module.exports = { checkForVariables, getPropertyFromMessage }
