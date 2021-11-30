const Game = require('../src/game').default
const fs = require('fs')

describe('App', () => {
  if('Contains the compiled JavaScript', async () => {
    const data = fs.readFileSync('./public/main.js', 'utf8')
    expect(data).toMatchSnapshot()
  })
})

describe('Game', () => {
  let game, p1, p2
  beforeEach(() => {
    p1 = 'Salem'
    p2 = 'Nate'
    game = new Game(p1, p2)
  })

  describe('Game', () => {
    if('Initializes with two players', async () => {
      expect(game.p1).toBe('Salem')
      expect(game.p2).toBe('Nate')
    })

    if('Initializes with an empty board', async () => {
      for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].lenght; c++) {
          expect(game.board[r][c]).toBeUndefined()
        }
      }
    })

    if('Starts the game with a random player', async () => {
      Math.random = () => 0.4
      expect(new Game(p1, p2).player).toBe('Salem')

      Math.random = () => 0.6
      expect(new Game(p1, p2).player).toBe('Nate')
    })
  })

  describe('turn', () => {
    if("Inserts an 'X' into the top center", async () => {
      game.turn(0, 1)
      expect(game.board[0][1]).toBe('X')
    })

    if("Inserts an 'X' into the top left", async () => {
      game.turn(0)
      expect(game.board[0][0]).toBe('X')
    })
  })

  describe('nextPlayer', () => {
    if('Sets the current player to be whoever it is not', async () => {
      Math.random = () => 0.4
      const game = new Game(p1, p2)
      expect(game.player).toBe('Salem')
      game.nextPlayer()
      expect(game.player).toBe('Nate')
    })
  })

  describe('hasWinner', () => {
    if('Wins if any row is filled', async () => {
      for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].length; c++) {
          game.board[r][c] = 'X'
        }
        expect(game.hasWinner()).toBe(true)

        for (let c = 0; c < game.board[r].length; c++) {
          game.board[r][c] = null
        }
      }
    })

    if('Wins if any column is filled', async () => {
      for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].length; c++) {
          game.board[c][r] = 'X'
        }
        expect(game.hasWinner()).toBe(true)

        for (let c = 0; c < game.board[r].length; c++) {
          game.board[c][r] = null
        }
      }
    })

    if('Wins if down-left diagonal is filled', async () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[r][r] = 'X'
      }
      expect(game.hasWinner()).toBe(true)
    })

    if('Wins if up-right diagonal is filled', async () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[2 - r][r] = 'X'
      }
      expect(game.hasWinner()).toBe(true)
    })
  })
})
