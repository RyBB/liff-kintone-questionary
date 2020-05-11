# 動作チェック①

kintone側の動作チェックを行います。

## データの確認

アンケートで入力されたデータは **LINE連携アンケートアプリ** に登録されていくようになっています。<br/>
このアプリを開いてデータが一覧表示されていれば成功です。<br/>
また、一覧の一番左のノートマークを選択すると1つのデータの詳細を見ることができます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRQfmlfZviYxix7VZoW3XJueU6IZwhVfcDzRQ6dQJ3Bu9ROVhMH3GjRHxfThUewej7dVjmi1XjYibet/pub?w=925&amp;h=609">

## 過去データとの比較

複数回アンケートに回答してもらった場合、過去のデータと比較をしたいと思います。<br/>
**関連レコード一覧** を使うことである条件に関連したデータを表示させることが可能です。<br/>
<br/>
今回はLINE User IDが同じデータを表示させるように条件を設定しています。<br/>
<img src="https://docs.google.com/drawings/d/e/2PACX-1vTEOyhAkQLM168sWBL1vtioNL3hCank_9uS_oPeCt5muCcSlrAPunp4HhPE9_vYS0njoHOPDW3MB89F/pub?w=920&amp;h=158">
（LINE User IDはユニークな値、かつ同アカウントで共通なので条件として最適です）

## データに紐付いたやりとり

kintoneではデータ1つ1つに対して **コメント** が残せます。<br/>
データに対してコミュニケーションが取れるので、データの2次利用がしやすいのも特徴です。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRlRUwtFdFQ428tqINwJwF0I76j8iPqyk-BRc02rk5rpi5em2uGc0Non2FPdMrHR7lSAHQfqhdynQ8Y/pub?w=929&amp;h=349">

## グラフの確認・作成

一覧画面のアイコンからあらかじめ作成されているグラフに切り替えることができます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQjoYmYu6napc_mvdyjKv2QyhzQNOVoeaAK-FupUNiC1hRHGul5iG-Mi79P0Exubxd3BVNQB_sYERId/pub?w=782&amp;h=520">
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSs8i4e9cYmJzy9YdaFAz67_jc0Wks7bkVCpdJ26LCpjkUDkOVIHg14jIqbpv2-koicUNd_eQDGznqM/pub?w=825&amp;h=530">
<img src="https://docs.google.com/drawings/d/e/2PACX-1vR_PcSnCPM1SsWy6aSTg0C0WkD9a-k3kKC5O9aKX2xiVZtz6lfbA8mg5fiMzO4KO_9vEuuhI0VNecj7/pub?w=922&amp;h=617">

また、自分で好きなグラフを作成することもできます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQt2nb5bNFNXaP9vWY0VtOeEHbUlQggkOewljrzUOwr3o9b9KTiuJ7I_WAWCKfL9we9XQUOBo20aZ0R/pub?w=821&amp;h=495">
<img src="https://docs.google.com/drawings/d/e/2PACX-1vR9TeqaUCY8XEc13mFwSOQ_vHd1OwTjQR9OPW3FGJyKgtz-vUf9Q3iZO8x7MtjcoBmV8xm08b5cAhoy/pub?w=914&amp;h=611">
<br/>

## サンプルデータ

グラフを作るためにはあらかじめいくつかデータがないと見栄えが良くないので、<br/>
こちらでサンプルデータのCSVを用意しました。

<font color="red">**サンプルデータにはLINE User IDが含まれていないので、動作チェック②を終えた後にやるといいかもです！**</font>

[こちら](https://github.com/RyBB/liff-kintone-questionary/releases)から **sampleData.csv** をダウンロードして、kintoneへインポートしてください。

一覧画面の右側にある「…」より **ファイルから読み込む** を選択します。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQpciYjPgGcs6abovgZGjUZBKN3fTGiKA47LMfia5V3KHekaUbOLx59N2D06U33lLltNueFyOxgtc6s/pub?w=926&amp;h=621">
ダウンロードしたCSVを読み込んで、上部にある「読み込む」を選択すればデータが読み込まれます。
<br/>
<br/>
以上でkintoneの標準機能の動作チェックは完了です!<br/>
グラフ作成の他に **一覧に表示するデータの絞り込み** も可能です。<br/>
次はkintoneカスタマイズの動作チェックを行います。
