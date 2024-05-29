<template>
    <div class="calendar" @keydown="handleKeydown" tabindex="0">
        <div class="legend">
            <div>
                <label>
                    <input type="radio" value="office" v-model="selectedStatus" />
                    <span class="box office"></span> office[1]
                </label>
            </div>
            <div>
                <label>
                    <input type="radio" value="home" v-model="selectedStatus" />
                    <span class="box home"></span> home[2]
                </label>
            </div>
            <div>
                <label>
                    <input type="radio" value="clear" v-model="selectedStatus" />
                    <span class="box no-status"></span> clear[3]
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
                hoveredDay: null // 当前鼠标悬停的日期
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
                } else {
                    this.$set(this.workStatus, dateString, null);
                }
                localStorage.setItem('workStatus', JSON.stringify(this.workStatus)); // Save work status to localStorage
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
  .calendar {
    display: inline-block;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
          &.no-status {
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
            width:22px;
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
            &.no-status {
              background-color: white;
            }
          }
        }
      }
    }
  }
</style>

