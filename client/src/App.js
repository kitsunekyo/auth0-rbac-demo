import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { Profile } from "./Profile";
import { Sites } from "./Sites";

function App() {
    const { isAuthenticated, isLoading } = useAuth0();
    return (
        <div className="App">
            {isLoading ? (
                <p>loading...</p>
            ) : (
                <>
                    <p>Auth0 Authentication</p>
                    
                    <section>
                        <Profile />
                        <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
                    </section>

                    <section>
                        <h3>my sites</h3>
                        {isAuthenticated && <Sites />}
                    </section>
                </>
            )}
        </div>
    );
}

export default App;
