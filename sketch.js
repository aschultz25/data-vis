let starWarsData

function preload() {
  starWarsData = loadJSON('star_wars_ratings.json')
}

function setup() {
  createCanvas(1500, 700)
  noLoop()
  textAlign(CENTER, CENTER)
}

function draw() {
  background(220)

  let margin = 50
  let chartWidth = width - 2 * margin
  let chartHeight = height - 2 * margin

  stroke(0);
  line(margin, height - margin, width - margin, height - margin)
  line(margin, margin, margin, height - margin)

  for (let i = 0; i <= 10; i++) {
    let y = map(i, 0, 10, height - margin, margin)
    textSize(12)
    text((i * 10) + '%', margin - 30, y)
  }

  let movies = Object.keys(starWarsData)
  let barWidth = chartWidth / movies.length

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let imdbRating = starWarsData[movie].IMDb
    let rtRating = starWarsData[movie]["Rotten Tomatoes"]

    let imdbBarHeight = map(imdbRating, 0, 100, 0, chartHeight)
    let rtBarHeight = map(rtRating, 0, 100, 0, chartHeight)

    let x = margin + i * barWidth

    fill(0, 0, 255, 150)
    rect(x + 5, height - margin - imdbBarHeight, barWidth / 2 - 10, imdbBarHeight)

    fill(255, 0, 0, 150)
    rect(x + barWidth / 2 + 5, height - margin - rtBarHeight, barWidth / 2 - 10, rtBarHeight)

    textSize(10)
    fill(0)
    text(movies[i], x + barWidth / 4, height - margin + 10)
  }

  textSize(16)
  text('Star Wars Movie Ratings Comparison', width / 2, margin - 20)

  textSize(12)
  fill(0)
  text('IMDb Rating = Blue', width / 2, height - margin + 30)
  textSize(12)
  text('Rotten Tomatoes Rating = Red', width / 2, height - margin + 50)
}