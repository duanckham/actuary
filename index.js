const async = require('async');

function mixParameters(parameters) {
  return parameters.reduce((item, property) => {
    return property.reduce((accumulator, param) => {
      return accumulator.concat(item.map(p => [].concat(p, param)));
    }, []);
  });
}

module.exports = (parameters, equation, referee, concurrency = 10) => {
  let parametersCollection = mixParameters(parameters);
  let bestGrade = 0;
  let bestParameters = [];
  
  let queue = async.queue((context, callback) => {
    equation(...context.parameters, result => context.done(callback)(result));
  }, concurrency);

  parametersCollection.forEach(_parameters => {
    queue.push({
      parameters: _parameters,
      done: callback => {
        return result => {
          if (!bestParameters.length || referee(bestGrade, result)) {
            bestGrade = result;
            bestParameters = _parameters;
          }

          callback();
        };
      },
    });
  });

  return new Promise(resolve => {
    queue.drain = () => {
      resolve(bestParameters);
    };
  });
};