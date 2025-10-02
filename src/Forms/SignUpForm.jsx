import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../store/apiSlice";
import ProductImage from '../Assets/Add.png'


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
                className="w-full lg:w-1/2 flex items-center justify-center px-6 py-2 overflow-y-auto"
                style={{
                    background: 'linear-gradient(to bottom, #F8F4F0, #F6F1F8)'
                }}
            >
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#4B2142' }}>
                            Create Account
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{
                                        border: '2px solid #C6A8CE',
                                        color: '#3A2D35'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    placeholder="9876543210"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{
                                        border: '2px solid #C6A8CE',
                                        color: '#3A2D35'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                            </div>

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
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    placeholder="400001"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{
                                        border: '2px solid #C6A8CE',
                                        color: '#3A2D35'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
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
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white py-3 px-4 rounded-full font-semibold transition-all hover:shadow-lg"
                                style={{ backgroundColor: '#8A1C2B' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1522'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#8A1C2B'}
                            >
                                Sign Up
                            </button>

                            {error && (
                                <div className="text-red-600 text-sm text-center mt-2">
                                    {error.data?.message || "Something went wrong"}
                                </div>
                            )}
                            {data?.ok && (
                                <div className="text-green-600 text-sm text-center mt-2">
                                    Signup successful! Redirecting...
                                </div>
                            )}

                            <div className="text-center mt-4">
                                <span className="text-sm" style={{ color: '#3A2D35' }}>Already have an account? </span>
                                <Link to="/login" className="hover:underline font-semibold" style={{ color: '#4B2142' }}>
                                    Login
                                </Link>
                            </div>
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
