module.exports = function(object, commaSepratedOutput, label, itemNumber=0){
    let propValue = ""
    if(commaSepratedOutput){
        for (const [index, [prop, val]] of Object.entries(object).entries()) {
            if (val) {
                propValue += val;
                if (index < Object.entries(object).length - 1) {
                    propValue += ', ';
                }
            }
        }
    }else{
        if(itemNumber){
            propValue = propValue + `<div>${label.slice(0,-1)} ${itemNumber}:</div>`
        }
        Object.entries(object).forEach(([prop, val]) => {
            console.log(prop, val,"val");
            if(prop != "id" && val){
                prop = prop.charAt(0).toUpperCase() + prop.slice(1)
                propValue = propValue + `${prop} : ${val} `
            }
        })
    }
    return propValue
}