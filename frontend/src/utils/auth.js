export function logout(navigate) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
}