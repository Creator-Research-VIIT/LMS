"use client";

import { useState, useEffect } from 'react';
import { 
  Star, 
  Play, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Users,
  Clock,
  Smartphone,
  Award,
  Globe,
  Download,
  Share,
  Gift,
  Tag,
  BookOpen,
  Video,
  FileText,
  Trophy,
  Headphones,
  Monitor,
  Calendar,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function CourseDescriptionPage() {
  const [showMoreLearning, setShowMoreLearning] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Placeholder functions for button interactions
  const handleAddToCart = () => {
    setCartItems(prev => prev + 1);
    alert('Course added to cart! 🛒');
  };

  const handleBuyNow = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied! 🎉`);
      setCouponCode('');
    } else {
      alert('Please enter a coupon code');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Course link copied to clipboard! 📋');
    }
  };

  const handleGiftCourse = () => {
    alert('Gift course feature coming soon! 🎁');
  };

  const handleStartSubscription = () => {
    alert('Redirecting to subscription page... 📚');
  };

  const learningOutcomes = [
    "Master ChatGPT for content creation, code generation, and problem-solving",
    "Create stunning AI-generated art and images using DALL-E and Midjourney",
    "Build automated workflows using AI tools to 10x your productivity",
    "Develop AI-powered marketing campaigns that convert",
    "Use AI voice tools for content creation and automation",
    "Master prompt engineering techniques for better AI outputs",
    "Build AI chatbots and virtual assistants for your business",
    "Create AI-generated video content and presentations",
    "Implement AI tools for data analysis and business intelligence",
    "Develop soft skills for working effectively with AI systems",
    "Understand AI ethics and responsible AI implementation",
    "Create personalized AI workflows for your specific industry"
  ];

  const visibleLearning = showMoreLearning ? learningOutcomes : learningOutcomes.slice(0, 8);

  const courseFeatures = [
    { icon: Video, text: "22.5 hours on-demand video" },
    { icon: FileText, text: "45 articles and resources" },
    { icon: Download, text: "78 downloadable resources" },
    { icon: Smartphone, text: "Access on mobile and TV" },
    { icon: Globe, text: "Closed captions in multiple languages" },
    { icon: Trophy, text: "Certificate of completion" },
    { icon: Calendar, text: "Full lifetime access" },
    { icon: Monitor, text: "Access on desktop and mobile" },
    { icon: Headphones, text: "Audio descriptions available" },
    { icon: BookOpen, text: "Interactive exercises and quizzes" }
  ];

  const curriculum = [
    {
      title: "Introduction to AI and ChatGPT Fundamentals",
      lectures: 8,
      duration: "1hr 15min",
      lessons: [
        "What is Artificial Intelligence and Machine Learning?",
        "Setting up your ChatGPT account and interface tour",
        "Understanding AI capabilities and limitations",
        "Best practices for AI interaction and safety"
      ]
    },
    {
      title: "Advanced Prompt Engineering Techniques",
      lectures: 12,
      duration: "2hr 30min",
      lessons: [
        "Crafting effective prompts for different use cases",
        "Role-based prompting and persona development",
        "Chain of thought prompting for complex problems",
        "Advanced formatting and output control techniques"
      ]
    },
    {
      title: "AI for Content Creation and Marketing",
      lectures: 15,
      duration: "3hr 45min",
      lessons: [
        "Blog writing and SEO optimization with AI",
        "Social media content generation strategies",
        "Email marketing automation and personalization",
        "Video script creation and storyboarding"
      ]
    },
    {
      title: "Business Automation with AI Tools",
      lectures: 10,
      duration: "2hr 20min",
      lessons: [
        "Workflow automation using AI assistants",
        "Customer service chatbot development",
        "Data analysis and report generation",
        "Project management and task optimization"
      ]
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "This course completely transformed how I approach AI in my business. The practical examples and hands-on exercises made complex concepts easy to understand. Julian's teaching style is exceptional!",
      date: "2 weeks ago"
    },
    {
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Excellent comprehensive guide! The course covers everything from basics to advanced techniques. I've already implemented several AI workflows in my company and seen immediate productivity gains.",
      date: "1 month ago"
    },
    {
      name: "Emma Rodriguez",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 4,
      review: "Great course with tons of practical applications. The instructor provides real-world examples that you can immediately apply. Would definitely recommend to anyone looking to leverage AI.",
      date: "3 weeks ago"
    },
    {
      name: "David Kim",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Outstanding course! The content is up-to-date with the latest AI developments. I particularly loved the section on prompt engineering - it's a game-changer for getting better results.",
      date: "1 week ago"
    }
  ];

  const relatedTopics = [
    "ChatGPT", "Generative AI", "Office Productivity", "Artificial Intelligence",
    "Prompt Engineering", "AI Tools", "Business Automation", "Content Creation",
    "Digital Marketing", "Productivity Hacks", "Machine Learning", "AI Ethics"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-purple-600">LearnHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </div>
              <Button variant="outline">Log in</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Breadcrumb */}
            <div className={`flex items-center space-x-2 text-sm text-gray-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="hover:text-purple-600 cursor-pointer">AI & Machine Learning</span>
              <span>›</span>
              <span className="hover:text-purple-600 cursor-pointer">Generative AI</span>
              <span>›</span>
              <span className="text-gray-900">ChatGPT</span>
            </div>

            {/* Course Title */}
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                The Complete AI Guide: Learn ChatGPT, Generative AI & More
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                50+ Generative AI Tools to 10x Business, Productivity, Creativity | ChatGPT, Artificial Intelligence, Prompt Engineering
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors">
                  Bestseller
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                  Popular
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
                  Hot & New
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                  Premium
                </Badge>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center hover:scale-105 transition-transform">
                  <span className="text-orange-500 font-semibold text-lg mr-1">4.5</span>
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-orange-400 text-orange-400' : i === 4 ? 'fill-orange-400/50 text-orange-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="hover:text-purple-600 cursor-pointer">(52,660 ratings)</span>
                </div>
                <div className="flex items-center hover:scale-105 transition-transform">
                  <Users className="w-4 h-4 mr-1" />
                  <span>302,843 students</span>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-gray-600">Created by</span>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <span className="text-purple-600 hover:underline cursor-pointer transition-colors">Julian Melanson</span>
                </div>
              </div>

              {/* Course Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>English [CC], Arabic [Auto], Spanish [Auto]</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Last updated 12/2024</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <Card className={`transition-all duration-700 delay-200 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {visibleLearning.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 animate-in slide-in-from-left duration-500 hover:bg-gray-50 p-2 rounded-lg transition-colors" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="mt-4 p-0 h-auto font-normal text-purple-600 hover:text-purple-700 transition-colors"
                  onClick={() => setShowMoreLearning(!showMoreLearning)}
                >
                  {showMoreLearning ? (
                    <>Show less <ChevronUp className="w-4 h-4 ml-1" /></>
                  ) : (
                    <>Show more <ChevronDown className="w-4 h-4 ml-1" /></>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Course Includes */}
            <Card className={`transition-all duration-700 delay-300 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">This course includes:</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <feature.icon className="w-5 h-5 text-gray-500" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className={`transition-all duration-700 delay-400 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Course content</h2>
                <div className="mb-4 text-sm text-gray-600">
                  {curriculum.length} sections • {curriculum.reduce((acc, module) => acc + module.lectures, 0)} lectures • 
                  {curriculum.reduce((acc, module) => {
                    const [hours, minutes] = module.duration.split('hr ');
                    return acc + parseInt(hours) + (parseInt(minutes) || 0) / 60;
                  }, 0).toFixed(1)}h total length
                </div>
                <div className="space-y-4">
                  {curriculum.map((module, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <button
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                        onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.lectures} lectures • {module.duration}</p>
                        </div>
                        {expandedModule === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {expandedModule === index && (
                        <div className="px-6 py-4 bg-white border-t animate-in slide-in-from-top duration-300">
                          <ul className="space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center space-x-3 text-sm text-gray-700 hover:text-purple-600 cursor-pointer transition-colors">
                                <Play className="w-4 h-4 text-gray-400" />
                                <span>{lesson}</span>
                                <span className="ml-auto text-xs text-gray-500">5:30</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className={`transition-all duration-700 delay-500 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Instructor</h2>
                <div className="flex items-start space-x-6">
                  <Avatar className="w-24 h-24 hover:scale-105 transition-transform">
                    <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-600 mb-2 hover:underline cursor-pointer">Julian Melanson</h3>
                    <p className="text-gray-600 mb-4">AI Expert & Business Productivity Specialist</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-orange-400" />
                        <span>4.5 Instructor Rating</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        <span>45,234 Reviews</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>302,843 Students</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        <span>8 Courses</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Julian is a leading expert in AI and business automation with over 10 years of experience 
                      helping companies leverage artificial intelligence to boost productivity. He has consulted 
                      for Fortune 500 companies and has been featured in major publications for his innovative 
                      approaches to AI implementation. His courses have helped over 300,000 students worldwide 
                      master the latest AI technologies and transform their careers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Reviews */}
            <Card className={`transition-all duration-700 delay-600 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Student reviews</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 fill-orange-400 text-orange-400" />
                      <span className="ml-2 text-2xl font-bold">4.5</span>
                    </div>
                    <span className="text-gray-600">course rating • 52,660 ratings</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.review}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Topics */}
            <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-2xl font-bold mb-4">Related topics</h2>
              <div className="flex flex-wrap gap-2">
                {relatedTopics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition-colors hover:scale-105">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`sticky top-24 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  {/* Course Preview */}
                  <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-8 h-8" />
                      </div>
                      <p className="font-semibold">Preview this course</p>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Subscription Option */}
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border hover:bg-purple-100 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">Premium course included</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Subscribe to our top courses</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get this course, plus 26,000+ of our top-rated courses, with Personal Plan.
                      </p>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 mb-2 hover:scale-105 transition-transform" 
                        onClick={handleStartSubscription}
                      >
                        Start subscription
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        Starting at ₹500 per month<br />
                        Cancel anytime
                      </p>
                      <p className="text-center text-sm text-gray-500 mt-2">or</p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900">₹2,559</div>
                      <div className="text-sm text-gray-500 line-through">₹4,999</div>
                      <div className="text-sm text-red-600 font-semibold">48% off</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-6">
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3 hover:scale-105 transition-transform" 
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to cart
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-lg py-3 hover:bg-gray-50 hover:scale-105 transition-transform" 
                        onClick={handleBuyNow}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Buy now
                      </Button>
                    </div>

                    {/* Money Back Guarantee */}
                    <div className="text-center mb-6 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 font-semibold">30-Day Money-Back Guarantee</p>
                      <p className="text-sm text-green-600">Full Lifetime Access</p>
                    </div>

                    <Separator className="mb-6" />

                    {/* Additional Actions */}
                    <div className="space-y-3 mb-6">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-gray-50 hover:scale-105 transition-transform" 
                        onClick={handleShare}
                      >
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-gray-50 hover:scale-105 transition-transform" 
                        onClick={handleGiftCourse}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Gift this course
                      </Button>
                    </div>

                    {/* Coupon */}
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Enter coupon" 
                          className="flex-1" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyCoupon}
                          className="hover:scale-105 transition-transform"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card className="mt-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">This course includes:</h3>
                  <div className="space-y-3 text-sm">
                    {courseFeatures.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <feature.icon className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}