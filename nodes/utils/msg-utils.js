const checkForVariables = function (text, msg) {
    do {
        result = new RegExp(/[$]{.+?}/g).exec(text);
        if (result) {
            const evalValue = result[0].substring(2, result[0].length - 1);
            const evalResult = eval(evalValue);
            text = text.replace(result[0], evalResult);
        }
    } while (result);
    return text;
};

module.exports = { checkForVariables }