export class Judge {
  constructor (props) {
    // todo
    this._input = props.input || ''
    this._output = props.output || ''
    if (Array.isArray(this._input)) {

    }
    if (Array.isArray(this._output)) {

    }
    this.result = null
    this._judgedProgram = {
      path: props.path,
      result: null
    }
  }

  async exec () {
    // judge
    // to judge

    // after exec
    this.result = this._judgedProgram.result
  }

  _loadFiles (files) {
    // todo
    // load strings from files
  }
}

export default Judge
