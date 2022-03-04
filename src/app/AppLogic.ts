import { useEffect, useState } from "react"
import { appConfig } from "./appConfig";
import { ServerCommunicatorClass } from "./ServerCommunicator";
import { StateControllerClass } from "./StateController";

export const ServerCommunicator = new ServerCommunicatorClass(appConfig);
export const StateController = new StateControllerClass(ServerCommunicator);

export const AppLogic = () => {
  const [loggedIn, setLoggedIn] = useState(Boolean(ServerCommunicator.token));
  const [loading, setLoading] = useState(Boolean(ServerCommunicator.token));
  const [page, setPage] = useState('todos');

  // If token is available in cookies start loading userdata
  useEffect(() => {
    if (Boolean(ServerCommunicator.token)) {
      StateController.getUserData()
        .then(() => ('userdata ready'))
        .then(() => { setLoading(false) })
        .then(() => { setLoggedIn(true) })
        .then(() => { setPage('todos') })
        .catch(error => { console.log(error) })
    }
  }, [])

  // TODO: Handle error if usename or password is wrong
  const login = (username: string, password: string) => {
    ServerCommunicator.login(username, password)
      .then(response => {
        ServerCommunicator.token = response.data.token;
        document.cookie = `token=${response.data.token}`;
      })
      .then(() => { setLoggedIn(true); setLoading(true) })
      .then(() => StateController.getUserData())
      .then(() => { setLoading(false) })
      .catch((error) => { console.log(error) })
  }

  // TODO: Handle error if usename is in use
  const register = (username: string, password: string, passwordConfirm: string) => {
    setLoading(true);
    ServerCommunicator.register(username, password, passwordConfirm)
      .then(response => {
        ServerCommunicator.token = response.data.token;
        document.cookie = `token=${response.data.token}`;
      })
      .then(() => { setLoggedIn(true); setLoading(false) })
      .catch(error => console.log(error));
  }

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    ServerCommunicator.token = null;
    StateController.todos.clear();
    StateController.categories.clear();
    StateController.statuses.clear();
    setLoggedIn(false);
  }

  return { page, loggedIn, loading, setPage, login, register, logout }
}