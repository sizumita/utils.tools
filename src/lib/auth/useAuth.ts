import {useContext} from "@builder.io/qwik";
import {AuthContext} from "~/lib/auth/authContext";

export const useAuth = () => {
    return useContext(AuthContext)
}
