const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkoutDb = () => {
  return DB.workouts;
};

const getOneWorkoutDb = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  if (!workout) {
    return;
  }
  return workout;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    return;
  }
  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};

const updateOneWorkoutDb = (newWorkoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === newWorkoutId
  );

  if (indexForUpdate === -1) {
    return;
  }

  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updateAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;
};

const deleteOneWorkoutDb = (newWorkout) => {
  const indexForDelete = DB.workouts.findIndex(
    (workout) => workout.id === newWorkout
  );

  if (indexForDelete === -1) {
    return;
  }

  DB.workouts.splice(indexForDelete, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllWorkoutDb,
  getOneWorkoutDb,
  createNewWorkout,
  updateOneWorkoutDb,
  deleteOneWorkoutDb,
};
