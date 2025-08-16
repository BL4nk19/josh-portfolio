"use client";

import { useEffect, useState } from "react";

interface VisitorCounterProps {
  className?: string;
}

interface VisitorData {
  lastVisitorCountry: string;
  lastVisitorSessionId: string;
  totalVisitors: number;
  currentSessionId: string;
}

export function VisitorCounter({ className }: VisitorCounterProps) {
  const [displayText, setDisplayText] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate a unique session ID
  const generateSessionId = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Detect country from timezone/locale
  const detectCountry = (): string => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const countryCode = timezone.split("/")[0];
      
      // Enhanced country mapping with more specific regions
      const countryMap: Record<string, string> = {
        "Africa": "South Africa", // Default for African timezones
        "America": "United States", // Default for American timezones
        "Asia": "Asia",
        "Europe": "Europe",
        "Pacific": "Pacific",
        "Australia": "Australia",
        "Indian": "Indian Ocean",
        "Atlantic": "Atlantic",
      };
      
      // More specific timezone to country mapping
      const specificTimezoneMap: Record<string, string> = {
        // UK & Ireland
        "Europe/London": "United Kingdom",
        "Europe/Dublin": "Ireland",
        "Europe/Belfast": "Northern Ireland",
        
        // Major EU Countries
        "Europe/Paris": "France",
        "Europe/Berlin": "Germany",
        "Europe/Rome": "Italy",
        "Europe/Madrid": "Spain",
        "Europe/Amsterdam": "Netherlands",
        "Europe/Brussels": "Belgium",
        "Europe/Vienna": "Austria",
        "Europe/Zurich": "Switzerland",
        "Europe/Stockholm": "Sweden",
        "Europe/Oslo": "Norway",
        "Europe/Copenhagen": "Denmark",
        "Europe/Helsinki": "Finland",
        "Europe/Warsaw": "Poland",
        "Europe/Prague": "Czech Republic",
        "Europe/Budapest": "Hungary",
        "Europe/Bucharest": "Romania",
        "Europe/Sofia": "Bulgaria",
        "Europe/Athens": "Greece",
        "Europe/Lisbon": "Portugal",
        
        // North America
        "America/New_York": "United States",
        "America/Chicago": "United States",
        "America/Denver": "United States",
        "America/Los_Angeles": "United States",
        "America/Toronto": "Canada",
        "America/Vancouver": "Canada",
        "America/Mexico_City": "Mexico",
        
        // South America
        "America/Sao_Paulo": "Brazil",
        "America/Argentina/Buenos_Aires": "Argentina",
        "America/Santiago": "Chile",
        "America/Lima": "Peru",
        "America/Bogota": "Colombia",
        
        // Asia Pacific
        "Asia/Tokyo": "Japan",
        "Asia/Seoul": "South Korea",
        "Asia/Shanghai": "China",
        "Asia/Hong_Kong": "Hong Kong",
        "Asia/Singapore": "Singapore",
        "Asia/Bangkok": "Thailand",
        "Asia/Jakarta": "Indonesia",
        "Asia/Manila": "Philippines",
        "Asia/Kolkata": "India",
        "Asia/Dubai": "UAE",
        "Asia/Tel_Aviv": "Israel",
        "Asia/Riyadh": "Saudi Arabia",
        
        // Oceania
        "Pacific/Auckland": "New Zealand",
        "Pacific/Fiji": "Fiji",
        
        // Africa
        "Africa/Cairo": "Egypt",
        "Africa/Lagos": "Nigeria",
        "Africa/Nairobi": "Kenya",
        "Africa/Johannesburg": "South Africa",
        "Africa/Casablanca": "Morocco",
        "Africa/Algiers": "Algeria",
      };
      
      // Check specific timezone first
      if (specificTimezoneMap[timezone]) {
        return specificTimezoneMap[timezone];
      }
      
      // Check general region mapping
      if (countryMap[countryCode]) {
        return countryMap[countryCode];
      }
      
      // Try to get more specific country from timezone region
      try {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        const countryName = regionNames.of(countryCode);
        if (countryName) {
          return countryName;
        }
      } catch (error) {
        console.warn("Could not get region name:", error);
      }
      
    } catch (error) {
      console.warn("Could not detect country from timezone:", error);
    }
    
    return "Global";
  };

  // Get flag emoji for country
  const getCountryFlag = (country: string): string => {
    const flagMap: Record<string, string> = {
      // Major Countries
      "South Africa": "🇿🇦",
      "United States": "🇺🇸",
      "United Kingdom": "🇬🇧",
      "Canada": "🇨🇦",
      "Australia": "🇦🇺",
      "New Zealand": "🇳🇿",
      
      // EU Countries
      "France": "🇫🇷",
      "Germany": "🇩🇪",
      "Italy": "🇮🇹",
      "Spain": "🇪🇸",
      "Netherlands": "🇳🇱",
      "Belgium": "🇧🇪",
      "Austria": "🇦🇹",
      "Switzerland": "🇨🇭",
      "Sweden": "🇸🇪",
      "Norway": "🇳🇴",
      "Denmark": "🇩🇰",
      "Finland": "🇫🇮",
      "Poland": "🇵🇱",
      "Czech Republic": "🇨🇿",
      "Hungary": "🇭🇺",
      "Romania": "🇷🇴",
      "Bulgaria": "🇧🇬",
      "Greece": "🇬🇷",
      "Portugal": "🇵🇹",
      "Ireland": "🇮🇪",
      "Northern Ireland": "🇬🇧",
      
      // Asia Pacific
      "Japan": "🇯🇵",
      "South Korea": "🇰🇷",
      "China": "🇨🇳",
      "Hong Kong": "🇭🇰",
      "Singapore": "🇸🇬",
      "Thailand": "🇹🇭",
      "Indonesia": "🇮🇩",
      "Philippines": "🇵🇭",
      "India": "🇮🇳",
      "UAE": "🇦🇪",
      "Israel": "🇮🇱",
      "Saudi Arabia": "🇸🇦",
      
      // Americas
      "Mexico": "🇲🇽",
      "Brazil": "🇧🇷",
      "Argentina": "🇦🇷",
      "Chile": "🇨🇱",
      "Peru": "🇵🇪",
      "Colombia": "🇨🇴",
      
      // Africa
      "Egypt": "🇪🇬",
      "Nigeria": "🇳🇬",
      "Kenya": "🇰🇪",
      "Morocco": "🇲🇦",
      "Algeria": "🇩🇿",
      
      // Regions
      "Asia": "🌏",
      "Europe": "🇪🇺",
      "Pacific": "🌊",
      "Indian Ocean": "🌊",
      "Atlantic": "🌊",
      "Global": "🌍",
    };
    
    return flagMap[country] || "🌍";
  };

  useEffect(() => {
    try {
      // Check if localStorage is available
      if (typeof window === "undefined" || !window.localStorage) {
        setDisplayText("🌍 Portfolio visitor • Welcome!");
        setIsLoaded(true);
        return;
      }

      const currentSessionId = generateSessionId();
      const currentCountry = detectCountry();
      
      // Get existing visitor data
      const storedData = localStorage.getItem("visitorData");
      let visitorData: VisitorData;
      
      if (!storedData) {
        // First ever visitor
        visitorData = {
          lastVisitorCountry: currentCountry,
          lastVisitorSessionId: currentSessionId,
          totalVisitors: 1,
          currentSessionId: currentSessionId
        };
        localStorage.setItem("visitorData", JSON.stringify(visitorData));
        setDisplayText(`🌍 Welcome, first visitor! • 1 total visitors`);
      } else {
        // Parse existing data
        visitorData = JSON.parse(storedData);
        
        if (visitorData.currentSessionId === currentSessionId) {
          // Same session returning - show last visitor info
          const flag = getCountryFlag(visitorData.lastVisitorCountry);
          setDisplayText(`🌍 Recent visitor from ${visitorData.lastVisitorCountry} • ${visitorData.totalVisitors} total visitors`);
        } else {
          // New session - update last visitor and increment count
          const previousCountry = visitorData.lastVisitorCountry;
          const previousFlag = getCountryFlag(previousCountry);
          
          // Update visitor data for next visitor
          visitorData.lastVisitorCountry = currentCountry;
          visitorData.lastVisitorSessionId = currentSessionId;
          visitorData.totalVisitors += 1;
          visitorData.currentSessionId = currentSessionId;
          
          localStorage.setItem("visitorData", JSON.stringify(visitorData));
          
          // Show previous visitor info to current visitor
          setDisplayText(`${previousFlag} Last visitor from ${previousCountry} • ${visitorData.totalVisitors} total visitors`);
        }
      }
      
      setIsLoaded(true);
    } catch (error) {
      console.error("Error in visitor counter:", error);
      setDisplayText("🌍 Portfolio visitor • Welcome!");
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return null; // Don't show anything until loaded to prevent hydration mismatch
  }

  return (
    <div className={`text-center text-sm text-zinc-500 hover:text-zinc-400 transition-colors duration-300 ${className}`}>
      <span className="inline-flex items-center gap-2 animate-in fade-in duration-500">
        {displayText}
      </span>
    </div>
  );
}
