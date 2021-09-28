import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Sites = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [sites, setSites] = useState(null);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({
        name: "",
    });

    const getSites = useCallback(async () => {
        const token = await getAccessTokenSilently();
        const res = await fetch("https://localhost:5000/api/sites", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            setError(res.status);
        }
        setSites(await res.json());
    }, [getAccessTokenSilently]);

    useEffect(() => {
        getSites();
    }, [getSites]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await getAccessTokenSilently();
        const res = await fetch("https://localhost:5000/api/sites", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
        });

        const newSite = await res.json();
        setSites(prev => ([...prev, newSite]))
    };

    const handleChange = (e) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    if (!sites) return <p>loading sites...</p>;
    if (error) return <p>error loading sites</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} value={formState.name} />
                <input type="submit" value="add site" />
            </form>
            <div>
                {sites.length <= 0 ? <p>no sites</p> : sites.map((site) => <div key={site._id}>{site.name}</div>)}
            </div>
        </>
    );
};
