// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // create rowSum/count/total = 0;
      var rowSum = 0;

      // loop through rowIndex (board[r] === [0,1,0])
      for (var i = 0; i < rowIndex.length; i++) {
      //    rowSum += board[r][i]
        rowSum += rowIndex[i];
      }
      // rowSum > 1 ? true : false
      return rowSum > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      // loop through rows (board)
      for (var i = 0; i < Object.keys(this.attributes).length - 1; i++) {
        if (this.hasRowConflictAt(this.attributes[i])) {
          return true;
        }
      }
      // if (this.hasRowConflictAt(rowIndex)) (rowIndex === board[i])
      //      return true

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // create count/total = 0
      var count = 0;

      // loop through first index of each row/ column (column === board[r][i])
      for (var r = 0; r < Object.keys(this.attributes).length - 1; r++) {
        //    count += board[r][i]
        count += this.attributes[r][colIndex];
      }

      // count > 1 ? true : false
      return count > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // loop through columns (column === board[r][i])
      for (var r = 0; r < Object.keys(this.attributes).length - 1; r++ ) {
        if (this.hasColConflictAt(r)) {
          return true;
        }
      }
      //    pass each colIndex to 'hasColConflictAt'
      //    set returnValue equal to the result
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // INPUT: [ROW, COLUMN];
      // var row = majorDiagonalColumnIndexAtFirstRow[0];
      // var col = majorDiagonalColumnIndexAtFirstRow[1];
      // var board = this.attributes;
      // create count/total = board[row][col];
      var row = majorDiagonalColumnIndexAtFirstRow[0];
      var col = majorDiagonalColumnIndexAtFirstRow[1];
      var board = this.attributes;
      var count = board[row][col];

      // loop through board
      //    check if board coordinates has value
      //      adding value to count

      for (var i = 0; i < Object.keys(board).length - 2; i++) {
        if (row !== (board.n - 1)) {
          var coordinate = board[row + 1][col + 1];
          if (coordinate) {
            count += board[row + 1][col + 1];
          }
          row++;
          col++;
        }
      }

      // count > 1 ? true : false;
      return count > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // loop through every row
      //    loop through every col
      //       if'hasMajorDiagonalConflictAt' ([row,col])
      //          return true
      var board = this.attributes;
      for (var r = 0; r < Object.keys(board).length - 1; r++) {
        for (var c = 0; c < Object.keys(board).length - 2; c++) {
          if (this.hasMajorDiagonalConflictAt([r, c])) {
            return true;
          }
        }
      }
      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // INPUT: [ROW, COLUMN];
      // var row = majorDiagonalColumnIndexAtFirstRow[0];
      // var col = majorDiagonalColumnIndexAtFirstRow[1];
      // var board = this.attributes;
      // create count/total = board[row][col];

      // loop through board
      //    check if board coordinates has value    //    row--, col--
      //        if row/col is negative              //  return 0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //      adding value to count
      // count > 1 ? true : false;

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // loop through every row
      //    loop through every col
      //       if'hasMinorDiagonalConflicts' ([row,col])
      //          return true
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
