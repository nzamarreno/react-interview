import {useEffect, useState} from "react";
import {getUserCollaborator, IUser} from "../../services/users";

var profile = (props: any) => {
    var username = props.username;
    var isLoggedIn = props.isLoggedIn;
    var showCollaborators = props.showCollaborators;
    let filteredCollaborators: any[] = [];

    const [search, setSearch] = useState<string>('');

    if (showCollaborators) {
        var [collaborators, setcollaborators] = useState<IUser[]>([]);
        filteredCollaborators = search ? collaborators.filter(collab => collab.name.includes(search)) : collaborators;

        useEffect(() => {
            (async () => {
                getUserCollaborator().then((response) => {
                    if (response.status == 200) {
                        setcollaborators(response.data);
                    }
                });
            })();
        });
    }

    if (isLoggedIn) {
        return (
            <div>
                {showCollaborators ? (
                    <div data-testid="username">Hi {username}!</div>
                ) : (
                    <>
                        <div data-testid="username">Hi {username}! Below, your list of collaborators</div>
                        <input value={search} onChange={(event) => setSearch(event.target.value)}/>
                        <ul data-testid="address-list">
                            {filteredCollaborators.map((collaborator: IUser) => (
                                <>
                                <h1>{collaborator.name}</h1>
                                <div>{collaborator.address.suite + collaborator.address.street + collaborator.address.city}</div>
                                </>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    } else {
        return <></>;
    }
};

export default profile;
