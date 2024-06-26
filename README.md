# work-calendar

这是一个用 Vue.js 构建的简单工作日历应用。它允许用户按日跟踪工作状态（公司、居家或清除），并且可以使用键盘快捷键更新整周的状态。

## 功能

- **图例**：从图例中选择工作状态（公司、居家或清除）。
- **月视图**：查看和浏览月份。
- **每日状态更新**：点击任意日期以更新其状态。
- **每周状态更新**：鼠标悬停在某个日期上，按 `1`、`2` 或 `3` 来将整周状态更新为公司、居家或清除。
- **本地存储**：工作状态保存在本地存储中，因此数据在页面重新加载时保持不变。

## 安装

1. 克隆仓库：

    ```sh
    git clone https://github.com/yourusername/work-calendar.git
    cd work-calendar
    ```

2. 安装依赖：

    ```sh
    npm install
    ```

3. 启动开发服务器：

    ```sh
    npm run serve
    ```

4. 在浏览器中打开应用 `http://localhost:8080`。

## 使用方法

1. **选择工作状态**：
   - 从图例中选择 **公司**、**居家**、**休假** 或 **清除**。
   - 对应的选项将显示为带有不同背景色的方框：**公司**（浅蓝色）、**居家**（浅黄色）、**休假**（浅绿色）、**清除**（白色）。
2. **更新每日状态**：
   - 点击任意日期以应用选定的状态。
3. **更新每周状态**：
   - 将鼠标悬停在任意日期上，然后按以下按键：
   - 按 `1`：将整周状态设置为 **公司**。
   - 按 `2`：将整周状态设置为 **居家**。
   - 按 `3`：将整周状态设置为 **清除**。
   - 按 `4`：将整周状态设置为 **休假**。
4. **浏览月份**：
   - 点击月份旁边的左右箭头按钮以浏览各个月份。
5. **清除状态**：
   - 点击“清除状态”按钮以清除当前日历中的所有工作状态。
   - 清除操作将同时删除本地存储中的日历状态数据。
6. **保存状态**：
   - 在输入框中输入保存名称，点击“保存状态”按钮以保存当前设置的日历状态。
   - 保存后的状态将显示在“已保存的工作计划”列表中。
7. **加载已保存的状态**：
   - 点击“已保存的工作计划”列表中的某个名称，以加载并应用保存的日历状态。
8. **更新已保存的状态**：
   - 点击某个已保存状态旁边的“更新”按钮，将当前修改的日历状态更新到相应的保存项。
9. **删除已保存的状态**：
   - 点击“已保存的工作计划”列表中的“删除”按钮以删除对应的保存项。
10. **重命名已保存的状态**：
   - 点击“已保存的工作计划”列表中的“重命名”按钮，以重命名对应的保存项。
11. **注意事项**：
   - 保存和更新操作将清除当前日历视图。
   - 周视图的设置范围为周一到周日。

### 功能描述

- **选择工作状态**：选择并设置某一天的工作状态，方便直观的状态管理。
- **周视图快捷键**：通过快捷键快速设置一周的工作状态，提高效率。
- **状态保存与加载**：支持将不同的日历设置保存为模板，并随时加载，方便不同场景切换。
- **本地存储**：所有设置都保存在浏览器的本地存储中，确保刷新或关闭页面后数据不丢失。

## 许可证

此项目依据 MIT 许可证授权。详细信息请参见 [LICENSE](LICENSE) 文件。

---

感谢你使用工作日历！如果有任何问题或反馈，请在 GitHub 上提交 issue。
