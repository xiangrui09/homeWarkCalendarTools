<template>
    <div class="edge">
        <div class="wrap">
            <div class="calendar" @keydown="handleKeydown" tabindex="0">
                <div class="tips">
                    按序号对应的数字键快速选择类别，并设置鼠标最后悬停日期状态 <br>
                    按 shift + 序号快速设置本周类别，并快速设置类别
                </div>
                <div class="legend">
                    <div
                            class="legend-item"
                            :class="type" v-for="(type, index) in types" :key="index">
                        <label>
                            <input type="radio" :value="type" v-model="selectedStatus"/>
                            <span class="box" :class="type == selectedStatus ? 'checked':''" ></span> {{ type }}[{{ index + 1 }}]
                        </label>
                    </div>
                    <button @click="goToToday">回到今天</button>
                </div>



                <div class="months">
                    <div class="month" v-for="(monthOffset, index) in [0, 1]" :key="index">
                        <div class="month-header">
                            <button @click="changeMonth(monthOffset === 0 ? -1 : 1)">&lt;</button>
                            <span>{{ monthNames[(currentDate.getMonth() + monthOffset) % 12] }} {{ currentYear }}</span>
                            <button @click="changeMonth(monthOffset === 0 ? -1 : 1)">&gt;</button>
                        </div>
                        <div class="weekdays">
                            <div v-for="day in weekdays" :key="day">{{ day }}</div>
                        </div>
                        <div class="days">
                            <div
                                    v-for="(day, index) in paddedDaysInMonth(currentDate.getMonth() + monthOffset)"
                                    :key="index"
                                    :class="dayClass(day)"
                                    @click="updateDayStatus(day)"
                                    @mouseenter="setHoveredDay(day)"
                            >
                                <span class="txt">{{ day ? day.getUTCDate() : '' }}</span>
                                <sup class="holiday-name" v-if="day && holidays[getDateString(day)]">
                                    {{ holidays[getDateString(day)] }}
                                </sup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sider">

                <div class="controls">
                    <button @click="clearWorkStatus">清除状态</button>
                    <input v-model="saveName" placeholder="保存名称"/>
                    <button @click="saveWorkStatus">保存状态</button>
                </div>
                <div class="saved-status">
                    <h3>已保存的工作计划</h3>
                    <ul>
                        <li v-for="(status, name) in savedStatuses" :key="name">
                            <span class="name" @click="loadWorkStatus(name)">{{ name }}</span>
                            <button @click="deleteWorkStatus(name)">删除</button>
                            <button @click="renameWorkStatus(name)">重命名</button>
                            <button @click="updateSavedWorkStatus(name)">更新</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <UserGuide />
    </div>
</template>

<script>
    import UserGuide from "@/components/UserGuide";
    import { holidays } from "@/data/holidays"; // 导入节假日数据
    import '@/styles/WorkCalendar.scss'; // 引入独立的 SCSS 文件

    export default {
        name: 'WorkCalendar',
        components: {
            UserGuide
        },
        data() {
            return {
                currentDate: new Date(),
                monthNames: [
                    "一月", "二月", "三月", "四月", "五月", "六月",
                    "七月", "八月", "九月", "十月", "十一月", "十二月"
                ],
                weekdays: ["一", "二", "三", "四", "五", "六", "日"],
                workStatus: JSON.parse(localStorage.getItem('workStatus')) || {}, // 从localStorage中加载工作状态
                selectedStatus: 'office', // 默认选择公司
                hoveredDay: null, // 当前鼠标悬停的日期
                saveName: '', // 保存状态的名称
                savedStatuses: JSON.parse(localStorage.getItem('savedStatuses')) || {}, // 从localStorage中加载保存的状态
                types: ['office', 'home', 'rest', 'clear'], // 状态类型
                holidays

            };
        },
        computed: {
            currentYear() {
                return this.currentDate.getFullYear();
            }
        },
        mounted() {
            window.addEventListener('keydown', this.handleKeydown);
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.handleKeydown);
        },
        methods: {
            getDateString(day) {
                return day.toISOString().split('T')[0];
            },
            changeMonth(delta) {
                this.currentDate.setMonth(this.currentDate.getMonth() + delta);
                this.currentDate = new Date(this.currentDate);
            },
            dayClass(day) {
                if (!day) return 'no-status';
                const dateString = this.getDateString(day);
                const classes = [];

                if (this.workStatus[dateString] === 'office') {
                    classes.push('office');
                } else if (this.workStatus[dateString] === 'home') {
                    classes.push('home');
                } else if (this.workStatus[dateString] === 'rest') {
                    classes.push('rest');
                } else {
                    const dayOfWeek = day.getDay();
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        this.workStatus[dateString] = 'rest'
                        classes.push('rest');
                    }else{
                        classes.push('no-status');
                    }
                }

                // 添加 holiday 类，如果当天是节假日
                if (holidays[dateString]) {
                    classes.push('holiday');
                }


                // 添加 today 类，如果当前日期是今天
                const today = new Date();
                const isToday = (
                    day.getDate() === today.getDate() &&
                    day.getMonth() === today.getMonth() &&
                    day.getFullYear() === today.getFullYear()
                );
                if (isToday) {
                    classes.push('today');
                }

                return classes.join(' ');
            },
            updateDayStatus(day) {
                if (!day) return;
                const dateString = this.getDateString(day);
                if (this.selectedStatus === 'office') {
                    this.$set(this.workStatus, dateString, 'office');
                } else if (this.selectedStatus === 'home') {
                    this.$set(this.workStatus, dateString, 'home');
                } else if (this.selectedStatus === 'rest') {
                    this.$set(this.workStatus, dateString, 'rest');
                } else {
                    this.$set(this.workStatus, dateString, null);
                }
                localStorage.setItem('workStatus', JSON.stringify(this.workStatus)); // 保存工作状态到localStorage
            },
            clearWorkStatus() {
                this.workStatus = {};
                localStorage.removeItem('workStatus');
            },
            saveWorkStatus() {
                if (!this.saveName) return;
                // 检查已保存的工作计划数量是否已达到限制
                if (Object.keys(this.savedStatuses).length >= 5) {
                    alert('保存的工作计划数量已达到上限（5个）。');
                    return;
                }
                this.$set(this.savedStatuses, this.saveName, JSON.parse(JSON.stringify(this.workStatus)));
                localStorage.setItem('savedStatuses', JSON.stringify(this.savedStatuses));
                this.clearWorkStatus(); // 清除当前日历视图
            },
            loadWorkStatus(name) {
                this.workStatus = JSON.parse(JSON.stringify(this.savedStatuses[name]));
                localStorage.setItem('workStatus', JSON.stringify(this.workStatus));
            },
            deleteWorkStatus(name) {
                this.$delete(this.savedStatuses, name);
                localStorage.setItem('savedStatuses', JSON.stringify(this.savedStatuses));
            },
            renameWorkStatus(oldName) {
                const newName = prompt('输入新的名称:', oldName);
                if (!newName || newName === oldName) return;
                this.$set(this.savedStatuses, newName, this.savedStatuses[oldName]);
                this.$delete(this.savedStatuses, oldName);
                localStorage.setItem('savedStatuses', JSON.stringify(this.savedStatuses));
            },
            updateSavedWorkStatus(name) {
                this.$set(this.savedStatuses, name, JSON.parse(JSON.stringify(this.workStatus)));
                localStorage.setItem('savedStatuses', JSON.stringify(this.savedStatuses));
                this.clearWorkStatus(); // 清除当前日历视图
            },
            daysInMonth(month) {
                const year = this.currentYear;
                const date = new Date(year, month, 1);
                const days = [];
                while (date.getMonth() === month) {
                    days.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }
                return days;
            },
            paddedDaysInMonth(month) {
                const days = this.daysInMonth(month);
                const firstDayOfWeek = (days[0].getDay() + 6) % 7; // 调整使星期一为每周的第一天
                const paddingDays = Array(firstDayOfWeek).fill(null);

                // 如果有 paddingDays，那么在第一个星期一之前填充
                if (paddingDays.length > 0) {
                    const prevMonthDays = this.daysInMonth(month - 1).slice(-paddingDays.length);
                    return prevMonthDays.concat(days);
                }

                return paddingDays.concat(days);
            },
            setHoveredDay(day) {
                this.hoveredDay = day;
            },
            handleKeydown(event) {
                if (!this.hoveredDay) return;
                // 检查是否按下了组合键
                if (event.shiftKey) {

                    switch (event.key) {
                        case '!':
                            this.selectedStatus = 'office';
                            break;
                        case '@':
                            this.selectedStatus = 'home';
                            break;
                        case '#':
                            this.selectedStatus = 'rest';
                            break;
                        case '$':
                            this.selectedStatus = null;
                            break;
                        default:
                            return;
                    }
                    this.updateWeekStatus(this.hoveredDay, this.selectedStatus);

                    return; // 组合键处理完后直接返回
                }


                switch (event.key) {
                    case '1':
                        this.selectedStatus = 'office';
                        break;
                    case '2':
                        this.selectedStatus = 'home';
                        break;
                    case '3':
                        this.selectedStatus = 'rest';
                        break;
                    case '4':
                        this.selectedStatus = null;
                        break;
                    default:
                        return;
                }
                this.updateDayStatus(this.hoveredDay,this.selectedStatus)

            },
            updateWeekStatus(day, status) {
                const startOfWeek = new Date(day);
                startOfWeek.setDate(day.getDate() - ((day.getDay() + 6) % 7)); // 调整使星期一为每周的第一天
                for (let i = 0; i < 7; i++) {
                    const currentDay = new Date(startOfWeek);
                    currentDay.setDate(startOfWeek.getDate() + i);
                    // const dateString = currentDay.toISOString().split('T')[0];
                    const dateString = this.getDateString(currentDay);

                    // console.log(status, this.workStatus[dateString], status !== null, !status);
                    // if (this.workStatus[dateString] === undefined && status !== null) {
                    //     this.$set(this.workStatus, dateString, status);
                    // }
                    this.$set(this.workStatus, dateString, status);
                }
                localStorage.setItem('workStatus', JSON.stringify(this.workStatus)); // 保存工作状态到localStorage
            },
            goToToday() {
                this.currentDate = new Date(); // 将 currentDate 设置为今天的日期
                // 这里你可能还需要添加其他逻辑来确保日历视图正确更新
            },
        }
    };
</script>

<style scoped lang="scss"></style>
