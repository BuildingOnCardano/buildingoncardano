
export const baseUrl = "http://localhost:8080";
//export const baseUrl = "https://173.212.232.170:8080";
//export const baseUrl = "https://smashpeek.com/bocservices";

//login and reg
export const registration = "/registration/user";
export const login = "/login/user";
export const verifyuser = "/registration/verifyuser";

//projects
export const createProject = "/projects/create";
export const updateProject = "/projects/update";
export const getAllProjects = "/projects/all";
export const getLatestProjects = "/projects/latest";
export const getProjectDetailsById = "/projects/details/";//{projectId}
export const getProjectsByType = "/projects/type/";////{projectType}
export const getProjectsStats = "/projects/stats";
export const getProjectByOwner = "/projects/owner/";////{owneremail}
export const getProjectByName = "/projects/details/name/";//{projectId}
export const getProjectByNameAndOwner = "/projects/details/nameandowner/";//{projectId}

//project sales
export const liveProjectSales = "/projectsales/all/live";


