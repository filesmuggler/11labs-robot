"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Terminal,
  Cpu,
  Cog,
  Box,
  Radio,
  Mic,
  Volume2,
  Zap,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  Code2,
  CircuitBoard,
  Layers,
  GitBranch,
  Package,
  Settings,
  Sparkles,
  Shield,
  Timer,
  Wifi,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// SDK Features
const sdkFeatures = [
  {
    icon: Layers,
    title: "Thin Wrapper Architecture",
    description: "Lightweight abstraction over ElevenLabs Agents API. No bloat, just what you need for robotics.",
    highlight: "< 50KB",
  },
  {
    icon: Timer,
    title: "Ultra-Low Latency",
    description: "Optimized for real-time robotics with sub-300ms end-to-end response times.",
    highlight: "<300ms",
  },
  {
    icon: Wifi,
    title: "WebSocket First",
    description: "Native WebSocket support for persistent connections and real-time bidirectional communication.",
    highlight: "Real-time",
  },
  {
    icon: Shield,
    title: "Hardware Abstraction",
    description: "Unified API across all supported platforms. Write once, deploy anywhere.",
    highlight: "Unified",
  },
];

// Supported Platforms
const platforms = [
  {
    id: "raspberry-pi",
    name: "Raspberry Pi",
    icon: Cpu,
    description: "Full GPIO support with hardware PWM for precise servo and actuator control",
    languages: ["Python", "C++"],
    features: ["GPIO Control", "PWM Servos", "I2C/SPI", "Camera Integration"],
    gradient: "from-pink-500 to-red-500",
  },
  {
    id: "ros2",
    name: "ROS 2",
    icon: CircuitBoard,
    description: "Native ROS 2 nodes with topic publishing, service calls, and action servers",
    languages: ["Python", "C++"],
    features: ["Topic Publishing", "Service Calls", "Action Servers", "TF2 Integration"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "arduino",
    name: "Arduino / ESP32",
    icon: Cog,
    description: "Embedded support via serial bridge for microcontroller-based robots",
    languages: ["C++", "Python Bridge"],
    features: ["Serial Bridge", "PWM Control", "Sensor Fusion", "Low Power"],
    gradient: "from-teal-500 to-green-500",
  },
  {
    id: "custom",
    name: "Custom Platforms",
    icon: Box,
    description: "Extensible architecture for proprietary hardware and custom actuator systems",
    languages: ["Python", "C++", "Any"],
    features: ["Plugin System", "Custom Drivers", "Protocol Adapters", "API Hooks"],
    gradient: "from-purple-500 to-pink-500",
  },
];

// Actuators and Effectors
const actuators = [
  { name: "Servo Motors", icon: Cog, description: "PWM-controlled precision movement" },
  { name: "Stepper Motors", icon: Settings, description: "High-precision positioning" },
  { name: "DC Motors", icon: Radio, description: "Continuous rotation drives" },
  { name: "Linear Actuators", icon: ArrowRight, description: "Push/pull mechanisms" },
  { name: "LED Arrays", icon: Sparkles, description: "Visual feedback and expressions" },
  { name: "Speakers", icon: Volume2, description: "Audio output with spatial awareness" },
  { name: "Microphones", icon: Mic, description: "Multi-channel audio input" },
  { name: "Displays", icon: Terminal, description: "OLED/LCD status screens" },
];

// Code Examples
const codeExamples = {
  python: {
    install: `pip install elevenlabs-robotics-sdk`,
    basic: `from elevenlabs_robotics import RoboticsAgent, PlatformConfig
from elevenlabs_robotics.platforms import RaspberryPi
from elevenlabs_robotics.actuators import ServoController, LEDController

# Initialize platform with hardware configuration
platform = RaspberryPi(
    servo_pins=[12, 13, 18, 19],  # GPIO pins for servos
    led_pin=21,                    # Status LED
    audio_device="default"         # ALSA audio device
)

# Create the robotics agent with ElevenLabs backend
agent = RoboticsAgent(
    agent_id="your-agent-id",
    api_key="your-api-key",
    platform=platform
)

# Define actuator mappings for expressions
agent.map_expression("happy", {
    "servo_head_tilt": 15,      # Tilt head up slightly
    "servo_ears": 45,           # Ears up
    "led_status": "pulse_green" # Green pulse
})

agent.map_expression("thinking", {
    "servo_head_tilt": -5,      # Slight head tilt
    "led_status": "pulse_blue"  # Blue thinking indicator
})

# Callback for handling agent responses
@agent.on_response
async def handle_response(text: str, audio: bytes, emotion: str):
    """Handle agent response with synchronized actuators."""
    # Actuators automatically sync with detected emotion
    await agent.express(emotion)
    # Play audio through robot speakers
    await agent.speak(audio)

# Callback for voice activity detection
@agent.on_listening
async def handle_listening(is_listening: bool):
    """Visual feedback when robot is listening."""
    if is_listening:
        await platform.led.set_color("blue")
    else:
        await platform.led.set_color("green")

# Start the conversation loop
async def main():
    await agent.connect()
    print("Robot is ready! Say something...")
    
    try:
        await agent.conversation_loop()
    finally:
        await agent.disconnect()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,
    ros2: `#!/usr/bin/env python3
"""ROS 2 Node for ElevenLabs Robotics Integration."""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Bool
from geometry_msgs.msg import Twist
from sensor_msgs.msg import JointState

from elevenlabs_robotics import RoboticsAgent
from elevenlabs_robotics.platforms import ROS2Platform
from elevenlabs_robotics.ros2 import ConversationAction

class ElevenLabsRobotNode(Node):
    """ROS 2 node for conversational robotics."""
    
    def __init__(self):
        super().__init__('elevenlabs_robot')
        
        # Declare parameters
        self.declare_parameter('agent_id', '')
        self.declare_parameter('api_key', '')
        
        # Initialize ROS 2 platform adapter
        self.platform = ROS2Platform(node=self)
        
        # Create robotics agent
        self.agent = RoboticsAgent(
            agent_id=self.get_parameter('agent_id').value,
            api_key=self.get_parameter('api_key').value,
            platform=self.platform
        )
        
        # Publishers
        self.emotion_pub = self.create_publisher(
            String, '/robot/emotion', 10
        )
        self.speaking_pub = self.create_publisher(
            Bool, '/robot/is_speaking', 10
        )
        self.joint_pub = self.create_publisher(
            JointState, '/robot/joint_commands', 10
        )
        
        # Subscribers
        self.create_subscription(
            String, '/robot/user_input', 
            self.user_input_callback, 10
        )
        
        # Action server for conversations
        self._action_server = ConversationAction(
            self, 'robot_conversation', self.agent
        )
        
        # Register callbacks
        self.agent.on_response(self.handle_response)
        self.agent.on_emotion(self.handle_emotion)
        
        self.get_logger().info('ElevenLabs Robot Node initialized')
    
    async def handle_response(self, text: str, audio: bytes, emotion: str):
        """Publish response data to ROS topics."""
        # Publish speaking state
        msg = Bool()
        msg.data = True
        self.speaking_pub.publish(msg)
        
        # Generate joint commands based on emotion
        joint_state = self.agent.emotion_to_joints(emotion)
        self.joint_pub.publish(joint_state)
        
        # Play audio through robot
        await self.platform.play_audio(audio)
        
        # Done speaking
        msg.data = False
        self.speaking_pub.publish(msg)
    
    def handle_emotion(self, emotion: str):
        """Publish detected emotion."""
        msg = String()
        msg.data = emotion
        self.emotion_pub.publish(msg)
    
    def user_input_callback(self, msg: String):
        """Handle text input from other nodes."""
        asyncio.create_task(
            self.agent.send_message(msg.data)
        )

def main(args=None):
    rclpy.init(args=args)
    node = ElevenLabsRobotNode()
    
    # Run with asyncio support
    executor = rclpy.executors.MultiThreadedExecutor()
    executor.add_node(node)
    
    try:
        executor.spin()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()`,
  },
  cpp: {
    install: `# CMakeLists.txt
find_package(elevenlabs_robotics REQUIRED)
target_link_libraries(your_target elevenlabs_robotics::core)`,
    basic: `#include <elevenlabs_robotics/agent.hpp>
#include <elevenlabs_robotics/platforms/raspberry_pi.hpp>
#include <elevenlabs_robotics/actuators/servo.hpp>
#include <elevenlabs_robotics/actuators/led.hpp>

#include <iostream>
#include <memory>

using namespace elevenlabs_robotics;

class PartyRobot {
public:
    PartyRobot(const std::string& agent_id, const std::string& api_key) {
        // Configure Raspberry Pi platform
        PlatformConfig config;
        config.servo_pins = {12, 13, 18, 19};
        config.led_pin = 21;
        config.audio_device = "default";
        
        platform_ = std::make_unique<RaspberryPiPlatform>(config);
        
        // Initialize agent with platform
        AgentConfig agent_config;
        agent_config.agent_id = agent_id;
        agent_config.api_key = api_key;
        agent_config.platform = platform_.get();
        
        agent_ = std::make_unique<RoboticsAgent>(agent_config);
        
        // Map expressions to actuator states
        agent_->map_expression("happy", {
            {"servo_head_tilt", 15.0f},
            {"servo_ears", 45.0f},
            {"led_status", "pulse_green"}
        });
        
        agent_->map_expression("thinking", {
            {"servo_head_tilt", -5.0f},
            {"led_status", "pulse_blue"}
        });
        
        // Register callbacks
        agent_->on_response([this](const Response& resp) {
            handle_response(resp);
        });
        
        agent_->on_listening([this](bool is_listening) {
            if (is_listening) {
                platform_->led().set_color(Color::Blue);
            } else {
                platform_->led().set_color(Color::Green);
            }
        });
    }
    
    void run() {
        agent_->connect();
        std::cout << "Robot is ready! Say something..." << std::endl;
        
        // Start conversation loop (blocking)
        agent_->conversation_loop();
    }
    
private:
    void handle_response(const Response& response) {
        // Express emotion through actuators
        agent_->express(response.emotion);
        
        // Play audio through speakers
        agent_->speak(response.audio);
    }
    
    std::unique_ptr<RaspberryPiPlatform> platform_;
    std::unique_ptr<RoboticsAgent> agent_;
};

int main(int argc, char** argv) {
    try {
        PartyRobot robot("your-agent-id", "your-api-key");
        robot.run();
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    return 0;
}`,
    ros2: `#include <rclcpp/rclcpp.hpp>
#include <std_msgs/msg/string.hpp>
#include <std_msgs/msg/bool.hpp>
#include <sensor_msgs/msg/joint_state.hpp>

#include <elevenlabs_robotics/agent.hpp>
#include <elevenlabs_robotics/platforms/ros2.hpp>
#include <elevenlabs_robotics/ros2/conversation_action.hpp>

using namespace elevenlabs_robotics;

class ElevenLabsRobotNode : public rclcpp::Node {
public:
    ElevenLabsRobotNode() : Node("elevenlabs_robot") {
        // Declare parameters
        this->declare_parameter("agent_id", "");
        this->declare_parameter("api_key", "");
        
        // Initialize ROS 2 platform
        platform_ = std::make_unique<ROS2Platform>(this);
        
        // Create robotics agent
        AgentConfig config;
        config.agent_id = this->get_parameter("agent_id").as_string();
        config.api_key = this->get_parameter("api_key").as_string();
        config.platform = platform_.get();
        
        agent_ = std::make_unique<RoboticsAgent>(config);
        
        // Publishers
        emotion_pub_ = this->create_publisher<std_msgs::msg::String>(
            "/robot/emotion", 10
        );
        speaking_pub_ = this->create_publisher<std_msgs::msg::Bool>(
            "/robot/is_speaking", 10
        );
        joint_pub_ = this->create_publisher<sensor_msgs::msg::JointState>(
            "/robot/joint_commands", 10
        );
        
        // Subscribers
        user_input_sub_ = this->create_subscription<std_msgs::msg::String>(
            "/robot/user_input", 10,
            [this](const std_msgs::msg::String::SharedPtr msg) {
                agent_->send_message(msg->data);
            }
        );
        
        // Action server
        action_server_ = std::make_unique<ConversationAction>(
            this, "robot_conversation", agent_.get()
        );
        
        // Register callbacks
        agent_->on_response([this](const Response& resp) {
            handle_response(resp);
        });
        
        agent_->on_emotion([this](const std::string& emotion) {
            auto msg = std_msgs::msg::String();
            msg.data = emotion;
            emotion_pub_->publish(msg);
        });
        
        RCLCPP_INFO(this->get_logger(), "ElevenLabs Robot Node initialized");
    }
    
private:
    void handle_response(const Response& response) {
        // Publish speaking state
        auto speaking_msg = std_msgs::msg::Bool();
        speaking_msg.data = true;
        speaking_pub_->publish(speaking_msg);
        
        // Generate joint commands
        auto joint_state = agent_->emotion_to_joints(response.emotion);
        joint_pub_->publish(joint_state);
        
        // Play audio
        platform_->play_audio(response.audio);
        
        // Done speaking
        speaking_msg.data = false;
        speaking_pub_->publish(speaking_msg);
    }
    
    std::unique_ptr<ROS2Platform> platform_;
    std::unique_ptr<RoboticsAgent> agent_;
    
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr emotion_pub_;
    rclcpp::Publisher<std_msgs::msg::Bool>::SharedPtr speaking_pub_;
    rclcpp::Publisher<sensor_msgs::msg::JointState>::SharedPtr joint_pub_;
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr user_input_sub_;
    
    std::unique_ptr<ConversationAction> action_server_;
};

int main(int argc, char** argv) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<ElevenLabsRobotNode>());
    rclcpp::shutdown();
    return 0;
}`,
  },
};

// Architecture layers
const architectureLayers = [
  { name: "Your Application", color: "from-green-500 to-emerald-500" },
  { name: "ElevenLabs Robotics SDK", color: "from-primary-500 to-accent-500" },
  { name: "Platform Adapters", color: "from-blue-500 to-cyan-500" },
  { name: "Hardware Drivers", color: "from-purple-500 to-pink-500" },
  { name: "Physical Actuators", color: "from-gray-500 to-gray-600" },
];

export default function RoboticsSDKPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  const [activeLanguage, setActiveLanguage] = useState<"python" | "cpp">("python");
  const [activeExample, setActiveExample] = useState<"basic" | "ros2">("basic");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 overflow-x-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="w-8 h-8 text-primary-400" />
            <span className="font-bold text-lg text-white">
              ElevenLabs <span className="text-gradient">Robotics SDK</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/elevenlabs-robotics"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Vision & Roadmap
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              PartyBot
            </Link>
            <a
              href="https://github.com/elevenlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="secondary">
                <GitBranch className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-[80vh] flex items-center justify-center px-4 pt-20"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          {/* Code pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Package className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">
                Open Source SDK for Conversational Robotics
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Build Talking Robots</span>
              <br />
              <span className="text-gradient">In Minutes, Not Months</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              A thin, powerful wrapper over the ElevenLabs Agents Platform API. 
              Purpose-built for robotics with native support for{" "}
              <span className="text-white font-medium">Raspberry Pi</span>,{" "}
              <span className="text-white font-medium">ROS 2</span>,{" "}
              <span className="text-white font-medium">Python</span>, and{" "}
              <span className="text-white font-medium">C++</span>.
            </p>

            {/* Install command */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 border border-white/10 font-mono text-sm">
                <span className="text-gray-500">$</span>
                <span className="text-primary-400">pip install</span>
                <span className="text-white">elevenlabs-robotics-sdk</span>
                <button
                  onClick={() => copyToClipboard("pip install elevenlabs-robotics-sdk", "install")}
                  className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copiedCode === "install" ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#get-started">
                <Button size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </a>
              <a href="#examples">
                <Button variant="secondary" size="lg">
                  <Code2 className="w-5 h-5 mr-2" />
                  View Examples
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider">Explore</span>
            <ChevronDown className="w-5 h-5 text-gray-500 animate-bounce" />
          </motion.div>
        </div>
      </motion.section>

      {/* SDK Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why <span className="text-gradient">This SDK</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Designed by roboticists, for roboticists. Every API decision optimized for real-world deployments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sdkFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" hover="lift" padding="lg" className="h-full">
                  <feature.icon className="w-10 h-10 text-primary-400 mb-4" />
                  <span className="inline-block px-2 py-1 rounded bg-primary-500/20 text-xs font-mono text-primary-300 mb-3">
                    {feature.highlight}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Clean <span className="text-gradient">Architecture</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Layered design for maximum flexibility and minimal coupling
            </p>
          </motion.div>

          <div className="space-y-4">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-4 rounded-xl border border-white/10",
                  "bg-gradient-to-r",
                  layer.color,
                  "bg-opacity-10"
                )}
                style={{
                  marginLeft: `${index * 20}px`,
                  marginRight: `${(architectureLayers.length - 1 - index) * 20}px`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{layer.name}</span>
                  <span className="text-xs text-gray-400 font-mono">Layer {architectureLayers.length - index}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Each layer is independently testable and replaceable
            </p>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Supported <span className="text-gradient">Platforms</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              First-class support for the most popular robotics platforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" hover="lift" padding="xl" className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center",
                      "bg-gradient-to-br",
                      platform.gradient,
                      "bg-opacity-20"
                    )}>
                      <platform.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                      <div className="flex gap-2 mt-1">
                        {platform.languages.map((lang) => (
                          <span key={lang} className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{platform.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded bg-primary-500/10 text-primary-300 border border-primary-500/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actuators & Effectors */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Actuators & <span className="text-gradient">Effectors</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built-in drivers for common robotics hardware components
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actuators.map((actuator, index) => (
              <motion.div
                key={actuator.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="glass" padding="md" className="h-full text-center">
                  <actuator.icon className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                  <h3 className="text-sm font-semibold text-white mb-1">{actuator.name}</h3>
                  <p className="text-xs text-gray-500">{actuator.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section id="examples" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Code <span className="text-gradient">Examples</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get up and running in minutes with our comprehensive examples
            </p>
          </motion.div>

          {/* Language tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveLanguage("python")}
              className={cn(
                "px-6 py-2 rounded-lg font-medium transition-all",
                activeLanguage === "python"
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              Python
            </button>
            <button
              onClick={() => setActiveLanguage("cpp")}
              className={cn(
                "px-6 py-2 rounded-lg font-medium transition-all",
                activeLanguage === "cpp"
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              C++
            </button>
          </div>

          {/* Example tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveExample("basic")}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                activeExample === "basic"
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              Raspberry Pi
            </button>
            <button
              onClick={() => setActiveExample("ros2")}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                activeExample === "ros2"
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              ROS 2 Node
            </button>
          </div>

          {/* Code block */}
          <motion.div
            key={`${activeLanguage}-${activeExample}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="glass" padding="none" className="overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-gray-400 ml-2 font-mono">
                    {activeExample === "basic" ? "robot_example" : "ros2_node"}.{activeLanguage === "python" ? "py" : "cpp"}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(
                    codeExamples[activeLanguage][activeExample],
                    `${activeLanguage}-${activeExample}`
                  )}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {copiedCode === `${activeLanguage}-${activeExample}` ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code */}
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-gray-300 font-mono whitespace-pre">
                  {codeExamples[activeLanguage][activeExample]}
                </code>
              </pre>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Get Started */}
      <section id="get-started" className="py-24 px-4 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get <span className="text-gradient">Started</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to bring your robot to life
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Install the SDK",
                code: "pip install elevenlabs-robotics-sdk",
                description: "Works with Python 3.8+ and C++17",
              },
              {
                step: "2",
                title: "Configure Your Agent",
                code: "export ELEVENLABS_AGENT_ID=your-agent-id\nexport ELEVENLABS_API_KEY=your-api-key",
                description: "Get your credentials from elevenlabs.io",
              },
              {
                step: "3",
                title: "Run the Example",
                code: "python -m elevenlabs_robotics.examples.partybot",
                description: "Your robot is now conversational!",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <div className="bg-gray-900 rounded-lg p-3 mb-2 font-mono text-sm">
                        <code className="text-primary-400">{item.code}</code>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Card variant="glass" padding="xl" className="text-center border-primary-500/30">
            <Bot className="w-16 h-16 mx-auto mb-6 text-primary-400" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join the community of roboticists building the next generation of conversational machines.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/elevenlabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  <GitBranch className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </a>
              <a
                href="https://elevenlabs.io/docs/conversational-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Read the Docs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Terminal className="w-8 h-8 text-primary-400" />
              <div>
                <p className="font-bold text-white">ElevenLabs Robotics SDK</p>
                <p className="text-sm text-gray-500">Build conversational robots, faster</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/elevenlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://elevenlabs.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <Link
                href="/elevenlabs-robotics"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Vision
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                PartyBot
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ElevenLabs Robotics SDK. Built with{" "}
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300"
              >
                ElevenLabs
              </a>
              {" "}Conversational AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
