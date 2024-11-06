const { replaceLiquidTags } = require('../src');

describe('replaceLiquidTags', () => {
  test('replaces simple tags', () => {
    const template = 'Hello {{contact.name}}||{There}! this is a test {{event.subscribe.eventName}}||{event}';
    const event = { event: 'subscribe',properties :{
        eventName : 'subscribe'
    } };
    const contact = { name: 'John' };
    expect(replaceLiquidTags(template, event, contact)).toBe('Hello John! this is a test subscribe');
  });
});