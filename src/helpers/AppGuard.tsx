import { useContext } from "react";
import { IAppContext } from '../types/AppType';
import { AppContext } from "../contexts/AppContext";
import TaskPage from "../components/TaskPage";
import LoginPage from "../components/LoginPage";

function AppGuard(){
    const { token } = useContext(AppContext) as IAppContext;
    return token ? <TaskPage />: <LoginPage />;
}

export default AppGuard;