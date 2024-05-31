<template>
    <div class="user-guide">
        <h2>使用方法</h2>
        <ol>
            <li>
                <strong>选择工作状态</strong>：
                <ul>
                    <li>从图例中选择 <span class="status-box office">公司</span>、<span class="status-box home">居家</span>、<span
                            class="status-box rest">休假</span> 或 <span class="status-box clear">清除</span>。
                    </li>
                    <li>对应的选项将显示为带有不同背景色的方框：<span class="status-box office">公司</span>（浅蓝色）、<span
                            class="status-box home">居家</span>（浅黄色）、<span class="status-box rest">休假</span>（浅绿色）、<span
                            class="status-box clear">清除</span>（白色）。
                    </li>
                </ul>
            </li>
            <li>
                <strong>更新每日状态</strong>：
                <ul>
                    <li>点击任意日期以应用选定的状态。</li>
                </ul>
            </li>
            <li>
                <strong>更新每周状态</strong>：
                <ul>
                    <li>将鼠标悬停在任意日期上，然后按以下按键：</li>
                    <li>按 <kbd>1</kbd>：将整周状态设置为 <span class="status-box office">公司</span>。</li>
                    <li>按 <kbd>2</kbd>：将整周状态设置为 <span class="status-box home">居家</span>。</li>
                    <li>按 <kbd>3</kbd>：将整周状态设置为 <span class="status-box clear">清除</span>。</li>
                    <li>按 <kbd>4</kbd>：将整周状态设置为 <span class="status-box rest">休假</span>。</li>
                </ul>
            </li>
            <li>
                <strong>浏览月份</strong>：
                <ul>
                    <li>点击月份旁边的左右箭头按钮以浏览各个月份。</li>
                </ul>
            </li>
            <li>
                <strong>清除状态</strong>：
                <ul>
                    <li>点击“清除状态”按钮以清除当前日历中的所有工作状态。</li>
                    <li>清除操作将同时删除本地存储中的日历状态数据。</li>
                </ul>
            </li>
            <li>
                <strong>保存状态</strong>：
                <ul>
                    <li>在输入框中输入保存名称，点击“保存状态”按钮以保存当前设置的日历状态。</li>
                    <li>保存后的状态将显示在“已保存的工作计划”列表中。</li>
                </ul>
            </li>
            <li>
                <strong>加载已保存的状态</strong>：
                <ul>
                    <li>点击“已保存的工作计划”列表中的某个名称，以加载并应用保存的日历状态。</li>
                </ul>
            </li>
            <li>
                <strong>更新已保存的状态</strong>：
                <ul>
                    <li>点击某个已保存状态旁边的“更新”按钮，将当前修改的日历状态更新到相应的保存项。</li>
                </ul>
            </li>
            <li>
                <strong>删除已保存的状态</strong>：
                <ul>
                    <li>点击“已保存的工作计划”列表中的“删除”按钮以删除对应的保存项。</li>
                </ul>
            </li>
            <li>
                <strong>重命名已保存的状态</strong>：
                <ul>
                    <li>点击“已保存的工作计划”列表中的“重命名”按钮，以重命名对应的保存项。</li>
                </ul>
            </li>
            <li>
                <strong>注意事项</strong>：
                <ul>
                    <li>保存和更新操作将清除当前日历视图。</li>
                    <li>周视图的设置范围为周一到周日。</li>
                </ul>
            </li>
        </ol>
        <h3>功能描述</h3>
        <ul>
            <li>
                <strong>选择工作状态</strong>：选择并设置某一天的工作状态，方便直观的状态管理。
            </li>
            <li>
                <strong>周视图快捷键</strong>：通过快捷键快速设置一周的工作状态，提高效率。
            </li>
            <li>
                <strong>状态保存与加载</strong>：支持将不同的日历设置保存为模板，并随时加载，方便不同场景切换。
            </li>
            <li>
                <strong>本地存储</strong>：所有设置都保存在浏览器的本地存储中，确保刷新或关闭页面后数据不丢失。
            </li>
        </ul>
    </div>
</template>

<script>
    import '@/styles/UserGuide.scss'; // 引入独立的 SCSS 文件
    export default {
        name: 'UserGuide'
    };
</script>

