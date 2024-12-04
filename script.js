document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate-btn");
  const result = document.getElementById("result");
  const calendarView = document.getElementById("calendar-view");

  // 读取配置文件和节假日数据
  let holidays = [];
  let config = {};

  fetch('holiday-data.json').then(res => res.json()).then(data => holidays = data.holidays);
  fetch('config.json').then(res => res.json()).then(data => config = data);

  // 点击按钮进行计算
  calculateBtn.addEventListener("click", () => {
    const startDate = new Date(document.getElementById("start-date").value);
    const days = parseInt(document.getElementById("days").value, 10);

    const optionA = document.getElementById("option-a").checked;
    const optionB = document.getElementById("option-b").checked;
    const optionC = document.getElementById("option-c").checked;

    if (isNaN(startDate.getTime()) || isNaN(days)) {
      result.textContent = "请正确填写起始日期和天数";
      return;
    }

    const endDate = calculateWorkEndDate(startDate, days, optionA, optionB, optionC);
    result.textContent = `终点日期：${endDate.toISOString().slice(0, 10)}`;
    updateCalendar(startDate, endDate);
  });

  // 计算终点日期
  function calculateWorkEndDate(startDate, days, optionA, optionB, optionC) {
    let current = new Date(startDate);
    let workDaysCount = 0;

    while (workDaysCount < days) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay();
      const dateStr = current.toISOString().slice(0, 10);

      // 判断是否为工作日
      const isWorkday =
        (day !== 0 || optionB) &&  // 周日是否为工作日
        (day !== 6 || optionA) &&  // 周六是否为工作日
        (!holidays.includes(dateStr) || optionC); // 节假日是否为工作日

      if (isWorkday) workDaysCount++;
    }

    return current;
  }

  // 更新日历视图
  function updateCalendar(startDate, endDate) {
    calendarView.innerHTML = ''; // 清空视图

    const current = new Date(startDate);
    current.setDate(1);

    while (current <= endDate) {
      const dateStr = current.toISOString().slice(0, 10);
      const isHoliday = holidays.includes(dateStr);
      const day = current.getDay();
      const dateBox = document.createElement("div");
      dateBox.className = "date-box";

      if (isHoliday) {
        dateBox.classList.add("holiday");
      } else if (day !== 0 && day !== 6) {
        dateBox.classList.add("workday");
      }

      dateBox.textContent = current.getDate();
      calendarView.appendChild(dateBox);
      current.setDate(current.getDate() + 1);
    }
  }
});
