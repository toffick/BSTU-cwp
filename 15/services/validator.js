module.exports = {
    isValidId: (id) =>{
        return (id !== undefined && Number.isInteger(+id));
    },
    isFleetValid: (fleet) =>{
        return fleet.name !== undefined;
    },
    isVehicleValid: function (vehicle){
        return vehicle.name !== undefined && Number.isInteger((vehicle.fleetId));
    },
    isMotionValid: function (motion){
        return motion.latitude !== undefined && motion.longitude !== undefined
            && motion.time !== undefined && Number.isInteger(parseInt(motion.vehicleId));
    }
}