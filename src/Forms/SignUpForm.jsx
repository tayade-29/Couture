import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../store/apiSlice";
import ProductImage from '../Assets/Add.png';

export default function SignupForm() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, { data, error, isLoading }] = useCreateUserMutation();

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ✅ Email validation
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    // ✅ Phone validation
    const validatePhone = (value) => {
        const regex = /^\d{10}$/;
        if (!regex.test(value)) {
            setPhoneError("Phone number must be 10 digits");
        } else {
            setPhoneError("");
        }
    };

    // ✅ Password validation (6+ characters)
    const validatePassword = (value) => {
        if (value.length < 6) {
            setPasswordError("Password must be at least 6 characters");
        } else {
            setPasswordError("");
        }
    };

    // ✅ Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            emailError ||
            phoneError ||
            passwordError ||
            !name ||
            !phoneNo ||
            !email ||
            !zipcode ||
            !password
        )
            return;

        setIsSubmitted(true); // Disable button during submission

        try {
            await createUser({ name, phoneNo, email, zipcode, password }).unwrap();
            // Successful signup, wait 1s and navigate
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            console.error("Failed to register user:", err);
            setIsSubmitted(false); // Re-enable button on error
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Image Section */}
            <div
                className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
                style={{
                    backgroundImage: `url(${ProductImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Right Form Section */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center px-6 py-2 overflow-y-auto"
                style={{ background: 'linear-gradient(to bottom, #F8F4F0, #F6F1F8)' }}
            >
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#4B2142' }}>
                            Create Account
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{ border: '2px solid #C6A8CE', color: '#3A2D35' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNo}
                                    onChange={(e) => {
                                        setPhoneNo(e.target.value);
                                        validatePhone(e.target.value);
                                    }}
                                    placeholder="9876543210"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{ border: '2px solid #C6A8CE', color: '#3A2D35' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                                {phoneError && <p className="text-red-600 text-sm mt-1">{phoneError}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                    placeholder="example@mail.com"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{ border: '2px solid #C6A8CE', color: '#3A2D35' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                                {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
                            </div>

                            {/* Zipcode */}
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    placeholder="400001"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{ border: '2px solid #C6A8CE', color: '#3A2D35' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    placeholder="********"
                                    className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                                    style={{ border: '2px solid #C6A8CE', color: '#3A2D35' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                                    onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                                />
                                {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitted || isLoading}
                                className={`w-full text-white py-3 px-4 rounded-full font-semibold transition-all hover:shadow-lg ${isSubmitted || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                style={{ backgroundColor: '#8A1C2B' }}
                                onMouseEnter={(e) => { if (!isSubmitted) e.target.style.backgroundColor = '#6B1522'; }}
                                onMouseLeave={(e) => { if (!isSubmitted) e.target.style.backgroundColor = '#8A1C2B'; }}
                            >
                                {isSubmitted ? "Signing Up..." : "Sign Up"}
                            </button>

                            {/* Success Message */}
                            {data?.ok && !isSubmitted && (
                                <div className="text-green-600 text-sm text-center mt-2">
                                    Signup successful! Redirecting...
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-600 text-sm text-center mt-2">
                                    {error.data?.message || "Something went wrong"}
                                </div>
                            )}

                            {/* Login Redirect */}
                            <div className="text-center mt-4">
                                <span className="text-sm" style={{ color: '#3A2D35' }}>
                                    Already have an account?{" "}
                                </span>
                                <Link to="/login" className="hover:underline font-semibold" style={{ color: '#4B2142' }}>
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Mobile Logo */}
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
