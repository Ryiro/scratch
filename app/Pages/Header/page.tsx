"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Toggleswitch from "@/components/Toggleswitch/page";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const components = [
  {
    title: "CPU",
    href: "/products/cpu",
    description: "Central Processing Units",
    image: "/images/components/cpu.png",
  },
  {
    title: "GPU",
    href: "/products/gpu",
    description: "Graphics Processing Units",
    image: "/images/components/gpu.png",
  },
  {
    title: "Memory", // Changed from "RAM"
    href: "/products/memory", // Changed from "/products/ram"
    description: "Memory Modules (DDR4/DDR5)",
    image: "/images/components/ram.png",
  },
  {
    title: "Storage",
    href: "/products/storage",
    description: "SSDs and Hard Drives",
    image: "/images/components/storage.png",
  },
  {
    title: "Motherboard",
    href: "/products/motherboard",
    description: "System Boards",
    image: "/images/components/motherboard.png",
  },
  {
    title: "Cooler",
    href: "/products/cooler",
    description: "CPU Coolers",
    image: "/images/components/cooler.png",
  },
  {
    title: "Power Supply",
    href: "/products/powersupply",
    description: "PSU Units",
    image: "/images/components/powersupply.png",
  },
  {
    title: "Case",
    href: "/products/case",
    description: "PC Cases",
    image: "/images/components/case.png",
  },
];

const peripherals = [
  {
    title: "Keyboards",
    href: "/products/keyboards",
    description: "Mechanical & Membrane Keyboards",
    image: "/images/peripherals/keyboard.png",
  },
  {
    title: "Mice",
    href: "/products/mice",
    description: "Gaming & Office Mice",
    image: "/images/peripherals/mouse.png",
  },
  {
    title: "Headsets",
    href: "/products/headsets",
    description: "Gaming & Audio Headsets",
    image: "/images/peripherals/headset.png",
  },
  {
    title: "Monitors",
    href: "/products/monitors",
    description: "Gaming & Professional Displays",
    image: "/images/peripherals/monitor.png",
  },
];

const Header = () => {
  function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col sticky top-0 z-50">
      {/* Top Section - with updated border color */}
      <div className="flex items-center justify-between p-2 border-b bg-[hsl(var(--header-top))] border-[#363b4d]">
        <div className="mr-8">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-4 text-[hsl(var(--header-text))]">
          <ModeToggle />
          <Toggleswitch />
        </div>
      </div>

      {/* Bottom Section - with same border color */}
      <div className="flex items-center justify-between h-16 px-8 border-b bg-[hsl(var(--header-bottom))] border-[#363b4d]">
        {/* Left spacer for symmetry */}
        <div className="w-[200px]"></div> {/* Increased width */}
        {/* Navigation Menu - centered and full height */}
        <NavigationMenu className="mx-auto h-full">
          <NavigationMenuList className="flex space-x-0 px-0 h-full text-[hsl(var(--header-text))]">
            {/* Removed padding and spacing */}
            <NavigationMenuItem className="relative h-full">
              <Link href="/builder" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-none px-6 font-semibold text-[15px] tracking-wide h-full flex items-center justify-center min-h-[64px] transition-all duration-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Builder
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="relative h-full">
              <NavigationMenuTrigger className="rounded-none px-6 font-semibold text-[15px] tracking-wide h-full min-h-[64px] flex items-center justify-center">
                Components
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#282c3c] border-none">
                <div className="grid grid-cols-4 gap-3 p-4 w-[800px]">
                  {components.map((component) => (
                    <Link
                      key={component.title}
                      href={component.href}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10">
                        <div className="w-[150px] h-[150px] relative mx-auto">
                          <Image
                            src={component.image}
                            alt={component.title}
                            sizes="150px"
                            quality={95}
                            priority={true}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="text-sm font-medium leading-none text-white">
                          {component.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          {component.description}
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="relative h-full">
              <NavigationMenuTrigger className="rounded-none px-6 font-semibold text-[15px] tracking-wide h-full min-h-[64px] flex items-center justify-center">
                Peripherals
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#282c3c] border-none">
                <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  {peripherals.map((peripheral) => (
                    <Link
                      key={peripheral.title}
                      href={peripheral.href}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10">
                        <div className="w-[150px] h-[150px] relative mx-auto">
                          <Image
                            src={peripheral.image}
                            alt={peripheral.title}
                            sizes="150px"
                            quality={95}
                            priority={true}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="text-sm font-medium leading-none text-white">
                          {peripheral.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          {peripheral.description}
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="relative h-full">
              <Link href="/prebuilt" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-none px-6 font-semibold text-[15px] tracking-wide h-full flex items-center justify-center min-h-[64px] transition-all duration-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  Pre Built PC
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="relative h-full">
              <Link href="/brands" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-none px-6 font-semibold text-[15px] tracking-wide h-full flex items-center justify-center min-h-[64px] transition-all duration-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  Brands
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="relative h-full">
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-none px-6 font-semibold text-[15px] tracking-wide h-full flex items-center justify-center min-h-[64px] transition-all duration-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="relative h-full">
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-none px-6 font-semibold text-[15px] tracking-wide h-full flex items-center justify-center min-h-[64px] transition-all duration-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Search and Cart - adjusted spacing and width */}
        <div className="flex items-center gap-6 w-[300px] pr-8">
          {" "}
          {/* Increased width, added right padding, increased gap */}
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] bg-[hsl(var(--main-content))] text-[hsl(var(--header-text))] font-medium placeholder:text-[hsl(var(--nav-text-muted))] border-0"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="text-[hsl(var(--header-text))] hover:bg-[hsl(var(--main-content))]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-[hsl(var(--header-text))]"
          >
            <ShoppingCart className="h-10 w-10" /> {/* Made bigger */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
