import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: '2rem 0',
                }}
            >
                <img
                    src={user.picture}
                    alt={user.name}
                    style={{ borderRadius: "50%", width: "80px", objectFit: "contain", marginRight: '1rem' }}
                />
                <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                </div>
            </div>
        )
    );
};
