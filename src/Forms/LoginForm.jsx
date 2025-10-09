import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useLoginUserMutation } from "../store/apiSlice";
import ProductImage from '../Assets/Add.png'


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

           
            navigate("/home");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="flex min-h-screen">
            <div
                className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
                style={{
                    backgroundImage: `url(${ProductImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                
            </div>

            <div
                className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
                style={{
                    background: 'linear-gradient(to bottom, #F8F4F0, #F6F1F8)'
                }}
            >
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#4B2142' }}>
                            Welcome Back 
                        </h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@mail.com"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{
                                        border: '2px solid #C6A8CE',
                                        color: '#3A2D35'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{
                                        border: '2px solid #C6A8CE',
                                        color: '#3A2D35'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <a href="#" className="text-sm font-medium hover:underline" style={{ color: '#4B2142' }}>
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full text-white py-3 px-4 rounded-full font-semibold transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ backgroundColor: '#8A1C2B' }}
                                onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#6B1522')}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#8A1C2B'}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>

                            {error && (
                                <div className="text-red-600 text-sm text-center mt-2">
                                    {error.data?.message || "Something went wrong"}
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="lg:hidden text-center mt-8">
                        <h1
                            className="text-6xl font-bold"
                            style={{
                                fontFamily: 'Katibeh, serif',
                                color: '#4B2142'
                            }}
                        >
                            Couture
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
