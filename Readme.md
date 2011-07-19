# What's this ?

*connect-stats* is a [connect](https://github.com/senchalabs/connect) middleware that provides some realtime statistics like moving average and moving median (using P² quantile). This project is heavily inspired by boost::accumulator, cluster-live and connect profiler.

If you just want the moving average/median, check the `Accumulator` class. To implement a different function, check the `null.js` stub.

## WIP

The goal is to evolve this into a proper panel, with shiny graphs.

## License
MIT
