<template>
    <div class="wrap">
        <div class="calendar" @keydown="handleKeydown" tabindex="0">
            <div class="legend">
                <div v-for="(type, index) in types" :key="index">
                    <label>
                        <input type="radio" :value="type" v-model="selectedStatus"/>
                        <span class="box" :class="type"></span> {{ type }}[{{ index + 1 }}]
                    </label>
                </div>
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
                            {{ day ? day.getDate() : '' }}
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
                <h3>已保存的状态</h3>
                <ul>
                    <li v-for="(status, name) in savedStatuses" :key="name">
                        <span class="name" @click="loadWorkStatus(name)">{{ name }}</span>
                        <button @click="deleteWorkStatus(name)">删除</button>
                        <button @click="renameWorkStatus(name)">重命名</button>
                    </li>
                </ul>
            </div>
            <div class="user-notice">
                <h3>使用方法</h3>
                <p>1. <strong>选择工作状态</strong>：从图例中选择 `公司`、`居家`、`休假` 或 `清除`。</p>
                <p>2. <strong>更新每日状态</strong>：点击任意日期以应用选定的状态。</p>
                <p>3. <strong>更新每周状态</strong>：将鼠标悬停在任意日期上，然后按 `1`（公司）、`2`（家）、 `3`（清除）、 `4`（休假），以将整周状态应用于选定的状态。</p>
                <p>4. <strong>浏览月份</strong>：点击左右箭头按钮浏览各个月份。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WorkCalendar',
        data() {
            return {
                currentDate: new Date(),
                monthNames: [
                    "一月", "二月", "三月", "四月", "五月", "六月",
                    "七月", "八月", "九月", "十月", "十一月", "十二月"
                ],
                weekdays: ["日", "一", "二", "三", "四", "五", "六"],
                workStatus: JSON.parse(localStorage.getItem('workStatus')) || {}, // Load work status from localStorage
                selectedStatus: 'office', // 默认选择公司
                hoveredDay: null, // 当前鼠标悬停的日期
                saveName: '', // 保存状态的名称
                savedStatuses: JSON.parse(localStorage.getItem('savedStatuses')) || {}, // Load saved statuses from localStorage
                types: ['office', 'home', 'clear', 'rest'] // 状态类型
            };
        },
        computed: {
            currentYear() {
                return this.currentDate.getFullYear();
            }
        },
        methods: {
            changeMonth(delta) {
                this.currentDate.setMonth(this.currentDate.getMonth() + delta);
                this.currentDate = new Date(this.currentDate);
            },
            dayClass(day) {
                if (!day) return 'no-status';
                const dateString = day.toISOString().split('T')[0];
                if (this.workStatus[dateString] === 'office') {
                    return 'office';
                } else if (this.workStatus[dateString] === 'home') {
                    return 'home';
                } else if (this.workStatus[dateString] === 'rest') {
                    return 'rest';
                }
                return 'no-status';
            },
            updateDayStatus(day) {
                if (!day) return;
                const dateString = day.toISOString().split('T')[0];
                if (this.selectedStatus === 'office') {
                    this.$set(this.workStatus, dateString, 'office');
                } else if (this.selectedStatus === 'home') {
                    this.$set(this.workStatus, dateString, 'home');
                } else if (this.selectedStatus === 'rest') {
                    this.$set(this.workStatus, dateString, 'rest');
                } else {
                    this.$set(this.workStatus, dateString, null);
                }
                localStorage.setItem('workStatus', JSON.stringify(this.workStatus)); // Save work status to localStorage
            },
            clearWorkStatus() {
                this.workStatus = {};
                localStorage.removeItem('workStatus');
            },
            saveWorkStatus() {
                if (!this.saveName) return;
                this.$set(this.savedStatuses, this.saveName, JSON.parse(JSON.stringify(this.workStatus)));
                localStorage.setItem('savedStatuses', JSON.stringify(this.savedStatuses));
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
                const firstDayOfWeek = days[0].getDay();
                const paddingDays = Array(firstDayOfWeek).fill(null);
                return paddingDays.concat(days);
            },
            setHoveredDay(day) {
                this.hoveredDay = day;
            },
            handleKeydown(event) {
                if (!this.hoveredDay) return;
                let status;
                switch (event.key) {
                    case '1':
                        status = 'office';
                        break;
                    case '2':
                        status = 'home';
                        break;
                    case '3':
                        status = null;
                        break;
                    case '4':
                        status = 'rest';
                        break;
                    default:
                        return;
                }
                this.updateWeekStatus(this.hoveredDay, status);
            },
            updateWeekStatus(day, status) {
                const startOfWeek = new Date(day);
                startOfWeek.setDate(day.getDate() - day.getDay());
                for (let i = 0; i < 7; i++) {
                    const currentDay = new Date(startOfWeek);
                    currentDay.setDate(startOfWeek.getDate() + i);
                    const dateString = currentDay.toISOString().split('T')[0];
                    this.$set(this.workStatus, dateString, status);
                }
                localStorage.setItem('workStatus', JSON.stringify(this.workStatus)); // Save work status to localStorage
            }
        },
        mounted() {
            this.$el.focus();
        }
    };
</script>

<style lang="scss" scoped>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  html,body{
    font-size: 13px;
  }
  button{
    padding:5px 8px;
    border-radius:5px;
    border:0 none;
    margin:0 5px;
    text-align: center;
  }
  .wrap {
    display: flex;
    justify-content: center;
    margin:0 auto;
    width:90%;
    font-size: 13px;
    .calendar {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width:60%;
      max-width: 600px;
      .legend {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        label {
          display: flex;
          align-items: center;
          .box {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            &.office {
              background-color: lightblue;
            }
            &.home {
              background-color: lightyellow;
            }
            &.rest {
              background-color: lightgreen;
            }
            &.clear, &.no-status {
              background-color: white;
              border: 1px solid #ccc;
            }
          }
        }
      }
      .months {
        display: flex;
        justify-content: space-between;
        .month {
          width: 48%;
          .month-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
          }
          .weekdays, .days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            div {
              padding: 10px;
              text-align: center;
              border: 1px solid #ddd;
            }
          }
          .days {
            div {
              cursor: pointer;
              user-select: none;
              &.office {
                background-color: lightblue;
              }
              &.home {
                background-color: lightyellow;
              }
              &.rest {
                background-color: lightgreen;
              }
              &.clear, &.no-status {
                background-color: white;
              }
            }
          }
        }
      }
    }
    .sider {
      width:320px;
      padding: 10px;
      margin-left:15px;
      .controls {
        margin: 0 -5px 10px;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        white-space: nowrap;
        input {
          margin-right: 5px;
          border-radius:5px;
          border:solid 1px #ccc;
          padding:5px 8px;
          flex: 1 1 auto;
          width:0;
        }
      }
      .saved-status {
        margin-bottom: 10px;
        border:solid 1px #ccc;
        text-align: left;
        padding:10px;
        border-radius:5px;
        ul {
          list-style: none;
          padding: 0;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin:5px -5px;
            .name{
              padding:5px 8px;
              border-radius:5px;
              border:0 none;
              margin:0 5px;
              text-align: center;
            }
            .name{
              background: #b1eaae;
              color: #055300;
              flex:1 1 auto;
              cursor:pointer;
            }
          }
        }
      }
      .user-notice {
        h3 {
          margin-bottom: 5px;
        }
        p {
          margin: 0 0 10px 0;
        }
        font-size: 12px;
        color:#777;
        text-align: left;
        margin-top:15px;
      }
    }
  }
</style>
