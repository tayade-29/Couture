import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../store/apiSlice";


export default function SignupForm() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, { data, error, isLoading }] = useCreateUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser({ name, phoneNo, email, zipcode, password }).unwrap();
            console.log("User registered successfully");
            navigate("/");
        } catch (error) {
            console.error("Failed to register user:", error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            placeholder="9876543210"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

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
                        />
                    </div>

                    {/* Zipcode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Zipcode</label>
                        <input
                            type="text"
                            name="zipcode"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            placeholder="400001"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Sign Up
                        </button>
                        {error && (
                            <div className="text-red-500 text-sm">
                                {error.data?.message || "Something went wrong"}
                            </div>
                        )}
                        {data?.ok && (
                            <div className="text-green-500 text-sm">
                                Signup successful! Redirecting...
                            </div>
                        )}

                    </div>
                    <div className="text-center mt-4">
                        <span className="text-gray-600 text-sm">Already have an account? </span>
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}
