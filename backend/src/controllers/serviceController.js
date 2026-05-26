const Service = require("../models/serviceModel");

// GET all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// OPTIONAL: Create a service
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ service });
  } catch (err) {
    res.status(500).json({ message: "Failed to create service" });
  }
};

module.exports = {
  getServices,
  createService
};
