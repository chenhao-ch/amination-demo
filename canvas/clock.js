const clock = {
  init(ctx, x, y, r) {
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.canvasWidth = 2 * x;
    this.canvasHeight = 2 * y;
  },
  draw(hour, minute, second) {
    if(this.hour === hour && this.minute === minute && this.second === second) {
      return;
    }

    this.hour = hour;
    this.minute = minute;
    this.second = second;

    const ctx = this.ctx;

    ctx.save();
    // 清空canvas
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // 移动到比较中心的位置开始绘制
    ctx.translate(this.x, this.y - 30);
    // 角度选择-45度，使12点显示到正上方
    ctx.rotate(- Math.PI / 2);
    // 线的两端使用圆形
    ctx.lineCap = 'round';

    // 绘制时钟
    this.drawClock();
    // 绘制时针，分针，秒针
    this.drawHour(hour);
    this.drawMinute(minute);
    this.drawSecond(second);

    // 时钟绘制完毕后，角度转45度，还原成原先状态。
    ctx.rotate(Math.PI / 2);
    // 绘制时间文字
    this.drawText(hour, minute, second);

    this.ctx.restore();
  },
  drawClock() {
    const ctx = this.ctx;

    // 绘制时钟的最外面的圆
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, this.r, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // 绘制小时的刻度
    ctx.save();
    ctx.lineWidth = 6;
    for(let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI * 2 / 12);
      ctx.moveTo(Math.floor(this.r * 8 / 10), 0);
      ctx.lineTo(Math.floor(this.r * 9 / 10), 0);
      ctx.stroke();
    }
    ctx.restore();

    // 绘制分钟刻度
    ctx.save();
    ctx.lineWidth = 2;
    for(let j = 0; j < 60; j++) {
      ctx.beginPath();
      ctx.rotate(Math.PI * 2 / 60);
      ctx.moveTo(Math.floor(this.r * 8.5 / 10), 0);
      ctx.lineTo(Math.floor(this.r * 9 / 10), 0);
      ctx.stroke();
    }
    ctx.restore();

    // 绘制时钟中间的指针固定的圆
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  },
  drawHour(hour) {
    hour = hour % 12;
    const width = Math.floor(this.r * 0.5);
    const ctx = this.ctx;

    ctx.save();
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.rotate(Math.PI * 2 * hour / 12);
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.restore();
  },
  drawMinute(minute) {
    minute = minute % 60;
    const width = Math.floor(this.r * 0.65);
    const ctx = this.ctx;

    ctx.save();
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rotate(Math.PI * 2 * minute / 60);
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.restore();
  },
  drawSecond(second) {
    second = second % 60;
    const width = Math.floor(this.r * 0.8);
    const ctx = this.ctx;

    ctx.save();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.strokeStyle = '#aa0000';
    ctx.rotate(Math.PI * 2 * second / 60);
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.restore();
  },
  drawText(hour, minute, second) {
    const format = (d) => {
      return `${d > 9 ? '' : 0}${d}`;
    };
    hour = format(hour);
    minute = format(minute);
    second = format(second);

    const text = `${hour} : ${minute} : ${second}`;
    const ctx = this.ctx;
    ctx.font = '20px serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, this.r + 50);
  }
};
