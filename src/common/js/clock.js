export default function clockCanvas(id) {
  const FONT_HEIGHT = 15
  const MARGIN = 35
  const SPACING = 20
  class ClockCanvas {
    constructor(id) {
      this.canvas = document.getElementById(id)
      this.context = this.canvas.getContext('2d')
      // 系列参数
      this.RADIUS = this.canvas.width/2 - MARGIN
      this.HAND_RADIUS = this.RADIUS + SPACING
      this.HAND_TRUCATION = this.canvas.width / 25
      this.HAND_HOUR_TRUCATION = this.canvas.width / 10
    }
    drawCircle() {
      this.context.beginPath()
      this.context.arc(this.canvas.width/2, this.canvas.height/2, this.RADIUS, 0, Math.PI*2, true)
      this.context.stroke()
    }
    drawNumerals() {
      var numeralist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], angel = 0, numeralWidth = 0
      numeralist.forEach(v => {
        angel = Math.PI/6 * (v - 3)
        numeralWidth = this.context.measureText(v).width
        this.context.fillText(v,
          this.canvas.width / 2 + Math.cos(angel) * this.HAND_RADIUS - numeralWidth / 2,
          this.canvas.height / 2 + Math.sin(angel) * this.HAND_RADIUS + FONT_HEIGHT / 3
        )
      })
    }
    drawCenter() {
      this.context.beginPath()
      this.context.arc(this.canvas.width/2, this.canvas.height/2, 5, 0, Math.PI*2, true)
      this.context.fill()
    }
    drawHand(loc, isHour) {
      let angel = (Math.PI * 2 ) * (loc / 60) - Math.PI / 2
      let handRadius = isHour ? this.RADIUS - this.HAND_TRUCATION - this.HAND_HOUR_TRUCATION
                              : this.RADIUS - this.HAND_TRUCATION
      this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2) // 画线
      this.context.lineTo(this.canvas.width / 2 + Math.cos(angel) * handRadius, this.canvas.height / 2 + Math.sin(angel) * handRadius)
      this.context.stroke()
    }
    drawHands() {
      let date = new Date(), hour = date.getHours()
      hour = hour > 12 ? hour - 12 : hour
      this.drawHand(hour * 5, (date.getMinutes()/60) * 5, true, 0.5)
      this.drawHand(date.getMinutes(), false, 0.5)
      this.drawHand(date.getSeconds(), false, 0.2)
    }
    drawClock() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.font = FONT_HEIGHT + 'px Arial'
      this.drawCircle()
      this.drawCenter()
      this.drawHands()
      this.drawNumerals()
    }
  }
  return new ClockCanvas(id)
}
