![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# GitHub Copilot 實戰工作坊：待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，提供日常任務管理、主題切換與清單篩選功能。

## 線上展示

[開啟待辦清單 App](https://nailong1216.github.io/My1stCopilotWorkshop/)

## 功能

- 新增待辦事項、標記完成或未完成，以及刪除單筆項目。
- 顯示整體未完成項目數量，並以 `localStorage` 保存待辦資料。
- 依「全部」、「未完成」或「已完成」篩選，並提供相應的空清單提示。
- 切換淺色與深色模式；記住手動選擇，未手動設定時跟隨作業系統偏好。
- 清除所有已完成項目；執行前要求確認，沒有已完成項目時按鈕停用。
- 支援窄螢幕版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript，沒有引入框架或套件。
- 以 CSS 變數管理介面配色，並支援 `prefers-color-scheme`。
- 以瀏覽器 `localStorage` 保存待辦資料與主題偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode 協助逐步完成 App 功能，並在修改前確認計畫。
- 使用 Microsoft Learn MCP 查詢官方文件，並使用 GitHub MCP 讀取 issue 與建立 Pull Request。
- 透過 `.github/copilot-instructions.md` 設定專案協作規則，並以 `.github/prompts/fix-issue.prompt.md` 重複執行 issue 修正流程。

## 我學到什麼

- 用 HTML、CSS 與原生 JavaScript 組成互動式待辦清單。
- 使用 `localStorage` 保存資料，並讓介面與儲存狀態保持同步。
- 以 CSS 變數和 `prefers-color-scheme` 支援不同色彩主題。
- 依 issue 描述規劃修改、驗證行為，並透過分支與 Pull Request 管理變更。
- 使用 MCP 查詢文件與 GitHub issue，並以 prompt 建立可重複的工作流程。