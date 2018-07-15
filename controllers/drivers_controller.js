const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: 'dist.calculated',
          includeLocs: 'dist.location',
          maxDistance: 200000,
          spherical: true

        }
    }
  ])
      .then(drivers => res.send(drivers))
      .catch(next)
  },

  create(req, res, next) {
    driver = new Driver(req.body);
    driver.save()
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndUpdate({ _id: driverId }, req.body )
      .then(() => Driver.findById({ _id: driverId}))
      .then((driver) => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    Driver.findByIdAndRemove({ _id: driverId})
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
