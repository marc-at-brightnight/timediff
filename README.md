# index
Calculate a time difference in several time units.

## Usage

```sh
$ npm install @marc-maniac/timediff
```

```js
var index = require('lib/index');

index('2015-01-01', '2018-05-02 02:15:10.777', 'YDHms');
// => { years: 3, days: 121, hours: 2, minutes: 15, milliseconds: 10777 }
```

## Examples

```js
// return the index in all possible units
index(new Date(2015, 1, 1), new Date('2018-05-02 02:15:10'));
// => { years: 3, months: 3, weeks: 0, days: 1, hours: 2, minutes: 15, seconds: 10, milliseconds: 0 }

// return the index only in years, weeks, days hours and seconds
index(new Date(2015, 1, 1), new Date('2018-05-02 02:15:10.777'), 'YWDHS');
// => { years: 3, weeks: 12, days: 6, hours: 2, seconds: 910 }

// return the index only in month, minutes seconds, and milliseconds
index(new Date(2015, 1, 1), new Date('2018-05-02 02:15:10.777'), 'MmSs');
// => { months: 39, minutes: 1575, seconds: 10, milliseconds: 777 }

// provide the result to a callback and return the result of the callback
index('1969-06-09T06:09:06.069Z', new Date(), function (result) {
    var strings = [];
    for (var key in result) {
        strings.push(result[key] + ' ' + key);
    }
    return 'age: ' + strings.join(', ');
});
// => 'age: 45 years, 7 months, 0 weeks, 6 days, 5 hours, 54 minutes, 5 seconds, 257 milliseconds'

// combine all options
var christmas = new Date();
christmas.setMonth(11);
christmas.setDate(24);
index(new Date(), christmas, {
    units: 'MWD',
    returnZeros: false,
    callback: function (result) {
        return 'Time until christmas: ' + JSON.stringify(result);
    }
});
// => 'Time until christmas: {"months":11,"weeks":1,"days":1}'
```

## API

### index(start, end, options)

Return the time difference between `start` and `end`. Use only the units specified in `options`.

Return:
```js
{
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
}
```

#### start, end

*Required*
Type: `string` | `Date` | `moment`

#### options

Type: `object` | `string` | `function`

Default:
```js
{
  units: {
    years:true,
    months: true,
    weeks: true,
    days: true,
    hours: true,
    minutes: true,
    seconds: true,
    milliseconds: true
  },
  returnZeros: true,
  callback: null
}
```

Use `index(start, end, unitString)` (where `unitString` is a string) as a shortcut for
`index(start, end, {units: unitString})`.

Use `index(start, end, callback)` (where `callback` is a function) as a shortcut for
`index(start, end, {callback: callback})`.

##### options.units

Type: `object` | `string`
  
Can be an object as given above or a string containing any of `YMWDHmSs`.
If a letter exists in the string the corresponding unit is used in
the result.

| letter | result uses  |
| ------ | -------------|
| Y      | years        |
| M      | months       |
| W      | weeks        |
| D      | days         |
| H      | hours        |
| m      | minutes      |
| S      | seconds      |
| s      | milliseconds |

##### options.returnZeros

Type: boolean

If `true` result can contain fields that are `0`, if `false` they are removed.

##### options.callback

Type: `function`

Function that is called with the result of index as the first parameter.
index returns the return value of this callback.

## Licence
MIT copyright [Marco Taubmann]
