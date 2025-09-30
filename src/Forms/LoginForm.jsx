import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useLoginUserMutation } from "../store/apiSlice";

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const [loginUser, { error, isLoading }] = useLoginUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser({ email, password }).unwrap();
            console.log("Login successful:", result);

            // Store token + user in Redux + localStorage
            dispatch(setCredentials({ token: result.token, user: result.user }));

            alert("Login successful!");
            navigate("/home");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error.data?.message || "Something went wrong"}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
