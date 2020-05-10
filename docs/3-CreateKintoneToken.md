# URL/アプリIDの確認と認証トークンの生成

外部からkintoneにアクセスするためには、

- URL（サブドメイン）
- アプリID
- 認証情報

の3つが必要になります。画面上ですべて確認・生成できるので簡単です！

## URL

kintoneは環境ごとに異なるサブドメインを含むURLを持っています。<br/>
URL部分の `https://{subdomain}.cybozu.com` の **{subdomain}** 部分がサブドメインです。<br/>
<br/>
後ほどheroku上で利用するので、`{subdomain}.cybozu.com`部分をメモしておいてください。

## アプリID

kintone上にはいわゆるデータベースのテーブルとして **アプリ** を複数作成することができます。<br/>
先ほど作成した **LINE連携アンケートアプリ** を開くと、URLに `https://{subdomain}.cybozu.com/k/XXXX` と番号がついています。<br/>
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRKcTxsZYQwUmPtcVqaJ0a5A_RCKp2IiaQZxmSDmHE129otTtiHxI902qNEpWp5bxgJeJ8gCucr9gKm/pub?w=778&amp;h=343">
この数字が **アプリID** となります。こちらも後ほどheroku上で利用するので、数字をメモしておいてください。

## 認証トークンの生成

認証方法にはいくつか方法がありますが、今回はトークンを生成してそれを利用します。<br/>
**LINE連携アンケートアプリ** を開いて画面左真ん中あたりの **歯車マーク** を選択してアプリの設定画面を開きます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSsA7_GZ1kY_jpkp85z1bEmSA2hHIzOzXyp57KlPAj2-PYx65X1A8ksZ-kYlHRz7P9UD1lau7oejjK0/pub?w=926&amp;h=405">

設定タブを選択して、中央にある **APIトークン** を選択します。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSqcutgCYRGhAcStL6fqYLoM5y91IPV3Wykya9zGyteK_-A4q2jcs5DPavgjzELbNyyjmMErjXfd3HD/pub?w=926&amp;h=623">

「生成する」ボタンを選択してトークンを生成します。右側のチェック全てにチェックをつけてください。<br/>
そして左側にある英数字の羅列が **認証トークン** となります。こちらも後ほどheroku上で利用するので、メモしておいてください。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQryOs0f9sDieAImYVdcguxuhon6C7ciYQ5jSKv6-iLJtpWeyWcAgekKGTDq2VX7D6r1i9Oziat5D3C/pub?w=926&amp;h=530">

そして最後に「保存」ボタンを選択した後に **アプリを更新** を選択します。<br/>
<font color="red">**必ず更新ボタンを選択してください。更新しないとトークン生成が反映されません。**</font>
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRaq_ovbc-fXXy0rX6V0L173qMiRhQDCtlqH_gV7Ue967g5NDyv4t7DPQu8Rfz7tYqOq_-OkAWUvc9Y/pub?w=928&amp;h=622">
<br/>
<br/>
以上で連携に必要な認証情報などの用意は完了です!<br/>
次はLINE側の設定に移ります。