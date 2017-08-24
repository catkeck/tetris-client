class TetrisAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/tetris'
  }

  getGames() {
    return fetch(this.baseUrl)
    .then(res => res.json()).then(res => this.renderGames(res))
  }

  renderGames(res) {
    let games = res.map( function(game) {
      return `
      <li>${game.name}: ${game.score}</li>
      `
    }).join('')
    $('#past-scores').html(`<h3>All Scores:</h3><ul>${games}</ul>`)

  }

  createGame(stats) {
    const gameCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({stats})
    }
    return fetch(this.baseUrl, gameCreateParams).then(resp => resp.json())
  }


}