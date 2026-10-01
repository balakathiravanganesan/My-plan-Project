import { environment } from '../environments/environments';

export const API_CONFIG = {

  AUTH: {
    REGISTER: `${environment.baseurl}/Myplan/register`,
    LOGIN: `${environment. baseurl}/Myplan/login`
  },
   IDEA: {
    CREATE: `${environment.baseurl}/MyplanIdea`,
    GET_ALL: `${environment.baseurl}/MyplanIdea`,
    GET_BY_ID: (id: number) => `${environment.baseurl}/MyplanIdea/${id}`,
    GET_FAVORITES: `${environment.baseurl}/MyplanIdea/favorites`,
    GET_TODAY: `${environment.baseurl}/MyplanIdea/today`,
    UPDATE: (id: number) => `${environment.baseurl}/MyplanIdea/${id}`,
    DELETE: (id: number) => `${environment.baseurl}/MyplanIdea/${id}`,
    FAVORITE: (id: number) => `${environment.baseurl}/MyplanIdea/${id}/favorite`,
    DASHBOARD: `${environment.baseurl}/MyplanIdea/dashboard`
  }

};