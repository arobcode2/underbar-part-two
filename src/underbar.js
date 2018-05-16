(function() {
  'use strict';
  window._ = {};
  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
    _.identity = function(val) {
    /* START SOLUTION */
    return val;
    /* END SOLUTION */
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    /* START SOLUTION */
    // When the input n not is provided, we return a single value from the array,
    // rather than an array of values
    if (n === undefined) {
      return array[array.length - 1];
    }
    return array.slice(Math.max(0, array.length - n));
    /* END SOLUTION */
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    /* START SOLUTION */
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
    /* END SOLUTION */
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    /* START SOLUTION */
    var result = [];

    _.each(collection, function(val) {
      test(val) && result.push(val);
    });

    return result;
    /* END SOLUTION */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    /* START SOLUTION */
    return _.filter(collection, function(val) {
      return !test(val);
    });
    /* END SOLUTION */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    /* START SOLUTION */
    var hash = {};

    iterator = (isSorted && iterator) || _.identity;

    _.each(array, function(val) {
      var transformed = iterator(val);
      if (hash[transformed] === undefined) {
        hash[transformed] = val;
      }
    });

    return _.map(hash, function(value) {
      return value;
    });
    /* END SOLUTION */
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    /* START SOLUTION */
    var results = [];

    _.each(collection, function(item, index, collection) {
      results.push(iterator(item, index, collection));
    });

    return results;
    /* END SOLUTION */
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    /* START SOLUTION */
    var initializing = arguments.length === 2;

    _.each(collection, function(val) {
      if (initializing) {
        initializing = false;
        accumulator = val;
      } else {
        accumulator = iterator(accumulator, val);
      }
    });

    return accumulator;
    /* END SOLUTION */
  };

  // Determine if the array or object contains a given value (using `===`).
  //inputs: 1 collection (array or object), target
  //outputs: 1 boolean
  //constraints: n/a
  //edge cases: empty collection, or a collection that is not an array or object
  //transformations: collection = ['book', 'magazine', 'newspaper'], target = 'newspaper' is target in collection? => true
  //collection = {'item1': 'ball', 'item2': 'rope', 'item3': 'slide'}, traget = 'swing' is target in collection => false
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    /* START SOLUTION */
    for (var i in collection) {
      if (target === collection[i]) {
        return true;
      }
    }
    return false;
    /* END SOLUTION */
  };


  // Determine whether all of the elements match a truth test.
  //inputs: collection (array, object), a function (iterator)
  //outputs: 1 boolean
  //constraints: n/a
  //edge cases: empty array or object, what if the collection is neither an object or array
  //transformation: collection = [2, 4, 6, 8], iterator = function(num) {return num % 2 === 0;} => true
  //collection = [2, 4, 5, 6, 8], iterator = function(num) {return num % 2 === 0;} => false
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    /* START SOLUTION */
    var output = [];
    var result = true;
    iterator = iterator || _.identity;
    _.each(collection, function(item) {
      output.push(iterator(item));
    });
    _.each(output, function(element) {
      if (!element) {
        result = false;
      }
    });
    return result;
    /* END SOLUTION */
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  //transformations: collection = [2, 4, 5, 6, 8], iterator = function(num) {return num % 2 === 0;} => true
  //collection = [1, 3, 5, 7, 9], iterator = function(num) {return num % 2 === 0;} => false
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    /* START SOLUTION */
    iterator = iterator || _.identity;
    for (var i in collection) {
      if (iterator(collection[i])) {
        return true;
      }
    }
    return false;
    /* END SOLUTION */
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //inputs: 1 object is passed in, second or third arguments are objects if passed in
  //outputs: 1 object
  //constraints: n/a
  //edge cases: if the name of the key is all the same should it add the same key name as a different property or add an extra value into the same one key
  //_.extend({'food1': 'muffin'}, {'food2': 'croissant', 'food3: 'danish'}) => {'food1': 'muffin', 'food2': 'croissant', 'food3': 'danish'}
  /*
  destination = {'food1': 'muffin'}, source = {'food2': 'croissant', 'food3: 'danish'}, {'food4': 'bagel'}
  */
  _.extend = function(obj) {
    /* START SOLUTION */
    //access the properties in the passed in arguments (objects other than the base obj)
    _.each(arguments, function(object) {
      for (var key in object) {
        //move properties to the base object
        obj[key] = object[key];
      }
    });
    //return base object
    return obj;
    /* END SOLUTION */
  };
  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    /* START SOLUTION */
    _.each(arguments, function(object) {
      for (var key in object) {
        if (!(key in obj)) {
          obj[key] = object[key];
        }
      }
    });
    return obj;
    /* END SOLUTION */
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  //inputs: 1 function is passed in
  //outputs: returns value from the return value in the passed in function
  //edge cases: what if the passed in function has no return value, what if a func is not passed in
  //transformations: func = function multiply(num) {return num * 2;};
  //multiply(6); returns 12
  //multiply(7); return 12
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    /* START SOLUTION */
    //create var to store return value of passed in func
    var value;
    //make a var called isCalled and set to false
    var isCalled = false;
      //if the function is called the first time
      return function() {
        if (isCalled === false) {
        //invoke the passed in function
        value = func.apply(null, arguments);
        //set isCalled to true
        isCalled = true;
        }
       //return stored value of first invocation of passed in func
       return value;
      };
    /* END SOLUTION */
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  //transformations: func = function quotient(num) {return num / 2;}; storage = {quotient(16): 8}
  //quotient(16) returns 8
  //quotient(18)  => storage = {quotient(16): 8, quotient(18): 9}
  //quotient(18) returns 9
 _.memoize = function(func) {
    /* START SOLUTION */
    //create an object to store results of passed in function
    var storage = {};
    //if result has been computed
    return function() {
      var key = JSON.stringify(arguments);
      if (storage[key]) {
        //return result from results storage var
        return storage[key];
      }
      //invoke the passed in function
      storage[key] = func.apply(null, arguments);
      //return result and store that result into the storage
      return storage[key];
      };
    /* END SOLUTION */
    // _.momoize(function a(2,3,4,5,6) {return x * 2})
    // _.memoize(function b([2,3,4,5,6]) {return y / 2})
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  //inputs: passing 1 function as first arg, and a number (number of milliseconds the function will wait to invoke the passed in function)
  //outputs: returns the given function
  //constraints: n/a
  //edge cases: what if the passed in function doesn't return anything
  //transformations: _.delay(someFunction, 500, 'a', 'b') => someFunction will take the arguments 'a' and 'b' and someFunction will be invoked after 500 milliseconds
  _.delay = function(func, wait) {
    /* START SOLUTION */
    //store arguments (that passed in function may take) in a var
    var args = [...arguments].slice(2);
    //call setTimeout with proper parameters
    return setTimeout(function() {
      //calls the function
      func.apply(null, args);
    }, wait);
    /* END SOLUTION */
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  //inputs: 1 array is passed in
  //outputs: 1 array is returned
  //assumptions: the output of the function may be the same array as the array contents are re-positioned randomly
  //constaints: only 1 array (only an array) can be passed in
  //edge cases: array can consist of all primitive data types, should work for mixed arrays: [2, true. [2, 3, 4], 'cheese'] 
  //transformations: array = [2, true. [2, 3, 4], 'cheese'] => [[2, 3, 4], true, 'cheese', 2]
  //process: swap elements at random index with another element at a random index- array = [1,2,3,4,5], indicies = 0, 1, 2, 3, 4, array[ranNum] = array[ranNum]
  _.shuffle = function(array) {
    /* START SOLUTION */
    //make an empty
    // var randomizedValues = []; //[2]
    // var index = []; // ['used','used',2,3,4]
    // for (var i = 0; i < array.length; i++) {
    //   index.push(i);
    // }

    // //iterate through passed in array
    // while (randomizedValues.length < array.length) {
    //   var ranNum = Math.floor(Math.random() * Math.floor(array.length)); 
    //   //push element at random index into empty array
    //   if(index[ranNum] !== 'used') {
    //     randomizedValues.push(array[ranNum]);
    //     index.splice(ranNum, 1, 'used');
    //   }
    // }
    // //return empty (randomized) array
    // return randomizedValues;

    //use slice to make a copy of passed in array
    //make a random index numbers array first by using a for loop
    // if array.length === 7 => 7 items 4,6,3,2,5,1,7 
    
    var arrayCopy = array.slice();
    var swappedEl;
    //[1, 2, 3], swappedEl = 1,  ranNum = 2, [3, 2, 1], ranNum = 0, swappedEl = 3, [2, 3, 1]
    for (var i = 0; i < arrayCopy.length; i++) {
      var ranNum = Math.floor(Math.random() * Math.floor(array.length));
      swappedEl = arrayCopy[i];
      arrayCopy[i] = arrayCopy[ranNum];
      arrayCopy[ranNum] = swappedEl;
    }
    return arrayCopy;
    /* END SOLUTION */
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  //inputs: 1 collection (array or object), method name, optional arguments
  //outputs: 1 collection is returned (however the output value depends on the return value of the method applied on the collection)
  //constraints: collection and functionOrKey must be passed in, the method must work on both arrays and objects
  //edge cases: some methods require the collection to be passed in to the method as arguments and other do not (i.e. collection.sort())
  //transformations: collection: [1, 2, 3, 4], functionOrKey = length, output: 4
  //collection: [4, 1, 2, 3], functionOrKey = sort, output: [1, 2, 3, 4]
  //collection: [1, 2, 3, 4], functionOrKey = slice, args = 1, output: [2, 3, 4]
  _.invoke = function(collection, functionOrKey, args) {
    /* START SOLUTION */
    //
    /* END SOLUTION */
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    /* START SOLUTION */

    /* END SOLUTION */
  };
}());
