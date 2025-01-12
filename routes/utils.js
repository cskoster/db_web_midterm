


module.exports = {

  // taken from:
  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value/16174180#comment31549267_1129270
  // nice.
  compare: function (a, b) {
    if (a.date_event < b.date_event) {
      return -1;
    }
    if (a.date_event > b.date_event) {
      return 1;
    }
    return 0;
  },


  /**Pass in a date object i. dateObject = new Data() 
   * Returns date in: yyyy-mm-ddThh:mm format
  */

  formatDate: function (dateObject) {
    let d = dateObject.toJSON();

    let splitDate = d.split(":");
    let newDate = splitDate[0] + ":" + splitDate[1];
    return newDate;
  }

};
