import React from 'react';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: "Personal",
    subtitle: "For individual learners",
    price: "$29",
    period: "per month",
    description: "Perfect for professionals looking to upskill",
    features: [
      "Access to 5,000+ courses",
      "Certificate of completion",
      "Mobile and TV app access",
      "Offline download",
      "Basic support"
    ],
    buttonText: "Start Personal Plan",
    buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white"
  },
  {
    name: "Team",
    subtitle: "For small teams",
    price: "$99",
    period: "per user/month",
    description: "Collaborative learning for growing teams",
    features: [
      "Access to 10,000+ courses",
      "Team management tools",
      "Progress tracking & analytics",
      "Certificate of completion",
      "Priority support",
      "Custom learning paths"
    ],
    buttonText: "Start Team Plan",
    buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
    popular: true
  },
  {
    name: "Enterprise",
    subtitle: "For large organizations",
    price: "Custom",
    period: "pricing",
    description: "Advanced features for enterprise-scale learning",
    features: [
      "Access to all 15,000+ courses",
      "Advanced analytics & reporting",
      "Single sign-on (SSO)",
      "Custom integrations",
      "Dedicated success manager",
      "White-label options",
      "Advanced security features"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
  }
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose your learning path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible plans designed to grow with your learning needs and career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;