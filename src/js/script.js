(() => {
  'use strict';

  const postLINEMessage = (herokuId, userIds, content) => {
    const checkHerokuId = herokuId.split('-');
    const newHerokuId = checkHerokuId[0] === 'ldc' && checkHerokuId[1] === '20200511' ? checkHerokuId[2] : herokuId;
    const HEROKU_URL = `https://ldc-20200511-${newHerokuId}.herokuapp.com/api/sendMulticastMessage`;
    const AUTH = 'API_KEY_000000000';

    const header = {
      'Authorization': AUTH,
      'Content-Type': 'application/json'
    };
    const body = {
      userIds: userIds,
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
      const herokuId = data.record.herokuId.value;
      const userId = data.record.userId.value;
      const content = data.record.content.value;
      if (!herokuId) {
        return swal({
          title: 'エラー',
          text: 'herokuのIDが書かれていません。',
          icon: 'warning',
          dangerMode: true,
        });
      }
      swal({
        title: '確認',
        text: 'メッセージを送信して良いですか？',
        icon: 'info',
        buttons: true,
      }).then(isSend => {
        if (!isSend) throw new Error('キャンセル');
        if (content) return postLINEMessage(herokuId, [userId], content);

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

        return postLINEMessage(herokuId, [userId], content);
      }).then(res => {
        console.log(res);
        if (res[1] === 200) {
          swal('送信成功！');
        } else {
          swal('送信失敗');
        }
      }).catch(err => {
        console.log(err);
      });
    };
  });
})();
