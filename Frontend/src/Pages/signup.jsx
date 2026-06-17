import { useState } from "react";
import { signup } from "../services/api";

function Signup({ setShowLogin }) {
    const [form, setForm] = useState({
        name: "",
        accountNumber: "",
        pin: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async () => {
        try {
            const response = await signup(form);
            console.log("Signup response:", response);

            alert("Account Created Successfully");

            setShowLogin(true);
        } catch (error) {
            console.log("Signup error:", error.response?.data || error.message);
            const errorMsg = error.response?.data?.message || "Error Creating Account";
            alert(errorMsg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h1>

                <input
                    className="w-full border p-3 rounded-lg mb-3"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-3 rounded-lg mb-3"
                    placeholder="Account Number"
                    name="accountNumber"
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-3 rounded-lg mb-4"
                    placeholder="PIN"
                    type="password"
                    name="pin"
                    onChange={handleChange}
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg"
                >
                    Signup
                </button>

                <p className="text-center mt-4">
                    Already have an account?

                    <button
                        className="text-indigo-600 ml-2"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signup;