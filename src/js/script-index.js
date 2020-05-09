(() => {
  'use strict';


  kintone.events.on([
    'app.record.index.show',
    'mobile.app.record.index.show'
  ], event => {
    const isMobile = event.type.split('.')[0] === 'mobile';

  });
})();