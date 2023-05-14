export const getIdFromUrl = (url) => {
  //example url: http://traineeapp.azurewebsites.net/api/trainings/13756
  return url.substring(url.lastIndexOf("/") + 1);
};
