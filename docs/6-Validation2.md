# 動作チェック②

kintoneからLINEへメッセージを送る動作チェックを行います。

## 1件送信

配布したkintoneアプリにはあらかじめJavaScriptによるカスタマイズが仕込まれてます。<br/>
<br/>
一覧からどれかのデータの一番左のノートアイコンを選択して詳細画面を開きます。<br/>
右側のペンマークを選択することで、データの編集画面に移ります。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vTuou7UaszkEOV8FrNTbbxXY9EMq4UYpV81WkMERQHgzbKOdh_b3w6hsI8w_Ad0v3sMlLinCXub2zkF/pub?w=926&amp;h=603">

herokuのID、メッセージ内容を記載します。<br/>
<font color="red">herokuのIDは **ldc-20200511-** 以降のみを記載してください。</font>
<img src="https://docs.google.com/drawings/d/e/2PACX-1vR-lWIWHq1HveZffVzvVBfcSxjfacjafBqbDClGgFetTDevDdGm1HK9W_cWHAN4ntmOi0ticFN1xpyh/pub?w=917&amp;h=613">

保存ボタンを選択して「メッセージ送信」ボタンを押すと、LINE宛にメッセージが送信されます。

## 一括送信

上記は宛先1つに対してメッセージを送信するカスタマイズでしたが、
それ以外にも **複数の宛先に一括でメッセージを送信** するカスタマイズも仕込んでいます。<br/>
<br/>
一覧画面から、一覧を **一括送信用** に切り替えます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRLfGNwtufcSmBn8-rzS_rZ_j71orYTDe4I3of1G0-wM4TnGb-h2If8EXmJGI6UI6lllHz5qqZ_p3cx/pub?w=925&amp;h=602">

herokuのIDとメッセージを入力して「メッセージ一括送信」ボタンを押すことですでに登録された宛先全員に対してメッセージを送ることができます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSQ7wDLjoASJFg7j2y7yq392XFgwTT9qGcX-gSzNVqpROOsQ3ogAI_KhuLS6Z28JP6HbRZCufq2r4HG/pub?w=926&amp;h=597">

### 一括送信の宛先絞り込み

宛先を絞り込みたい場合は、kintoneの **絞り込み機能** を使うことで簡単に絞り込めます。<br/>
<br/>
一覧画面から漏斗マークを選択して、条件を入力します。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vROIVNguDK9DRX2F5PHwXCpOKs_wiAPHL3G-WPZfey-R-YYMkVOfL4bX2B3iRKLNoolxpYtQTBimzwK/pub?w=928&amp;h=607">

これで一覧に表示されるデータが条件にマッチしたものだけになるので、上記の一括送信をすることで表示された宛先のみにメッセージを送信することができます。
<br/>
<br/>
以上でkintoneカスタマイズの動作チェックは完了です！<br/>