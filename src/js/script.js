(() => {
  'use strict';

  // LINEへメッセージを送信する関数
  const postLINEMessage = (herokuId, userIds, content) => {
    const HEROKU_URL = `https://ldc-20200511-${herokuId}.herokuapp.com/api/sendMulticastMessage`;
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

  // 詳細画面でメッセージを1件送信する処理
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

  // 一覧画面でメッセージを一括送信する処理
  kintone.events.on([
    'app.record.index.show',
    'mobile.app.record.index.show'
  ], event => {
    if (event.viewId !== 5118250) return;

    const isMobile = event.type.split('.')[0] === 'mobile';
    const headerSpace = isMobile ? kintone.mobile.app.getHeaderSpaceElement() : kintone.app.getHeaderSpaceElement();

    if (document.getElementById('kintone-send-line-message-button')) return;

    const inputText = document.createElement('input');
    inputText.id = 'kintone-send-line-message-input';
    inputText.classList.add('kintoneplugin-input-text');
    inputText.setAttribute('placeholder', '{herokuのID}');

    const textArea = document.createElement('textArea');
    textArea.id = 'kintone-send-line-message-textarea';
    textArea.setAttribute('cols', 30);
    textArea.setAttribute('rows', 3);
    textArea.setAttribute('placeholder', '{メッセージ内容}');

    const btn = document.createElement('button');
    btn.id = 'kintone-send-line-message-button';
    btn.classList.add('kintoneplugin-button-normal');
    btn.textContent = 'メッセージ一括送信';

    headerSpace.appendChild(inputText);
    headerSpace.appendChild(textArea);
    headerSpace.appendChild(btn);

    btn.onclick = () => {
      const herokuId = inputText.value;
      const userIds = event.records.map(val => val.userId.value);
      const content = textArea.value;
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
        if (content) return postLINEMessage(herokuId, userIds, content);

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

        return postLINEMessage(herokuId, userIds, content);
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
