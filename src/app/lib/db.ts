import Column from '../models/column';

class DB {
  getBoard(): Column[] {
    return JSON.parse(window.localStorage.getItem('board'));
  }

  setBoard(board: Column[]) {
    window.localStorage.setItem('board', JSON.stringify(board));
  }
}

const db = new DB();
export default db;
