"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  ChevronLeft,
  Truck,
  CreditCard,
  Check,
  Bot,
  Wand2,
  ShieldCheck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Step = "shipping" | "payment" | "review";

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

const initialShippingData: ShippingData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zipCode: "",
  country: "US",
};

const initialPaymentData: PaymentData = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
};

const testShippingData: ShippingData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: "123 Party Street",
  apartment: "Apt 4B",
  city: "San Francisco",
  state: "CA",
  zipCode: "94102",
  country: "US",
};

const testPaymentData: PaymentData = {
  cardNumber: "4242 4242 4242 4242",
  cardName: "John Doe",
  expiry: "12/28",
  cvc: "123",
};

const steps = [
  { key: "shipping" as Step, label: "Shipping", icon: Truck },
  { key: "payment" as Step, label: "Payment", icon: CreditCard },
  { key: "review" as Step, label: "Review", icon: Check },
];

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
];

const productFeatures = [
  "Physical PartyBot robot",
  "Built-in display & speakers",
  "Advanced AI voice recognition",
  "Free software updates forever",
  "1-year hardware warranty",
];

function formatCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpiry(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  if (v.length >= 2) {
    return v.substring(0, 2) + "/" + v.substring(2, 4);
  }
  return v;
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-xl",
          "bg-white/5 border border-white/10",
          "text-white placeholder-gray-500",
          "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
          "transition-colors"
        )}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [shippingData, setShippingData] = useState<ShippingData>(initialShippingData);
  const [paymentData, setPaymentData] = useState<PaymentData>(initialPaymentData);
  const [processing, setProcessing] = useState(false);

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const updateShipping = (field: keyof ShippingData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePayment = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessing(false);
    alert(
      "🎉 Demo Mode: Order placed successfully!\n\nIn production, this would process your payment and create an order."
    );
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <span className="font-bold text-lg text-white">PartyBot</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link
            href="/pricing"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Pricing
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    index < currentStepIndex
                      ? "bg-green-500"
                      : index === currentStepIndex
                      ? "bg-primary-500"
                      : "bg-gray-700"
                  )}
                >
                  {index < currentStepIndex ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <s.icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm font-medium",
                    index <= currentStepIndex ? "text-white" : "text-gray-500"
                  )}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-4",
                      index < currentStepIndex ? "bg-green-500" : "bg-gray-700"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Shipping */}
                {step === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card variant="elevated" padding="lg">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">
                          Shipping Information
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShippingData(testShippingData)}
                        >
                          <Wand2 className="w-4 h-4 mr-2" />
                          Fill Test Data
                        </Button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <InputField
                          label="First Name"
                          value={shippingData.firstName}
                          onChange={(v) => updateShipping("firstName", v)}
                          placeholder="John"
                        />
                        <InputField
                          label="Last Name"
                          value={shippingData.lastName}
                          onChange={(v) => updateShipping("lastName", v)}
                          placeholder="Doe"
                        />
                        <InputField
                          label="Email"
                          type="email"
                          value={shippingData.email}
                          onChange={(v) => updateShipping("email", v)}
                          placeholder="john@example.com"
                        />
                        <InputField
                          label="Phone"
                          type="tel"
                          value={shippingData.phone}
                          onChange={(v) => updateShipping("phone", v)}
                          placeholder="(555) 123-4567"
                        />
                        <div className="sm:col-span-2">
                          <InputField
                            label="Address"
                            value={shippingData.address}
                            onChange={(v) => updateShipping("address", v)}
                            placeholder="123 Party Street"
                          />
                        </div>
                        <InputField
                          label="Apartment, suite, etc."
                          value={shippingData.apartment}
                          onChange={(v) => updateShipping("apartment", v)}
                          placeholder="Apt 4B"
                          required={false}
                        />
                        <InputField
                          label="City"
                          value={shippingData.city}
                          onChange={(v) => updateShipping("city", v)}
                          placeholder="San Francisco"
                        />
                        <InputField
                          label="State / Province"
                          value={shippingData.state}
                          onChange={(v) => updateShipping("state", v)}
                          placeholder="CA"
                        />
                        <InputField
                          label="ZIP / Postal Code"
                          value={shippingData.zipCode}
                          onChange={(v) => updateShipping("zipCode", v)}
                          placeholder="94102"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Country <span className="text-red-400">*</span>
                          </label>
                          <select
                            value={shippingData.country}
                            onChange={(e) =>
                              updateShipping("country", e.target.value)
                            }
                            className={cn(
                              "w-full px-4 py-3 rounded-xl",
                              "bg-white/5 border border-white/10",
                              "text-white",
                              "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            )}
                          >
                            {countries.map((c) => (
                              <option
                                key={c.code}
                                value={c.code}
                                className="bg-gray-900"
                              >
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          size="lg"
                          className="w-full"
                          onClick={() => setStep("payment")}
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card variant="elevated" padding="lg">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">
                          Payment Details
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPaymentData(testPaymentData)}
                        >
                          <Wand2 className="w-4 h-4 mr-2" />
                          Fill Test Card
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 p-3 rounded-lg bg-white/5">
                        <Lock className="w-4 h-4" />
                        <span>Your payment information is encrypted and secure</span>
                      </div>

                      <div className="space-y-4">
                        <InputField
                          label="Card Number"
                          value={paymentData.cardNumber}
                          onChange={(v) =>
                            updatePayment("cardNumber", formatCardNumber(v))
                          }
                          placeholder="4242 4242 4242 4242"
                        />
                        <InputField
                          label="Name on Card"
                          value={paymentData.cardName}
                          onChange={(v) => updatePayment("cardName", v)}
                          placeholder="John Doe"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            label="Expiry Date"
                            value={paymentData.expiry}
                            onChange={(v) =>
                              updatePayment("expiry", formatExpiry(v))
                            }
                            placeholder="MM/YY"
                          />
                          <InputField
                            label="CVC"
                            value={paymentData.cvc}
                            onChange={(v) =>
                              updatePayment("cvc", v.replace(/\D/g, "").slice(0, 4))
                            }
                            placeholder="123"
                          />
                        </div>
                      </div>

                      <div className="mt-8 flex gap-4">
                        <Button
                          variant="secondary"
                          size="lg"
                          onClick={() => setStep("shipping")}
                        >
                          Back
                        </Button>
                        <Button
                          size="lg"
                          className="flex-1"
                          onClick={() => setStep("review")}
                        >
                          Review Order
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {step === "review" && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card variant="elevated" padding="lg">
                      <h2 className="text-xl font-bold text-white mb-6">
                        Review Your Order
                      </h2>

                      {/* Shipping Summary */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-white">
                            Shipping Address
                          </h3>
                          <button
                            onClick={() => setStep("shipping")}
                            className="text-sm text-primary-400 hover:text-primary-300"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 text-gray-300 text-sm space-y-1">
                          <p>
                            {shippingData.firstName} {shippingData.lastName}
                          </p>
                          <p>{shippingData.address}</p>
                          {shippingData.apartment && <p>{shippingData.apartment}</p>}
                          <p>
                            {shippingData.city}, {shippingData.state}{" "}
                            {shippingData.zipCode}
                          </p>
                          <p>{shippingData.email}</p>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-white">Payment Method</h3>
                          <button
                            onClick={() => setStep("payment")}
                            className="text-sm text-primary-400 hover:text-primary-300"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 text-gray-300 text-sm flex items-center gap-3">
                          <CreditCard className="w-5 h-5" />
                          <span>
                            •••• •••• •••• {paymentData.cardNumber.slice(-4)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <Button
                          size="lg"
                          className="w-full"
                          onClick={handlePlaceOrder}
                          disabled={processing}
                        >
                          {processing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Processing...
                            </>
                          ) : (
                            "Place Order - $499.00"
                          )}
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                          By placing this order, you agree to our Terms of Service
                          and Privacy Policy.
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card variant="elevated" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Order Summary
                  </h3>

                  {/* Product */}
                  <div className="flex gap-4 pb-4 border-b border-white/10">
                    <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center">
                      <Bot className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">PartyBot Robot</p>
                      <p className="text-sm text-gray-400">Qty: 1</p>
                    </div>
                    <p className="font-medium text-white">$499.00</p>
                  </div>

                  {/* Features */}
                  <div className="py-4 border-b border-white/10">
                    <p className="text-sm text-gray-400 mb-3">Includes:</p>
                    <ul className="space-y-2">
                      {productFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <Check className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Totals */}
                  <div className="py-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">$499.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tax</span>
                      <span className="text-gray-400">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-white text-xl">$499.00</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>Free Shipping</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

