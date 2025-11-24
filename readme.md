# Daily

温暖手写风的情侣日记小应用。技术栈：React + Vite、Tailwind CSS、Framer Motion、Lucide React；数据仅存 localStorage。

## 初始化命令
```bash
# 1) 创建 Vite + React 项目（已备好，可直接跳过）
npm create vite@latest daily -- --template react

# 2) 进入目录并安装依赖
cd daily
npm install

# 3) 安装 Tailwind（依赖已写入 package.json，可直接用）
npx tailwindcss init -p

# 4) 启动开发服务器
npm run dev
```
> 当前仓库已包含全部文件，直接 `npm install && npm run dev` 即可。

## 运行
```bash
npm install
npm run dev
```
浏览器打开终端提示的本地地址即可预览。

## 项目结构
```
Daily/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/globals.css
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── Calendar.jsx
│   │   ├── EntryModal.jsx
│   │   ├── MoodSelector.jsx
│   │   ├── PhotoUploader.jsx
│   │   ├── MemoriesSidebar.jsx
│   │   ├── StickyNote.jsx
│   │   ├── PolaroidCard.jsx
│   │   └── Drawer.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useGreeting.js
│   │   └── useAnniversaries.js
│   ├── constants/
│   │   ├── moods.js
│   │   └── anniversaries.js
│   └── utils/
│       ├── dateUtils.js
│       └── imageUtils.js
└── assets/
    ├── textures/paper.png
    ├── stickers/tape.png
    └── icons/heart.svg
```

## 设计要点
- 背景：暖米色纸纹理，轻噪点，柔和阴影与大圆角
- 文案与色彩：深棕/灰文字，无纯黑；暖粉、鼠尾草点缀
- Polaroid 相框 + 轻微随机旋转；Framer Motion 心跳动画
- 本地存储：日记、心情、图片均存 localStorage，无后端依赖