import { useState } from "react";
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext";
import PublocksPage from "./PublocksPage";
import axios from "axios";
import DashboardWidget from "../DashboardWidget";

export default function ProfilePage(){

    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    
    let {subpage} = useParams();
    if(subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready) {
        return 'Loading...';
    }

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    if(redirect) {
        return <Navigate to={redirect}/>
    }
    return (
        <>
        <div>
        <AccountNav />
            <br/>
            <div>
                <DashboardWidget />
            </div>
        </div>
        <div>
          
           <div>
                <div className="text-center">
 
                </div>
           </div>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>

                </div>
            )}
            {subpage === 'publocks' && (
                <PublocksPage>

                </PublocksPage>
            )}
        </div>
        </>
    );
}