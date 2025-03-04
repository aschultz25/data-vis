let starWarsData
let barGraph

class BarGraph {
  constructor(x, y, w, h, data) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.data = data
    this.barWidth = w / (Object.keys(data).length * 1.5)
  }

  draw() {
    stroke(0)
    line(this.x, this.y + this.h, this.x + this.w, this.y + this.h)
    line(this.x, this.y, this.x, this.y + this.h)

    for (let i = 0; i <= 10; i++) {
      let yPos = map(i, 0, 10, this.y + this.h, this.y)
      textSize(12)
      textAlign(RIGHT, CENTER)
      text((i * 10) + '%', this.x - 30, yPos)
    }

    let movieNames = Object.keys(this.data)
    for (let i = 0; i < movieNames.length; i++) {
      let movie = movieNames[i]
      let imdbRating = this.data[movie].IMDb
      let rtRating = this.data[movie]["Rotten Tomatoes"]

      let imdbBarHeight = map(imdbRating, 0, 100, 0, this.h)
      let rtBarHeight = map(rtRating, 0, 100, 0, this.h)

      let barX = this.x + i * this.barWidth * 1.5

      fill(0, 0, 255, 150)
      rect(barX + 5, this.y + this.h - imdbBarHeight, this.barWidth / 2 - 10, imdbBarHeight)

      fill(255, 0, 0, 150)
      rect(barX + this.barWidth / 2 + 5, this.y + this.h - rtBarHeight, this.barWidth / 2 - 10, rtBarHeight)

      fill(0)
      textSize(12)
      textAlign(CENTER, CENTER)
      text(movie, barX + this.barWidth / 2, this.y + this.h + 15)

      if (mouseX >= barX && mouseX <= barX + this.barWidth * 1.5) {
        if (mouseY >= this.y + this.h - imdbBarHeight && mouseY <= this.y + this.h) {
          fill(0)
          textSize(12)
          text(`IMDb: ${imdbRating}%`, barX + this.barWidth / 2, this.y + this.h + 30)
        }
        if (mouseY >= this.y + this.h - rtBarHeight && mouseY <= this.y + this.h) {
          fill(0)
          textSize(12)
          text(`Rotten Tomatoes: ${rtRating}%`, barX + this.barWidth / 2, this.y + this.h + 45)
        }
      }
    }

    textSize(16)
    textAlign(CENTER, CENTER)
    text('Star Wars Movie Ratings Comparison', this.x + this.w / 2, this.y - 20)

    textSize(12)
    textAlign(CENTER, CENTER)
    text('IMDb Rating = blue', this.x + this.w / 2, this.y + this.h + 60)
    text('Rotten Tomatoes Rating = red', this.x + this.w / 2, this.y + this.h + 80)
  }
}

function setup() {
  createCanvas(800, 500)
  loadJSON('star_wars_ratings.json', (data) => {
    starWarsData = data
    barGraph = new BarGraph(50, 50, 700, 350, starWarsData)
  })
}

function draw() {
  background(255)
  if (barGraph) {
    barGraph.draw()
  }
}
