"use client"

import { useEffect, useState } from "react";
import { backend } from '../../declarations/backend/index';
import { useSiweIdentity } from "ic-use-siwe-identity";
import { UserProfile } from "../../../backend/src/user_profile";

export default function Profile() {
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [updatedUserProfile, setUpdatedUserProfile] = useState<UserProfile | null>(null);
    const { identity } = useSiweIdentity();

    const icpPrincipal = identity?.getPrincipal().toString();

    async function updateUserProfile() {
        await backend?.updateUser(updatedUserProfile);
    }

    async function getProfile() {
        await backend?.getUserProfile(icpPrincipal).then((userProfile) => {
            setEmail(userProfile.email);
            setName(userProfile.name);
        });
    }

    useEffect(() => {
        setUpdatedUserProfile({
            address: icpPrincipal,
            name: name,
            email: email,
        })
    }, [icpPrincipal, email, name]);


    useEffect(() => {
        getProfile();
    }, [icpPrincipal]);


    return (
        <div className="flex flex-col w-1/3">
            {icpPrincipal ?
                <div className="w-full p-4">
                    <div className="flex flex-col gap-y-6 form-control">
                        <label className="flex input-group gap-x-4">
                            <span className="mt-2">Name</span>
                            <input onBlur={(e) => setName(e.target.value)} value={name ? name : null} type="text" placeholder="Chris" className="input input-bordered" />
                        </label>
                        <label className="flex input-group gap-x-4">
                            <span className="mt-2">Email</span>
                            <input onBlur={(e) => setEmail(e.target.value)} value={email ? email : null} type="text" placeholder="info@site.com" className="input input-bordered" />
                        </label>
                        <button onClick={async () => { await updateUserProfile(); await getProfile() }} className="w-2/5 btn btn-sm text-md">Save</button>
                    </div>
                </div>
                : null}
        </div>
    )
}
