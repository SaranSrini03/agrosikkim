"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Leaf, ArrowLeft, Check, Shield, Phone, MapPin } from "lucide-react";

export default function SignUp() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        farmerType: "",
        agreeToTerms: false
    });
    const [currentStep, setCurrentStep] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/dashboard");
                return;
            }

            // Safely handle errors
            const raw = await res.text(); // could be JSON or plain text
            let message = "Signup failed";

            try {
                const data = JSON.parse(raw);
                if (data?.message) message = data.message;
            } catch {
                // raw wasn’t valid JSON, maybe a stack trace or empty
                if (raw.trim()) message = raw;
            }

            alert(message);
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const steps = [
        { number: 1, title: "Personal Info" },
        { number: 2, title: "Account Details" },
        { number: 3, title: "Farm Details" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 relative text-black overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => router.push("/")}
                className="absolute top-6 left-6 flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors z-10"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
            </motion.button>

            <div className="flex items-center justify-center min-h-screen p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="flex justify-center mb-4"
                        >
                            <div className="p-3 bg-green-100 rounded-2xl">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                        </motion.div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Join AgroSikkim
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Create your account and start your agricultural journey with us
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-gray-300 text-gray-500'
                                        }`}>
                                        {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${currentStep >= step.number ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {step.title}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100/50 p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Personal Information */}
                            {currentStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+91 1234567890"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Account Details */}
                            {currentStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a strong password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Must be at least 8 characters with numbers and symbols
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1"
                                            />
                                            <span className="text-sm text-gray-600">
                                                I agree to the{" "}
                                                <button type="button" className="text-green-600 hover:text-green-700">
                                                    Terms of Service
                                                </button>{" "}
                                                and{" "}
                                                <button type="button" className="text-green-600 hover:text-green-700">
                                                    Privacy Policy
                                                </button>
                                            </span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Farm Details */}
                            {currentStep === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                Location/District *
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    id="location"
                                                    name="location"
                                                    type="text"
                                                    placeholder="Enter your location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="farmerType" className="block text-sm font-medium text-gray-700">
                                                Type of Farmer *
                                            </label>
                                            <select
                                                id="farmerType"
                                                name="farmerType"
                                                value={formData.farmerType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                            >
                                                <option value="">Select type</option>
                                                <option value="small">Small-scale Farmer</option>
                                                <option value="medium">Medium-scale Farmer</option>
                                                <option value="large">Large-scale Farmer</option>
                                                <option value="organic">Organic Farmer</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="flex items-start space-x-3">
                                            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-green-800">Secure Registration</h4>
                                                <p className="text-sm text-green-700">
                                                    Your information is protected with encryption. We respect your privacy and
                                                    will never share your data without permission.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6">
                                <motion.button
                                    type="button"
                                    onClick={prevStep}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible' : ''
                                        }`}
                                >
                                    Back
                                </motion.button>

                                {currentStep < 3 ? (
                                    <motion.button
                                        type="button"
                                        onClick={nextStep}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Continue
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                                    >
                                        Create Account
                                    </motion.button>
                                )}
                            </div>
                        </form>

                        {/* Alternative Sign Up */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>


                        </div>

                        {/* Sign In Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <button
                                    onClick={() => router.push("/signin")}
                                    className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}