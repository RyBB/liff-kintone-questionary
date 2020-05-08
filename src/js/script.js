(() => {
  'use strict';

  const HEROKU_URL = 'https://liff-kintone-questionary.herokuapp.com/api/sendMulticastMessage'
  const AUTH = 'API_KEY_000000000';

  const postLINEMessage = (userId, content) => {
    const header = {
      'Authorization': AUTH,
      'Content-Type': 'application/json'
    };
    const body = {
      userIds: [userId],
      message: {
        title: 'kintoneからメッセージです',
        body: content || '本文なし'
      }
    };
    return kintone.proxy(HEROKU_URL, 'POST', header, body);
  };

  kintone.events.on([
    'app.record.detail.show',
    'mobile.app.record.detail.show'
  ], event => {
    const isMobile = event.type.split('.')[0] === 'mobile';
    const headerSpace = isMobile ? kintone.mobile.app.getHeaderSpaceElement() : document.getElementsByClassName('gaia-argoui-app-toolbar-statusmenu')[0];

    if (document.getElementById('kintone-send-line-message-button')) return;
    const btn = document.createElement('button');
    btn.id = 'kintone-send-line-message-button';
    btn.classList.add('kintoneplugin-button-normal');
    btn.textContent = 'メッセージ送信';
    headerSpace.appendChild(btn);

    btn.onclick = () => {
      const data = isMobile ? kintone.mobile.app.record.get() : kintone.app.record.get();
      const userId = data.record.userId.value;
      const content = data.record.content.value;
      swal({
        title: '確認',
        text: 'メッセージを送信して良いですか？',
        icon: 'info',
        buttons: true,
      }).then(isSend => {
        if (!isSend) throw new Error('キャンセル');
        if (content) return postLINEMessage(userId, content);

        return swal({
          title: '確認',
          text: '本文が空ですがメッセージを送信して良いですか？',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        });
      }).then(resp => {
        if (!resp) throw new Error('キャンセル');
        if (resp[1] === 200) return resp;

        return postLINEMessage(userId, content);
      }).then(res => {
        console.log(res);
        swal('送信成功！');
      }).catch(err => {
        console.log(err);
      });
    };
  });
})();
