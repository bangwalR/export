'use client';

import {
  Globe, Factory, Ship, Truck, FileCheck, Target, TrendingUp, Shield,
  Car, Cog, Shirt, Cpu, HeartPulse, Wheat, UtensilsCrossed, FlaskConical,
  Building2, Wrench, Globe2, Layers, ShieldCheck, Award, Scale, Star,
  Lightbulb, Handshake, Eye, Zap, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Globe, Factory, Ship, Truck, FileCheck, Target, TrendingUp, Shield,
  Car, Cog, Shirt, Cpu, HeartPulse, Wheat, UtensilsCrossed, FlaskConical,
  Building2, Wrench, Globe2, Layers, ShieldCheck, Award, Scale, Star,
  Lightbulb, Handshake, Eye, Zap,
};

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function DynamicIcon({ name, size = 24, className }: DynamicIconProps) {
  const Icon = iconMap[name] || Globe;
  return <Icon size={size} className={className} />;
}
