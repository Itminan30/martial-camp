import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useRole = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: role = "", isLoading: isRoleLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
        const res = await axiosSecure.get(`/user/role/${user.email}`);
        return res.data.userRole;
    }});
    return [role, isRoleLoading];
}

export default useRole;