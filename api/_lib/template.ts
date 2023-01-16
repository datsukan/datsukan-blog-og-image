import { readFileSync } from "fs"
import { marked } from "marked"
import * as cheerio from "cheerio"
import { sanitizeHtml } from "./sanitizer"
import { ParsedRequest } from "./types"
const twemoji = require("twemoji")
const twOptions = { folder: "svg", ext: ".svg" }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64")
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
)
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
)

const tofuBold = readFileSync(
  `${__dirname}/../_fonts/Noto_Sans_JP/NotoSansJP-Bold.woff2`
).toString("base64")
const tofuMedium = readFileSync(
  `${__dirname}/../_fonts/Noto_Sans_JP/NotoSansJP-Medium.woff2`
).toString("base64")
const tofuLight = readFileSync(
  `${__dirname}/../_fonts/Noto_Sans_JP/NotoSansJP-Light.woff2`
).toString("base64")

function getCss() {
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
    }

    @font-face {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 700;
        src: url(data:font/otf;charset=utf-8;base64,${tofuBold}) format('woff2');
    }

    @font-face {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 500;
        src: url(data:font/otf;charset=utf-8;base64,${tofuMedium}) format('woff2');
    }

    @font-face {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 300;
        src: url(data:font/otf;charset=utf-8;base64,${tofuLight}) format('woff2');
    }

    body {
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: 'Noto Sans JP', sans-serif;
    }

    .frame {
        width: 1200px;
        height: 630px;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo {
        margin: 0 75px;
    }`
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md, emoji, publishedAt } = parsedReq
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com?plugins=line-clamp"></script>
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="frame p-12 bg-gradient-to-tr from-green-200 to-blue-200">
            <div class="px-16 py-14 h-full w-full bg-white rounded-3xl shadow-xl flex flex-col justify-between">
                <div class="flex flex-col items-center justify-center gap-3">
                    <img src="${twemojiURL(emoji)}" class="w-24 h-24">
                    <div class="my-6">
                    <p>${twemojiURL(emoji)}</p>
                    <p class="max-h-52 text-5xl text-gray-800 font-bold leading-normal line-clamp-3">
                        ${emojify(md ? marked(text) : sanitizeHtml(text))}
                    </p>
                    </div>
                </div>
                <div class="w-full flex justify-between items-center">
                    <div class="text-2xl text-gray-500 font-bold">${publishedAt}</div>
                    <div class="flex items-center gap-4">
                        <div class="rounded-full overflow-hidden w-14 h-14">
                            <img src="https://datsukan.me/_next/image?url=%2Fimages%2Favatar.jpg&w=96&q=75" />
                        </div>
                        <span class="text-2xl text-gray-800 font-bold">datsukan</span>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`
}

function twemojiURL(emoji: string) {
  const baseUrl =
    "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/"
  const html = twemoji.parse(emoji, {
    folder: "svg",
    ext: ".svg",
    base: baseUrl,
  })
  const $ = cheerio.load(html)
  const url = $("img").attr("src")

  return url
}
