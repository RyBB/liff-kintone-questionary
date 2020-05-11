# 付録

そもそもkintoneとは?の部分や、<br/>
今回実装したkintoneカスタマイズの解説などをしています。

## kintoneとは

> kintone（キントーン）は、開発の知識がなくても自社の業務に合わせたシステムをかんたんに作成できる、サイボウズのクラウドサービスです。業務アプリを直感的に作成でき、チーム内で共有して使えます。社員間のつながりを活性化する社内SNSとしての機能も備えているため、スピーディーに情報共有ができます。

*kintoneヘルプ  <https://jp.cybozu.help/k/ja/user/basic/whatskintone.html>*

非エンジニアでも自身の業務に合ったシステムを **自分で** 作ることができるWebシステムとなります。<br/>
kintoneにはあらかじめいくつか機能が搭載されており、

- アプリ（データベース）
- プロセス管理（ワークフロー）
- コメント（コミュニケーション）

など業務に必要な機能が揃っているプラットフォームでもあります。
アプリとコメントが紐付いているため、いわゆるストック型とフロー型を組み合わせたシステムが構築できます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQBdrDAe5G1dOAj3bYx_O4VgqCgJzcJfAhzGd27BjLj0spVvY05mW_0IdPCyB7i5-eWpMhLwOxZxuaV/pub?w=926&amp;h=489">

## kintoneカスタマイズとは

kintoneにはAPIなどの拡張機能があり、ご自身のやりたいことに合わせてカスタマイズすることが可能となっています。<br/>
<br/>
・JavaScriptによる画面カスタマイズ
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQ8JtN6RJusfmCLdgmUIDkxohWpfbu9by2JsVfyVc6vGrwVKDGNAAdt-zclMXjUHOY5rdHkQXMhiAaU/pub?w=929&amp;h=495">
<br/>
・REST APIによるデータ操作
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSWbjzYSUX5RGDVjq5zwdSQufpADG2X-B_knjjNMQ7UV_HG6FptJSSJXBigx7THxBJA6ekBea9Y9Jat/pub?w=928&amp;h=491">
<br/>
・Webhookによるイベント発火
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSugyFnlDGMm1ioXJmSzK7nxNxrx8JzkQaSeqbR3UAKtmSpWXTu52DhRiMSYLIyLdk9hpyvT0avCPod/pub?w=928&amp;h=489">

## 今回のkintoneカスタマイズのコード解説

今回はJavaScriptによる画面カスタマイズでボタンを配置して、ボタンを押すとherokuへリクエストが飛ぶようなカスタマイズを作っています。<br/>
kintone JavaScript APIを使うことでkintoneのデータを用いたリクエストを投げたりできるのでかなり便利です。

### 流れ

アラートの分岐などをしているので複雑になってしまいましたが、流れとしては

(メッセージ1件送信)

1. ボタンを配置
2. ボタンのクリックイベントで以下の処理をさせる
   1. 画面上のデータを取得する（heroku ID/メッセージ内容/LINE User ID）
   2. データを使ってメッセージを heroku に投げる

(メッセージ一括送信)

1. heroku ID入力用インプット要素/メッセージ入力用インプット要素/ボタン を配置
2. ボタンのクリックイベントで以下の処理をさせる
   1. インプット要素内の値を取得する（heroku ID/メッセージ内容）
   2. 一覧に表示されているレコードからLINE User IDを配列で取得する
   3. データを使ってメッセージを heroku に投げる

という感じで比較的シンプルです。あとはモバイル画面にも対応しているのでスマホ等でkintoneを開いても操作できます。

### コード全体

```javascript
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

  // メッセージを1件送信する処理
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

  // メッセージを一括送信する処理
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

```

重複した部分もベタ書きしているのでコードが長くなってしまっています m(_ _)m
