function getLiquidTagValue(liquidTag, event, contact) {
  let keys = liquidTag.slice(2, -2).split('.'); // 2 & -2 removes the {{}} flower brackets
  let sourceObjectName = keys[0];
  if (sourceObjectName === 'event') {
    if (event && event.event === keys[1]) {
      return event.properties[keys[2]]
    } else {
      return undefined;
    }
  } else if (sourceObjectName === 'contact') {
    if (keys[1] === 'customProperties' && keys[2]) {
      return contact?.customProperties?.[keys[2]]
    } else {
      return contact[keys[1]]
    }
  } else {
    return undefined;
  }
}
module.exports = { getLiquidTagValue };