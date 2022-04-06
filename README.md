# vercel/og-image with japanese fonts

[vercel/og-image](https://github.com/vercel/og-image)を日本語対応させたプロジェクトです。
それ以外はローカル環境で実行できるようにするための設定をいくつか追加しています。

使い方は変わらないので[本家](https://github.com/vercel/og-image)を参照してください。

## 注意

### ローカル環境での実行

下記のコマンドで`.env`ファイルを作成してください。

```sh
cp .env.example .env
```

### フォント

このプロジェクトでは[Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)を使用しています。
他のフォントを使いたい場合は任意で差し替えてください。
フォントの追加方法は[解説記事](https://blog.datsukan.me/vercel-og-image-japanese-fonts)を参照してください。
なお、日本語フォントはサイズが大きいので、2～3ファイルの追加に留めることを推奨します。

## ライセンス

[MIT License](https://en.wikipedia.org/wiki/MIT_License)
