# dsh-mobile-friendly

English | [中文](#中文)

Mobile-friendly display adaptation layer for the **DeepSeek Harness** Web GUI — a client plugin that makes the Settings dialog usable on phones.

- Injects the missing `viewport` meta (`width=device-width, initial-scale=1, viewport-fit=cover`) — without it, mobile browsers render the page on a ~980px virtual viewport and no responsive rule can ever match
- Settings dialog: full-bleed panel, the 188px left nav column becomes a horizontal scrolling strip at the top, content takes the full width below
- Touch targets ≥ 44px, long label/value rows wrap instead of clipping
- Pure CSS — zero runtime cost, no MutationObserver, nothing phone-hostile
- Selectors match stable CSS-module suffix fragments (`_panel`, `_nav`, `_content`) and documented anchors (`data-slot="settings.general.item"`), so they survive host rebuilds that reshuffle build hashes
- All rules live inside `@media (max-width: 640px)` — desktop is untouched
- Uninstall/HMR removes the injected style with the plugin (proper Cordis effect disposer)

## Install

```sh
dsh plugin --profile web add github:youluo1230/dsh-mobile-friendly
```

Or, for the desktop app profile:

```sh
dsh plugin --profile desktop add github:youluo1230/dsh-mobile-friendly
```

Then restart the app (or `dsh web`) and refresh the page.

## Manual install

Copy the package into your profile's `node_modules/dsh-mobile-friendly`, add `"dsh-mobile-friendly"` to the profile `package.json` → `dsh.profile.bundles`, and restart.

## Compatibility

- DeepSeek Harness desktop (`dsh-desktop-host`) and `dsh web` profiles
- Requires the client-plugin module system (`dsh.client` declaration, `exports["./client"]`) — present in current DSH releases
- MIT

---

## 中文

**DeepSeek Harness** Web GUI 的移动端显示适配层（客户端插件），让设置弹窗在手机上真正可用。

- 注入缺失的 `viewport` meta —— 没有它手机浏览器按 ~980px 虚拟视口渲染，任何响应式规则都不会命中
- 设置弹窗：全屏化，左侧 188px 导航列变为顶部横向滚动条，内容区占满下方全宽
- 触控目标 ≥ 44px，长标签行自动换行不裁切
- 纯 CSS 实现，零运行时开销
- 选择器走稳定后缀匹配（`_panel`/`_nav`/`_content`），宿主升级重排哈希也不失效
- 全部规则限定在 `@media (max-width: 640px)`，桌面端零影响

## 安装

```sh
dsh plugin --profile web add github:youluo1230/dsh-mobile-friendly
# 桌面版：
dsh plugin --profile desktop add github:youluo1230/dsh-mobile-friendly
```

装完重启应用并刷新页面。也可手动复制到 profile 的 `node_modules/` 并加入 `dsh.profile.bundles`。

## 提交到插件市场

欢迎向 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 目录提交 PR，让插件市场可以一键安装。
