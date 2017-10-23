/*! @preserve
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Giulio Canti
 *
 */

// core
var t = require('./lib/assert.js');

// types
t.Any = require('./lib/Any.js');
t.Array = require('./lib/Array.js');
t.Boolean = require('./lib/Boolean.js');
t.Date = require('./lib/Date.js');
t.Error = require('./lib/Error.js');
t.Function = require('./lib/Function.js');
t.Nil = require('./lib/Nil.js');
t.Number = require('./lib/Number.js');
t.Object = require('./lib/Object.js');
t.RegExp = require('./lib/RegExp.js');
t.String = require('./lib/String.js');

// short alias are deprecated
t.Arr = t.Array;
t.Bool = t.Boolean;
t.Dat = t.Date;
t.Err = t.Error;
t.Func = t.Function;
t.Num = t.Number;
t.Obj = t.Object;
t.Re = t.RegExp;
t.Str = t.String;

// combinators
t.dict = require('./lib/dict.js');
t.declare = require('./lib/declare.js');
t.enums = require('./lib/enums.js');
t.irreducible = require('./lib/irreducible.js');
t.list = require('./lib/list.js');
t.maybe = require('./lib/maybe.js');
t.refinement = require('./lib/refinement.js');
t.struct = require('./lib/struct.js');
t.tuple = require('./lib/tuple.js');
t.union = require('./lib/union.js');
t.func = require('./lib/func.js');
t.intersection = require('./lib/intersection.js');
t.subtype = t.refinement;

// functions
t.assert = t;
t.update = require('./lib/update.js');
t.mixin = require('./lib/mixin.js');
t.isType = require('./lib/isType.js');
t.is = require('./lib/is.js');
t.getTypeName = require('./lib/getTypeName.js');
t.match = require('./lib/match.js');

module.exports = t;
