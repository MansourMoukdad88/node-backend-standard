const uuid = require("uuid/v4");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous shy scrapers in the world!",
    imageUrl:
      "https://res.cloudinary.com/drbgxq5pt/image/fetch/f_auto,q_auto:eco/https%3A%2F%2Fwww.kitano.com%2Fresourcefiles%2Fsnippet-main-img%2Fempire-state-building-in-new-york-top.jpg%3Fmimdevice%3Dmobile",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp!!! State Building",
    description: "One of the most famous shy scrapers in the world!",
    imageUrl:
      "https://res.cloudinary.com/drbgxq5pt/image/fetch/f_auto,q_auto:eco/https%3A%2F%2Fwww.kitano.com%2Fresourcefiles%2Fsnippet-main-img%2Fempire-state-building-in-new-york-top.jpg%3Fmimdevice%3Dmobile",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  // console.log(req.params);

  const placeId = req.params.pid; // { pid: 'p1}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Cound not find a place for the porvided id.", 404);
  }

  res.json({ place }); // => { place: place}
};

const getPlaceByUserId = (req, res, next) => {
  // console.log(req.params);

  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Cound not find a place for the porvided user id.", 404)
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  console.log(req.params);
  const { title, description, coordinates, address, creator } = req.body;
  // const title = req.body.title;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace); // unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
