
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  className
}: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={`text-xs flex items-center mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? (
              <span className="mr-1">↑</span>
            ) : (
              <span className="mr-1">↓</span>
            )}
            {trend.value}%
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
