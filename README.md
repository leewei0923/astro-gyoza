# Gyoza

Gyoza is a static blog template built with Astro and React.

![astro version](https://img.shields.io/badge/astro-4.6-red)
![node version](https://img.shields.io/badge/node-18.18-green)

Demo Site:

- [gyoza.lxchapu.com](https://gyoza.lxchapu.com)
- [www.lxchapu.com](https://www.lxchapu.com)

Enjoy it!

## 📷 Screenshots

![Preview](https://s2.loli.net/2024/05/06/A9rzC3Uym7RwdQc.webp)

## 🎉 Features

- ✅ 有着规范的 URL 和 OpenGraph 信息，对 SEO 友好
- ✅ 支持站点地图
- ✅ 支持 RSS 订阅
- ✅ 支持夜间模式
- ✅ 特殊日期变灰
- ✅ 简单干净的配色和主题
- ✅ 支持评论系统
- ✅ 支持代码高亮

## 🔧 Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Jotai](https://jotai.org/)

## 📖 Documentation

前往：[Documentation](https://gyoza.lxchapu.com/posts/guide)

## 💬 Comments

文章评论由 [giscus](https://giscus.app/zh-CN) 和 GitHub Discussions 提供支持。启用评论前：

1. 将评论仓库设为公开并启用 Discussions。
2. 为仓库安装 [giscus App](https://github.com/apps/giscus)。
3. 创建 `Announcements` 类型的 Discussion 分类。
4. 在 giscus 配置页获取 `repoId` 和 `categoryId`，填入 `src/config.json` 的 `giscus` 配置。

评论使用文章 slug 作为稳定标识。只有 frontmatter 中 `comments: true` 的文章会显示评论区。

## 🚀 Project Structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── plugins/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   └── config.json
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

网站配置保存在 `config.json` 文件。

## 🧞 Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm i`       | Installs dependencies                        |
| `pnpm dev`     | Starts local dev server at `localhost:4321`  |
| `pnpm build`   | Build your production site to `./dist/`      |
| `pnpm preview` | Preview your build locally, before deploying |
| `pnpm format`  | Format code using Prettier                   |
