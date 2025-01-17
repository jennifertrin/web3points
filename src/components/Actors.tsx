import {
    ActorProvider,
    InterceptorErrorData,
    InterceptorRequestData,
    createActorContext,
    createUseActorHook,
    isIdentityExpiredError,
} from "ic-use-actor";
import { idlFactory } from "../declarations/backend/index";

import { ReactNode } from "react";
import { _SERVICE } from "../declarations/backend/backend.did";
import toast from "react-hot-toast";
import { useSiweIdentity } from "ic-use-siwe-identity";

const actorContext = createActorContext<_SERVICE>();
export const useActor = createUseActorHook<_SERVICE>(actorContext);

export default function Actors({ children }: { children: ReactNode }) {
    const { identity, clear } = useSiweIdentity();

    const errorToast = (error: unknown) => {
        if (typeof error === "object" && error !== null && "message" in error) {
            toast.error(error.message as string, {
                position: "bottom-right",
            });
        }
    };

    const handleResponseError = (data: InterceptorErrorData) => {
        console.error("onResponseError", data.error);
        if (isIdentityExpiredError(data.error)) {
            toast.error("Login expired.", {
                id: "login-expired",
                position: "bottom-right",
            });
            setTimeout(() => {
                clear();
                window.location.reload();
            }, 1000);
            return;
        }

        if (typeof data === "object" && data !== null && "message" in data) {
            errorToast(data);
        }
    };

    const handleRequest = (data: InterceptorRequestData) => {
        console.log("onRequest", data.args, data.methodName);
        return data.args;
    };

    return (
        <ActorProvider<_SERVICE>
            canisterId={"bkyz2-fmaaa-aaaaa-qaaaq-cai"}
            context={actorContext}
            identity={identity}
            idlFactory={idlFactory}
            onRequest={handleRequest}
            onRequestError={(error) => errorToast(error)}
            onResponseError={handleResponseError}
        >
            {children}
        </ActorProvider>
    );
}